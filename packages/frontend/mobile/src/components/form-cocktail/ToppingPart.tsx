import { Ionicons } from '@expo/vector-icons';
import { useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import type { Topping, ToppingPartProps } from '@app/types';

import colors from '../../../colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: -150,
  },
  toppingsListContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    color: colors.dark,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 100,
  },
  li: {
    color: colors.dark,
    fontWeight: 'bold',
    fontSize: 18,
    padding: 10,
  },
  randomToppingLi: {
    color: colors.dark,
    fontWeight: 'bold',
    fontSize: 18,
    padding: 10,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
  },
  skullArrowAndSubTitle: {
    flexDirection: 'row',
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginEnd: 5,
  },
  arrow: {
    marginRight: 25,
  },
  skull: {
    position: 'absolute',
    right: -25,
    top: -10,
    marginEnd: 5,
  },
});
export default function ToppingPart({
  handleToppingChange,
  errors,
  selectedAlcohol,
  selectedIngredients,
}: ToppingPartProps) {
  const [toppings, setToppings] = useState<Topping[]>([]);
  const [mainFlavour, setMainFlavour] = useState<string>('');
  const [randomTopping, setRandomTopping] = useState<Topping | null>(null);
  const [isRandomToppingChoosen, setIsRandomToppingChoosen] =
    useState<boolean>(false);

  const allFlavours = useMemo(
    () => [
      selectedAlcohol?.flavour,
      ...selectedIngredients.map((ingredient) => ingredient.flavour),
    ],
    [selectedAlcohol, selectedIngredients],
  );

  const flavoursCount = useMemo(() => {
    const initialFlavoursCount = {
      fruity: 0,
      spicy: 0,
      herbaceous: 0,
      floral: 0,
      woody: 0,
      bitter: 0,
      sweet: 0,
      salty: 0,
      sour: 0,
      neutral: 0,
    };

    for (const flavour of allFlavours) {
      if (flavour) {
        initialFlavoursCount[flavour]++;
      }
    }

    return initialFlavoursCount;
  }, [allFlavours]);

  useEffect(() => {
    if (selectedAlcohol && selectedIngredients.length === 3) {
      let maxFlavour = '';
      let maxCount = 0;
      for (const [flavour, count] of Object.entries(flavoursCount)) {
        if (count > maxCount) {
          maxFlavour = flavour;
          maxCount = count;
        }
      }

      setMainFlavour(maxFlavour);

      if (maxFlavour) {
        fetch(`${process.env.EXPO_PUBLIC_API_URL}/topping/${maxFlavour}`)
          .then((response) => response.json())
          .then((toppings) => {
            setToppings(toppings);
          })
          .catch((error) => {
            console.error('Error fetching toppings from the backend:', error);
          });
      }
    }
  }, [selectedAlcohol, selectedIngredients, flavoursCount]);

  const handleRandomToppingChoice = async () => {
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/topping/random`,
      );
      const result = await response.json();
      setRandomTopping(result[0]);
      setIsRandomToppingChoosen((prev) => !prev);
      handleToppingChange(result.name);
    } catch (error) {
      console.error(error);
    }
  };
  const shouldShowRandomTopping = isRandomToppingChoosen && randomTopping;

  const renderToppingItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        handleToppingChange(item);
      }}
    >
      <Text style={styles.li}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.toppingsListContainer}>
        <Text style={styles.title}>{'PICK A TOPPING'}</Text>

        {errors.topping?.type === 'required' ? (
          <Text>{'This field is required'}</Text>
        ) : undefined}
        {errors.topping?.type === 'maxLength' ? (
          <Text>{errors.topping.message}</Text>
        ) : undefined}
        {errors.topping?.type === 'isString' ? (
          <Text>{errors.topping.message}</Text>
        ) : undefined}
        {shouldShowRandomTopping ? (
          <Text style={styles.randomToppingLi}>{randomTopping.name}</Text>
        ) : (
          <FlatList
            data={toppings}
            renderItem={renderToppingItem}
            numColumns={2}
            key={'_'}
          />
        )}
      </View>
      <View style={styles.skullArrowAndSubTitle}>
        <Text style={styles.subTitle}>{'OR RANDOM, AT YOUR PERIL!'}</Text>
        <Ionicons name='arrow-forward-outline' style={styles.arrow} size={30} />
        <TouchableOpacity
          style={styles.skull}
          onPress={async () => {
            await handleRandomToppingChoice();
          }}
        >
          <Ionicons name='skull-outline' size={48} color={colors.dark} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
