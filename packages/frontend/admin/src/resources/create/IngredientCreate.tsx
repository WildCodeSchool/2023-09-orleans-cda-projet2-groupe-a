import {
  Create,
  CreateProps,
  NumberInput,
  SelectInput,
  SimpleForm,
  TextInput,
} from 'react-admin';

export const IngredientCreate = (props: CreateProps) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source='name' />
      <SelectInput
        source='color'
        choices={[
          { id: 'red', name: 'Red' },
          { id: 'orange', name: 'Orange' },
          { id: 'pink', name: 'Pink' },
          { id: 'gray', name: 'Gray' },
          { id: 'green', name: 'Green' },
          { id: 'blue', name: 'Blue' },
          { id: 'yellow', name: 'Yellow' },
          { id: 'purple', name: 'Purple' },
          { id: 'brown', name: 'Brown' },
          { id: 'black', name: 'Black' },
          { id: 'white', name: 'White' },
          { id: 'violet', name: 'Violet' },
          { id: 'clear', name: 'Clear' },
          { id: 'various', name: 'Various' },
        ]}
      />
      <NumberInput source='kcal' />
      <NumberInput source='degree' />
      <TextInput source='description' />
      <TextInput source='image' />
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
      <SelectInput
        source='family'
        choices={[
          { id: 'water', name: 'Water' },
          { id: 'juice', name: 'Juice' },
          { id: 'soda', name: 'Soda' },
          { id: 'bitter', name: 'Bitter' },
          { id: 'milk', name: 'Milk' },
          { id: 'fruit', name: 'Fruit' },
          { id: 'spice', name: 'Spice' },
          { id: 'herb', name: 'Herb' },
          { id: 'alcohol', name: 'Alcohol' },
          { id: 'syrup', name: 'Syrup' },
          { id: 'vegetable', name: 'Vegetable' },
          { id: 'meat', name: 'Meat' },
          { id: 'seafood', name: 'Seafood' },
          { id: 'condiment', name: 'Condiment' },
          { id: 'sauce', name: 'Sauce' },
          { id: 'cream', name: 'Cream' },
          { id: 'other', name: 'Other' },
        ]}
      />
    </SimpleForm>
  </Create>
);
