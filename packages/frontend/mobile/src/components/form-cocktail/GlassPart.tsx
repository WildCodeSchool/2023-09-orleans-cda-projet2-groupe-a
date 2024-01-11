import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import type { Glass, GlassPartProps } from '@app/types';

import colors from '../../../colors';

const url = `${process.env.EXPO_PUBLIC_API_URL}/glass`;

const styles = StyleSheet.create({
  title: {
    color: colors.dark,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  subTitle: {
    marginBottom: -100,
    color: colors.dark,
    fontSize: 20,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
  },
  li: {
    color: colors.dark,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  shuffleButtonAndGlassName: {
    alignItems: 'center',
  },
  subTitleAndArrow: {
    marginTop: 350,
    marginBottom: -220,
    marginStart: 120,
  },
  arrow: {
    position: 'absolute',
    left: 110,
    bottom: -41,
  },
});
export default function GlassPart({
  setValue,
  handleGlassPartNextStepClick,
  errors,
}: GlassPartProps) {
  const [glass, setGlass] = useState<Pick<Glass, 'name' | 'id'>>();

  const fetchData = async (url: string, signal: AbortSignal) => {
    const response = await fetch(url, {
      signal,
    });
    if (response.ok) {
      const data = await response.json();
      setValue('glass', data);
      setGlass(data);
    } else {
      console.error(`Request error: ${response.status}`);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetchData(url, signal).catch((error) => {
      console.error(error);
    });

    return () => {
      controller.abort();
    };
  }, []);

  const shuffleClick = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setValue('glass', data);
      setGlass(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Text style={styles.title}>{'YOUR GLASS'}</Text>

      {errors.glass?.type === 'required' ? (
        <Text>{'This field is required'}</Text>
      ) : undefined}
      {errors.glass?.type === 'validate' ? (
        <Text>{errors.glass.message}</Text>
      ) : undefined}

      <View style={styles.shuffleButtonAndGlassName}>
        <TouchableOpacity
          onPress={async () => {
            await shuffleClick();
          }}
        >
          <Ionicons name='shuffle-outline' size={44} color={colors.dark} />
        </TouchableOpacity>
        <Text style={styles.li}>{glass?.name}</Text>
      </View>
      <View style={styles.subTitleAndArrow}>
        <Text style={styles.subTitle}>{'NEXT STEP'}</Text>
        <TouchableOpacity
          style={styles.arrow}
          onPress={() => {
            if (handleGlassPartNextStepClick) {
              handleGlassPartNextStepClick(4);
            }
          }}
        >
          <Ionicons
            name='arrow-forward-outline'
            size={48}
            color={colors.dark}
          />
        </TouchableOpacity>
      </View>
    </>
  );
}
