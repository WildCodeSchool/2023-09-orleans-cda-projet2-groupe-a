import { Ionicons } from '@expo/vector-icons';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg from 'react-native-svg';

import type { NamePartProps } from '@app/types';

import colors from '../../../colors';
import ShakerIcon from './icons/ShakerIcon';

const styles = StyleSheet.create({
  input: {
    width: 200,
    borderBottomColor: colors['dark'],
    borderBottomWidth: 2,
    borderStyle: 'dashed',
    transform: [{ rotate: '-12deg' }],
    fontSize: 18,
    fontWeight: 'bold',
  },
  entireTitle: {
    marginTop: 255,
  },
  title: {
    color: colors['dark'],
    fontSize: 28,
    fontWeight: 'bold',
    transform: [{ rotate: '-12deg' }],
  },
  subTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors['light'],
  },
  subTitleArrowAndSvg: {
    marginTop: 265,
    marginLeft: 110,
    flexDirection: 'row',
    alignItems: 'center',
  },
  svgContainer: {
    transform: [{ rotate: '20deg' }],
    maringLeft: 0,
  },
  arrow: {
    position: 'absolute',
    right: 60,
  },
});
export default function NamePart({
  register,
  errors,
  handleErrorSubmit,
}: NamePartProps) {
  return (
    <>
      <View style={styles.entireTitle}>
        <Text style={styles.title}>{'CHOOSE A NAME'}</Text>
        <Text style={styles.title}>{'FOR YOUR COCKTAIL:'}</Text>
      </View>
      <TextInput
        style={styles.input}
        {...register('name', {
          required: true,
          maxLength: { value: 255, message: "Can't be longer than 255" },
          validate: {
            isString: (value) =>
              typeof value === 'string' || 'Must be a string',
          },
        })}
      />

      {errors.name?.type === 'required' ? (
        <Text>{'This field is required'}</Text>
      ) : undefined}
      {errors.name?.type === 'maxLength' ? (
        <Text>{errors.name.message}</Text>
      ) : undefined}
      {errors.name?.type === 'isString' ? (
        <Text>{errors.name.message}</Text>
      ) : undefined}

      <View style={styles.subTitleArrowAndSvg}>
        <Text style={styles.subTitle}>{'SHAKE IT!'}</Text>
        <Ionicons
          style={styles.arrow}
          name='arrow-forward-outline'
          size={30}
          color={colors.light}
        />

        <TouchableOpacity
          style={styles.svgContainer}
          onPress={() => {
            handleErrorSubmit();
          }}
        >
          <Svg>{ShakerIcon}</Svg>
        </TouchableOpacity>
      </View>
    </>
  );
}
