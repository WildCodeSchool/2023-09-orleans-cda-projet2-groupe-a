import express from 'express';
import { jsonArrayFrom } from 'kysely/helpers/mysql';

import { db } from '@app/backend-shared';

const criteriaRouter = express.Router();

criteriaRouter.get('/categories', async (req, res) => {
  try {
    const categories = await db.selectFrom('criteria').selectAll().execute();
    return res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({
      error: `An error occurred while retrieving data ${String(error)}`,
    });
  }
});

criteriaRouter.get('/', async (req, res) => {
  try {
    const criteriaCategory = await db
      .selectFrom('criteria')
      .select((eb) => [
        'criteria.name as category_name',
        jsonArrayFrom(
          eb
            .selectFrom('criteria_value')
            .select([
              'criteria_value.id',
              'criteria_value.value as criteria_name',
            ])
            .whereRef('criteria_value.criteria_id', '=', 'criteria.id'),
        ).as('criters'),
      ])
      .execute();

    return res.status(200).json(criteriaCategory);
  } catch (error) {
    res.status(500).json({
      error: `An error occurred while retrieving data ${String(error)}`,
    });
  }
});

export { criteriaRouter };
