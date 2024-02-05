import {
  DateInput,
  Edit,
  EditProps,
  NumberInput,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput,
} from 'react-admin';

export const CommentEdit = (props: EditProps) => (
  <Edit {...props}>
    <SimpleForm>
      <NumberInput disabled source='id' />
      <ReferenceInput disabled source='user_id' reference='user'>
        <SelectInput disabled />
      </ReferenceInput>
      <ReferenceInput disabled source='cocktail_id' reference='cocktail'>
        <SelectInput disabled />
      </ReferenceInput>
      <TextInput disabled source='content' />
      <DateInput disabled source='created_at' />
    </SimpleForm>
  </Edit>
);
