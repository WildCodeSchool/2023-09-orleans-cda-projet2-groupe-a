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

export const GlassList = (props: ListProps) => (
  <List {...props}>
    <Button component={Link} to='/glass/create' label='Add new glass' />

    <Datagrid rowClick='edit'>
      <NumberField source='id' />
      <TextField source='name' />
      <NumberField source='capacity' />
      <TextField source='image' />
      <TextField source='material' />
      <DeleteButton />
    </Datagrid>
  </List>
);
