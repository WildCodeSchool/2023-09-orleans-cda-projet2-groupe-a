import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import type { LevelPartProps } from '@app/types';

import colors from '../../../colors';

const numberLevel = [3, 2, 1];

const styles = StyleSheet.create({
  title: {
    color: colors.dark,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  container: {
    flexDirection: 'row-reverse',
    position: 'relative',
    bottom: '3%',
    left: '-4%',
    marginTop: 15,
  },
  levelContainer: {
    height: 90,
    width: 70,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    marginBottom: 80,
  },
  image: {
    height: 90,
    width: 70,
    resizeMode: 'cover',
  },
});
export default function LevelPart({
  level,
  handleLevelClick,
  errors,
}: LevelPartProps) {
  return (
    <>
      <Text style={styles.title}>{'CHOOSE YOUR DUEL'}</Text>
      <View style={styles.container}>
        {numberLevel.map((number) => (
          <TouchableOpacity
            key={number}
            style={[
              styles.levelContainer,
              { opacity: level < number ? 0.2 : 1 },
            ]}
            onPress={() => {
              handleLevelClick(number);
            }}
          >
            <Image
              // eslint-disable-next-line @typescript-eslint/no-require-imports, unicorn/prefer-module
              source={require('../../../public/form-cocktail/fire-level.png')}
              style={styles.image}
            />
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
}
