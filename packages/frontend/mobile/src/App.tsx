import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import { useDisclosure } from '@app/frontend-shared';
import type { SomeInterface, User } from '@app/types';

export default function App() {
  const [someData, setSomeData] = useState<SomeInterface>({
    someProperty: 'someValue',
  });
  const { isOpen: isDetailsOpen, onToggle: onDetailsToggle } =
    useDisclosure(false);

  const user: Partial<User> = {};

  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/some-route`,
        {
          signal: abortController.signal,
        },
      );
      const data = await response.json();
      setSomeData(data);
    })();

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text>{'Coucou'}</Text>

      <Text>{`${someData.someProperty}`}</Text>

      <Button
        title='Click me'
        onPress={() => {
          onDetailsToggle();
        }}
      />

      {isDetailsOpen ? (
        <Text>
          {JSON.stringify(
            {
              user,
            },
            undefined,
            2,
          )}
        </Text>
      ) : undefined}

      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
