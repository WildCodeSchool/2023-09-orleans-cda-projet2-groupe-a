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

export const ToppingList = (props: ListProps) => (
  <List {...props}>
    <Button component={Link} to='/topping/create' label='Add new topping' />
    <Datagrid rowClick='edit'>
      <NumberField source='id' />
      <TextField source='name' />
      <TextField source='flavour' />
      <DeleteButton />
    </Datagrid>
  </List>
);
