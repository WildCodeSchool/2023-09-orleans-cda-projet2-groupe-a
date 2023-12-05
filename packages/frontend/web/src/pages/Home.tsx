import { useEffect, useState } from 'react';

import { useDisclosure } from '@app/frontend-shared';
import type { SomeInterface, User } from '@app/types';

export default function Home() {
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
        `${import.meta.env.VITE_API_URL}/some-route`,
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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        gap: '1rem',
      }}
    >
      <span>{'Coucou'}</span>

      <span>{`${someData.someProperty}`}</span>

      <button
        type='button'
        onClick={() => {
          onDetailsToggle();
        }}
      >
        {'Click me'}
      </button>

      {isDetailsOpen ? (
        <pre>
          {JSON.stringify(
            {
              user,
            },
            undefined,
            2,
          )}
        </pre>
      ) : undefined}
    </div>
  );
}
