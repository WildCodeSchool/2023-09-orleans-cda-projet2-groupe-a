import {
  Create,
  CreateProps,
  SelectInput,
  SimpleForm,
  TextInput,
} from 'react-admin';

export const ToppingCreate = (props: CreateProps) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source='name' />
      <SelectInput
        source='flavour'
        choices={[
          { id: 'sweet', name: 'Sweet' },
          { id: 'spicy', name: 'Spicy' },
          { id: 'fruity', name: 'Fruity' },
          { id: 'neutral', name: 'Neutral' },
          { id: 'herbaceous', name: 'Herbaceous' },
          { id: 'bitter', name: 'Bitter' },
          { id: 'salty', name: 'Salty' },
          { id: 'fresh', name: 'Fresh' },
          { id: 'acidulous', name: 'Acidulous' },
          { id: 'floral', name: 'Floral' },
          { id: 'sour', name: 'Sour' },
          { id: 'earthy', name: 'Earthy' },
          { id: 'peppery', name: 'Peppery' },
          { id: 'umami', name: 'Umami' },
          { id: 'woody', name: 'Woody' },
          { id: 'astringent', name: 'Astringent' },
          { id: 'mixed', name: 'Mixed' },
          { id: 'other', name: 'Other' },
        ]}
      />
    </SimpleForm>
  </Create>
);
