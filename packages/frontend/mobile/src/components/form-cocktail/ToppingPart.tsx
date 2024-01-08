import { Ionicons } from '@expo/vector-icons';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import type { ToppingPartProps } from '@app/types';

import colors from '../../../colors';

/* i'm waiting for "topping-suggestion" PR validation to change this : */
const toppings = ['shrimps', 'lemon', 'mint'];
const styles = StyleSheet.create({
  title: {
    color: colors.dark,
    fontSize: 24,
    fontWeight: 'bold',
    marginStart: 60,
    marginTop: 100,
  },
  li: {
    color: colors.dark,
    fontWeight: 'bold',
    fontSize: 18,
    marginHorizontal: 30,
    padding: 10,
  },
  errorText: {
    color: 'red',
  },
  skullArrowAndSubTitle: {
    flexDirection: 'row',
    marginTop: 60,
    marginStart: -20,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginEnd: 5,
  },
  arrow: {
    marginEnd: 5,
  },
  skull: {
    position: 'absolute',
    right: -40,
    top: -10,
  },
});
export default function ToppingPart({
  register,
  selectedTopping,
  handleToppingChange,
  errors,
}: ToppingPartProps) {
  const renderToppingItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        handleToppingChange(item);
      }}
    >
      <Text style={styles.li}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <View>
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

        <FlatList
          data={toppings}
          renderItem={renderToppingItem}
          numColumns={2}
          key={'_'}
        />
      </View>
      <View style={styles.skullArrowAndSubTitle}>
        <Text style={styles.subTitle}>{'OR RANDOM, AT YOUR PERIL!'}</Text>
        <Ionicons name='arrow-forward-outline' style={styles.arrow} size={30} />
        <TouchableOpacity
          style={styles.skull}
          onPress={() => {
            /* i'm waiting for "topping-suggestion" PR validation to implement this */
          }}
        >
          <Ionicons name='skull-outline' size={48} color={colors.dark} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
