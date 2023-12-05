import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      const res = await fetch('192.168.1.166:3333/api/auth/check', {
        credentials: 'include', // Essentiel pour retrouver le cookie. Idem login.tsx.
      });
      const data = (await res.json()) as {
        // parenthèses autour d'await res.json() puis as pour bien typer.
        ok: boolean;
        isLoggedIn: boolean;
      };
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
      <span className='text-red-900'>{'Coucou'}</span>
    </div>
  );
}
