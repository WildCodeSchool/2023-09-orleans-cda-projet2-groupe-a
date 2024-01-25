import {
  Button,
  Datagrid,
  DeleteButton,
  Link,
  List,
  NumberField,
  TextField,
} from 'react-admin';
import type { ListProps } from 'react-admin';

export const IngredientList = (props: ListProps) => (
  <List {...props}>
    <Button
      component={Link}
      to='/ingredient/create'
      label='Add new ingredient'
    />
    <Datagrid rowClick='edit'>
      <NumberField source='id' />
      <TextField source='name' />
      <TextField source='color' />
      <NumberField source='kcal' />
      <NumberField source='degree' />
      <TextField source='description' />
      <TextField source='image' />
      <TextField source='flavour' />
      <DeleteButton />
    </Datagrid>
  </List>
);
