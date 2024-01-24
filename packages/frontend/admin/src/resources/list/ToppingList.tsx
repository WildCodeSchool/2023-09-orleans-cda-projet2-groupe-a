import {
  Datagrid,
  DeleteButton,
  List,
  NumberField,
  TextField,
} from 'react-admin';
import type { ListProps } from 'react-admin';

export const ToppingList = (props: ListProps) => (
  <List {...props}>
    <Datagrid rowClick='edit'>
      <NumberField source='id' />
      <TextField source='name' />
      <TextField source='flavour' />
      <DeleteButton />
    </Datagrid>
  </List>
);
