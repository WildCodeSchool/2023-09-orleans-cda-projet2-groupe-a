import type { FormEvent } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // pour empêcher le rafraîchissement de la page.
    console.log(email, password);

    // le fetch envoie une requête à la route /login et retourne une promesse qui est la réponse à la requête.
    // Await suspend l'exécution du code à la résolution de la promesse.
    // Param1 du fetch : adresse du serveur et route.
    // Param2: un objet contenant
    const res = await fetch('192.168.1.166:3333/api/auth/login', {
      method: 'POST',
      credentials: 'include', // optionnel mais indispensable pour retrouver le cookie.
      headers: {
        'content-type': 'application/json', // L'entête content-type spécifie à Express le type de contenu de la requête HTTP. Aka du JSON.
      },
      body: JSON.stringify({
        // body contient email et password. JSON.stringify convertit l'objet en chaîne JSON.
        email,
        password,
      }),
    });

    const data = (await res.json()) as {
      isLoggedIn: boolean;
    }; // la souris au-dessus de json ci-contre montre que c'est d'une promesse. D'où await devant.

    if (data.isLoggedIn) {
      // si l'utilisateur est connecté, on le redirige vers la page d'accueil.
      navigate('/home');
    }

    console.log(data); // pour vérifier ce que contient data.
  };

  return (
    <>
      {/* */}
      <div className='bg-pastel-blue h-screen'>
        <form onSubmit={onSubmit}>
          <input
            className='bg bg-red 2px m-1 rounded border border-green-400 p-1'
            type='email'
            placeholder='Email'
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <input
            className='bg bg-red 2px m-1 rounded border border-red-400 p-1'
            type='password'
            placeholder='Password'
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <button
            className='button m-1 rounded border border-blue-950 bg-blue-500 p-1 font-bold text-white hover:bg-blue-700'
            type='submit'
          >
            {'Register'}
          </button>
        </form>
      </div>
      {/* */}
    </>
  );
}
