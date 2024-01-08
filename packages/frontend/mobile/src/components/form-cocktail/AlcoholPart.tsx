import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import type { AlcoholPartProps } from '@app/types';

import colors from '../../../colors';

const styles = StyleSheet.create({
  title: {
    color: colors.dark,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 80,
    textAlign: 'center',
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
});

export default function AlcoholPart({
  alcohols,
  handleClickAlcohol,
  errors,
}: AlcoholPartProps) {
  const renderAlcoholItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        handleClickAlcohol(item);
      }}
    >
      <Text style={styles.li}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <Text style={styles.title}>{'CHOOSE YOUR BOOZE'}</Text>

      {errors.alcohol?.type === 'required' && (
        <Text style={styles.errorText}>{'This field is required'}</Text>
      )}
      {errors.alcohol?.type === 'validate' && (
        <Text style={styles.errorText}>{errors.alcohol.message}</Text>
      )}

      <FlatList
        data={alcohols}
        keyExtractor={(item: { id: number }) => item.id.toString()}
        renderItem={renderAlcoholItem}
        numColumns={2}
        key={'_'}
      />
    </View>
  );
}
