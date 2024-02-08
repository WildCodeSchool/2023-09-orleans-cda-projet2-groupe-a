import {
  Datagrid,
  DateField,
  DeleteButton,
  EmailField,
  List,
  NumberField,
  TextField,
} from 'react-admin';
import type { ListProps } from 'react-admin';

export const UserList = (props: ListProps) => (
  <List {...props}>
    <Datagrid rowClick='edit'>
      <NumberField source='id' />
      <EmailField source='email' />
      <TextField source='password' />
      <TextField source='pseudo' />
      <TextField source='image' />
      <DateField source='birthdate' />
      <DateField source='created_at' />
      <TextField source='color' />
      <DeleteButton />
    </Datagrid>
  </List>
);
