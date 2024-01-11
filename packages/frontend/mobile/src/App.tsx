import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import AddCocktailScreen from './pages/AddCocktailScreen';

const stack = createNativeStackNavigator();

const app = () => {
  return (
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen
          name='Add a cocktail'
          component={AddCocktailScreen}
          options={{ headerShown: false }}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default app;
