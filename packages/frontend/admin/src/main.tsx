import simpleRestProvider from 'ra-data-simple-rest';
import { Admin, Resource } from 'react-admin';
import { createRoot } from 'react-dom/client';

import { GlassCreate } from './resources/create/GlassCreate';
import { IngredientCreate } from './resources/create/IngredientCreate';
import { ToppingCreate } from './resources/create/ToppingCreate';
import { CocktailEdit } from './resources/edit/CocktailEdit';
import { CommentEdit } from './resources/edit/CommentEdit';
import { GlassEdit } from './resources/edit/GlassEdit';
import { IngredientEdit } from './resources/edit/IngredientEdit';
import { ToppingEdit } from './resources/edit/ToppingEdit';
import { UserEdit } from './resources/edit/UserEdit';
import { CocktailList } from './resources/list/CocktailList';
import { CommentList } from './resources/list/CommentList';
import { GlassList } from './resources/list/GlassList';
import { IngredientList } from './resources/list/IngredientList';
import { ToppingList } from './resources/list/ToppingList';
import { UserList } from './resources/list/UserList';

const dataProvider = simpleRestProvider('/api/admin');

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name='cocktail' list={CocktailList} edit={CocktailEdit} />
    <Resource name='comment' list={CommentList} edit={CommentEdit} />
    <Resource
      name='glass'
      list={GlassList}
      edit={GlassEdit}
      create={GlassCreate}
    />
    <Resource
      name='ingredient'
      list={IngredientList}
      edit={IngredientEdit}
      create={IngredientCreate}
    />
    <Resource
      name='topping'
      list={ToppingList}
      edit={ToppingEdit}
      create={ToppingCreate}
    />
    <Resource name='user' list={UserList} edit={UserEdit} />
  </Admin>
);

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = createRoot(rootElement);
root.render(<App />);
