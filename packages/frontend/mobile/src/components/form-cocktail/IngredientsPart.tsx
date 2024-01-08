import { Ionicons } from '@expo/vector-icons';
import colors from 'colors';
import { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import type { IngredientsPartProps } from '@app/types';

function useFetch<Ingredient>(url: string): {
  data: Ingredient[] | undefined;
  isLoading: boolean;
} {
  const [data, setData] = useState<Ingredient[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      fetch(url)
        .then((response) => response.json())
        .then((result) => {
          setData(result);
        })
        .catch((error) => {
          console.error('Erreur de requête', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    fetchData();
  }, [url]);

  return { data, isLoading };
}

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

export default function IngredientsPart({
  register,
  selectedIngredient,
  handleIngredientChange,
  errors,
  watch,
}: IngredientsPartProps) {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/ingredient/${watch(
    'alcohol.id',
  )}`;

  const { data } = useFetch(url);
  const renderIngredientItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        handleIngredientChange(item.name);
      }}
    >
      <Text style={styles.li}>{item.name}</Text>
    </TouchableOpacity>
  );
  return (
    <View>
      <View>
        <Text style={styles.title}>{'CHOOSE YOUR FUSE'}</Text>

        {errors.ingredient?.type === 'required' ? (
          <Text>{'This field is required'}</Text>
        ) : undefined}
        {errors.ingredient?.type === 'maxLength' ? (
          <Text>{errors.ingredient.message}</Text>
        ) : undefined}
        {errors.ingredient?.type === 'isString' ? (
          <Text>{errors.ingredient.message}</Text>
        ) : undefined}

        <FlatList
          data={data}
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
          onPress={() => {
            /* waiting for ingredient's PR validation to implement this*/
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
