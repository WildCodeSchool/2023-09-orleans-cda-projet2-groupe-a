/* eslint-disable unicorn/prefer-module */
import { useRef, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

/* eslint-disable @typescript-eslint/no-require-imports */
import type { CocktailForm, Ingredient } from '@app/types';

import colors from '../../colors';
import AlcoholPart from '../components/form-cocktail/AlcoholPart';
import GlassPart from '../components/form-cocktail/GlassPart';
import IngredientsPart from '../components/form-cocktail/IngredientsPart';
import LevelPart from '../components/form-cocktail/LevelPart';
import NamePart from '../components/form-cocktail/NamePart';
import ToppingPart from '../components/form-cocktail/ToppingPart';

const onSubmit: SubmitHandler<CocktailForm> = (data) => {
  return data;
};

export default function AddCocktail() {
  const [level, setLevel] = useState<number>(0);
  const scrollViewReference = useRef<ScrollView>(null);
  const scrollToPosition = (positionIndex) => {
    setTimeout(() => {
      const yOffset = Dimensions.get('window').height * positionIndex;
      scrollViewReference.current?.scrollTo({
        y: yOffset,
        animated: true,
      });
    }, 500);
  };

  const [selectedIngredient, setSelectedIngredient] = useState<string>('');
  const [selectedTopping, setSelectedTopping] = useState<string>('');

  const [selectedAlcohols, setSelectedAlcohols] = useState<Ingredient[]>([]);

  const handleIngredientChange = (value: string) => {
    setSelectedIngredient(value);
    scrollToPosition(3);
  };
  const handleToppingChange = (value: string) => {
    setSelectedTopping(value);
    scrollToPosition(5);
  };

  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
    clearErrors,
    setValue,
    watch,
  } = useForm<CocktailForm>();

  const handleLevelClick = async (selectedLevel: number) => {
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/alcohols/${selectedLevel}`,
      );
      const result = await response.json();

      setSelectedAlcohols(result);
      if (selectedLevel === level) {
        setLevel(0);
      } else {
        setLevel(selectedLevel);
        setValue('level', selectedLevel);
      }
    } catch (error) {
      console.error(
        'Une erreur est survenue lors de la récupération des alcools',
        error,
      );
    }
    scrollToPosition(1); // Défilement vers la section suivante (index 2)
  };

  const handleClickAlcohol = (alcohol: Ingredient) => {
    setValue('alcohol', alcohol, { shouldValidate: true });
    scrollToPosition(2); // Défilement vers la section suivante (index 2)
  };

  const handleGlassPartNextStepClick = () => {
    scrollToPosition(4); // Défilement vers la section suivante (index 2)
  };

  const handleErrorSubmit = () => {
    const alcoholValue = watch('alcohol');

    if (alcoholValue === undefined) {
      setError('alcohol', { type: 'required', message: 'required' });
    } else if (
      typeof alcoholValue.name === 'string' &&
      alcoholValue.name.length <= 255
    ) {
      clearErrors('alcohol');
    } else {
      setError('alcohol', {
        type: 'validate',
        message: 'must be a string of 255 characters max',
      });
    }

    const levelValue = watch('level');

    if (levelValue === undefined) {
      setError('level', { type: 'required', message: 'required' });
    } else if (
      typeof levelValue === 'number' &&
      levelValue <= 3 &&
      levelValue >= 1
    ) {
      clearErrors('level');
    } else {
      setError('level', {
        type: 'validate',
        message: 'must be a number between 1 and 3',
      });
    }

    const glassValue = watch('glass');

    if (glassValue === undefined) {
      setError('glass', { type: 'required', message: 'required' });
    } else if (typeof glassValue.id === 'number') {
      clearErrors('glass');
    } else {
      setError('glass', {
        type: 'validate',
        message: 'must be a number',
      });
    }
  };

  const squares = [
    {
      color: colors['dark-purple'],
      component: (
        <LevelPart
          level={level}
          handleLevelClick={handleLevelClick}
          errors={errors}
        />
      ),
    },
    {
      color: colors['dark-yellow'],
      component: (
        <AlcoholPart
          alcohols={selectedAlcohols}
          handleClickAlcohol={handleClickAlcohol}
          watch={watch}
          errors={errors}
        />
      ),
    },
    {
      color: colors['dark-blue'],
      component: (
        <IngredientsPart
          register={register}
          selectedIngredient={selectedIngredient}
          handleIngredientChange={handleIngredientChange}
          errors={errors}
          watch={watch}
        />
      ),
    },
    {
      color: colors['dark-orange'],
      component: (
        <GlassPart
          handleGlassPartNextStepClick={handleGlassPartNextStepClick}
          errors={errors}
          setValue={setValue}
        />
      ),
    },
    {
      color: colors['dark-green'],
      component: (
        <ToppingPart
          register={register}
          selectedTopping={selectedTopping}
          handleToppingChange={handleToppingChange}
          errors={errors}
        />
      ),
    },
    {
      color: colors['dark-pink'],
      component: (
        <NamePart
          register={register}
          handleErrorSubmit={handleErrorSubmit}
          errors={errors}
        />
      ),
    },
  ];

  const styles = StyleSheet.create({
    scrollViewContent: {
      flexGrow: 1,
      justifyContent: 'flex-start',
    },
    square: {
      flex: 1,
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
      justifyContent: 'center',
      alignItems: 'center',
    },
    backgroundImage: {
      width: Dimensions.get('window').width,
      height: 400,
      resizeMode: 'contain',
    },
    imageContainer: {
      height: '100%',
      width: Dimensions.get('window').width,
      justifyContent: 'center',
      alignItems: 'center',
    },
    componentContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
  });

  const bubbleImages = [
    require('../../public/form-cocktail/bubble/bubble-1.png'),
    require('../../public/form-cocktail/bubble/bubble-2.png'),
    require('../../public/form-cocktail/bubble/bubble-3.png'),
    require('../../public/form-cocktail/bubble/bubble-4.png'),
    require('../../public/form-cocktail/bubble/bubble-5.png'),
    require('../../public/form-cocktail/bubble/bubble-6.png'),
  ];

  return (
    <ScrollView
      ref={scrollViewReference}
      contentContainerStyle={styles.scrollViewContent}
    >
      {squares.map((square, index) => (
        <View
          key={square.color}
          style={[styles.square, { backgroundColor: square.color }]}
        >
          <View style={styles.imageContainer}>
            <ImageBackground
              source={bubbleImages[index]}
              style={styles.backgroundImage}
            >
              <View style={styles.componentContainer}>{square.component}</View>
            </ImageBackground>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
