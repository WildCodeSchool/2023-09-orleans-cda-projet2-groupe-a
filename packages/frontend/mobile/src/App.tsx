import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import AddCocktailScreen from './pages/AddCocktailScreen';
import VirginScreen from './pages/VirginScreen';

const stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen
          name='Add a cocktail'
          component={AddCocktailScreen}
          options={{ headerShown: false }}
        />
        <stack.Screen
          name='Virgin Cocktail Screen'
          component={VirginScreen}
          options={{ headerShown: false }}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
