import {
  Datagrid,
  DateField,
  DeleteButton,
  List,
  NumberField,
  ReferenceField,
  TextField,
} from 'react-admin';
import type { ListProps } from 'react-admin';

export const CommentList = (props: ListProps) => (
  <List {...props}>
    <Datagrid rowClick='edit'>
      <NumberField source='id' />
      <ReferenceField source='user_id' reference='user' />
      <ReferenceField source='cocktail_id' reference='cocktail' />
      <TextField source='content' />
      <DateField source='created_at' />
      <DeleteButton />
    </Datagrid>
  </List>
);
