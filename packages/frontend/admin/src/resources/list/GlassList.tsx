import {
  Datagrid,
  DeleteButton,
  List,
  NumberField,
  TextField,
} from 'react-admin';
import type { ListProps } from 'react-admin';

export const GlassList = (props: ListProps) => (
  <List {...props}>
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
