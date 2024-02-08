import {
  Create,
  CreateProps,
  NumberInput,
  SelectInput,
  SimpleForm,
  TextInput,
} from 'react-admin';

export const GlassCreate = (props: CreateProps) => (
  <Create {...props}>
    <SimpleForm>
      <NumberInput disabled source='id' />
      <TextInput source='name' />
      <NumberInput source='capacity' />
      <TextInput source='image' />
      <SelectInput
        source='material'
        choices={[
          { id: 'glass', name: 'Glass' },
          { id: 'crystal', name: 'Crystal' },
          { id: 'metal', name: 'Metal' },
          { id: 'plastic', name: 'Plastic' },
          { id: 'wood', name: 'Wood' },
        ]}
      />
    </SimpleForm>
  </Create>
);
