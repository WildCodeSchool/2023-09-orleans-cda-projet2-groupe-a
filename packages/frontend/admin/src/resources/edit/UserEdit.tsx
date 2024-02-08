import {
  DateInput,
  Edit,
  EditProps,
  NumberInput,
  PasswordInput,
  SelectInput,
  SimpleForm,
  TextInput,
} from 'react-admin';

export const UserEdit = (props: EditProps) => (
  <Edit {...props}>
    <SimpleForm>
      <NumberInput disabled source='id' />
      <TextInput source='email' />
      <PasswordInput disabled source='password' />
      <TextInput source='pseudo' />
      <TextInput source='image' />
      <DateInput source='birthdate' />
      <DateInput source='created_at' />
      <SelectInput
        source='color'
        choices={[
          { id: 'blue', name: 'Blue' },
          { id: 'pink', name: 'Pink' },
          { id: 'orange', name: 'Orange' },
          { id: 'red', name: 'Red' },
          { id: 'green', name: 'Green' },
          { id: 'yellow', name: 'Yellow' },
          { id: 'purple', name: 'Purple' },
        ]}
      />
    </SimpleForm>
  </Edit>
);
