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

//Je permets à l'admin de modifier le nom, l'image, et l'anecdote d'un cocktail au besoin
export const CocktailEdit = (props: EditProps) => (
  <Edit {...props}>
    <SimpleForm>
      <NumberInput disabled source='id' />
      <TextInput source='name' />
      <TextInput source='image' />
      <NumberInput disabled source='total_kcal' />
      <NumberInput disabled source='total_degree' />
      <ReferenceInput disabled source='author' reference='user'>
        <SelectInput disabled />
      </ReferenceInput>
      <NumberInput disabled source='ratings_average' />
      <ReferenceInput disabled source='glass_id' reference='glass'>
        <SelectInput disabled />
      </ReferenceInput>
      <TextInput disabled source='final_flavour' />
      <DateInput disabled source='created_at' />
      <NumberInput disabled source='total_quantity' />
      <TextInput multiline source='anecdote' />
    </SimpleForm>
  </Edit>
);
