import { Ionicons } from '@expo/vector-icons';
import colors from 'colors';
import { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useFetch } from '@app/frontend-shared/src/hooks/use-fetch';
import type { IngredientsPartProps } from '@app/types';

const styles = StyleSheet.create({
  title: {
    color: colors.dark,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 100,
    textAlign: 'center',
    paddingEnd: 20,
  },
  subTitle: {
    color: colors.dark,
    fontSize: 20,
    fontWeight: 'bold',
  },
  skullAndSubTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 70,
  },
  randomIngredientLi: {
    color: colors.dark,
    fontWeight: 'bold',
    fontSize: 18,
    padding: 10,
    textAlign: 'center',
  },
  li: {
    color: colors.dark,
    fontWeight: 'bold',
    fontSize: 18,
    marginHorizontal: 30,
    padding: 10,
  },
  skull: {
    position: 'absolute',
    top: -10,
  },
  errorText: {
    color: 'red',
  },
});

const baseUrl = process.env.EXPO_PUBLIC_API_URL;

export default function IngredientsPart({
  selectedIngredients = [],
  setSelectedIngredients,
  handleIngredientChange,
  errors,
  watch,
}: IngredientsPartProps) {
  const url1 = `${baseUrl}/ingredient/${watch('alcohol.id')}`;
  const url2 =
    selectedIngredients.length > 0
      ? `${baseUrl}/ingredient/${selectedIngredients[0].id}`
      : '';
  const url3 =
    selectedIngredients.length > 1
      ? `${baseUrl}/ingredient/${selectedIngredients[1].id}`
      : '';

  const { data: ingredientsList1 } = useFetch(url1);
  const { data: ingredientsList2 } = useFetch(url2);
  const { data: ingredientsList3 } = useFetch(url3);

  const [userStep, setUserStep] = useState<number>(1);

  const getIngredientsList = () => {
    if (userStep === 2 && ingredientsList2) {
      return ingredientsList2;
    } else if (userStep === 3 && ingredientsList3) {
      return ingredientsList3;
    } else {
      return ingredientsList1 || [];
    }
  };

  const handleRandomIngredientChoice = async () => {
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/ingredient/random`,
      );
      const result = await response.json();
      if (handleIngredientChange) {
        handleIngredientChange(result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderIngredientItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        if (handleIngredientChange) {
          handleIngredientChange(item);
          setUserStep(userStep + 1);
        }
      }}
    >
      <Text style={styles.li}>{item.name}</Text>
    </TouchableOpacity>
  );
  return (
    <View>
      <View>
        <Text style={styles.title}>
          {userStep === 1
            ? 'CHOOSE YOUR 1st FUSE'
            : // eslint-disable-next-line unicorn/no-nested-ternary
              userStep === 2
              ? 'CHOOSE YOUR 2nd FUSE'
              : 'CHOOSE YOUR 3rd FUSE'}
        </Text>

        {errors.ingredients?.type === 'required' ? (
          <Text>{'This field is required'}</Text>
        ) : undefined}
        {errors.ingredients?.type === 'maxLength' ? (
          <Text>{errors.ingredients.message}</Text>
        ) : undefined}
        {errors.ingredients?.type === 'isString' ? (
          <Text>{errors.ingredients.message}</Text>
        ) : undefined}
        <FlatList
          data={getIngredientsList()}
          keyExtractor={(item: { id: number }) => item.id.toString()}
          renderItem={renderIngredientItem}
          numColumns={2}
          key={'_'}
        />
      </View>
      <View style={styles.skullAndSubTitle}>
        <Text style={styles.subTitle}>{'Choose your blend or amend'}</Text>
        <Ionicons name='arrow-forward-outline' size={30} color='black' />
        <TouchableOpacity
          onPress={async () => {
            await handleRandomIngredientChoice();
            setUserStep(userStep + 1);
          }}
        >
          <Ionicons
            name='skull-outline'
            size={48}
            style={styles.skull}
            color={colors.dark}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
