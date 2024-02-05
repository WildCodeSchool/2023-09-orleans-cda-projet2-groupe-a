import {
  Datagrid,
  DateField,
  DeleteButton,
  List,
  ListProps,
  NumberField,
  ReferenceField,
  TextField,
} from 'react-admin';

export const CocktailList = (props: ListProps) => (
  <List {...props}>
    <Datagrid rowClick='edit'>
      <NumberField source='id' />
      <TextField source='name' />
      <TextField source='image' />
      <NumberField source='total_kcal' />
      <NumberField source='total_degree' />
      <ReferenceField source='user_id' reference='user' />
      <NumberField source='ratings_average' />
      <ReferenceField source='glass_id' reference='glass' />
      <TextField source='final_flavour' />
      <DateField source='created_at' />
      <NumberField source='total_quantity' />
      <TextField source='anecdote' />
      <DeleteButton />
    </Datagrid>
  </List>
);
