import {
  Datagrid,
  DeleteButton,
  List,
  NumberField,
  TextField,
} from 'react-admin';
import type { ListProps } from 'react-admin';

export const IngredientList = (props: ListProps) => (
  <List {...props}>
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
