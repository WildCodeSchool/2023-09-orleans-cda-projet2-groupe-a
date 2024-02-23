import { type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CheckBirthdateAnimations from '@/components/CheckBirthdateAnimations';
import GreetsLogin from '@/components/GreetsLogin';
import { useAge } from '@/contexts/AgeContext';
import { useAnimations } from '@/contexts/AnimationsContext';
import { useAuth } from '@/contexts/AuthContext';

export default function Login() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const { isUnderAge, setIsUnderAge } = useAge();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isUnderAge, setIsUnderAge] = useState<boolean>();
  const { setIsSubmitted, setIsImageShown, setIsModalShown, isWow, setIsWow } =
    useAnimations();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // prevents default behaviour that would refresh the page.
    setIsSubmitted(true);
    // Fetch sends request to /login route and returns a promise that is the answer to that request.
    // Await suspends code execution as soon as the promise is resolved.
    // Param1 from fetch : server adress & route.
    // Param2: Object containing : method, credentials, headers, body.

    try {
      const res = await fetch(`api/auth/login`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json', // The "content-type" header specifies Express what kind of content is in the http request. Aka JSON.
        },
        body: JSON.stringify({
          // body contains email & password. JSON.stringify converts the objet into a JSON string.
          email,
          password,
        }),
      });

      const data = (await res.json()) as {
        ok: boolean;
        isLoggedIn: boolean;
        isUnderAge: boolean;
      }; // Hover .json shows that it's a promise. Hence, the mention "await" preceed res.json.

      if (data.ok) {
        setIsUnderAge(data.isUnderAge);
        setIsImageShown(true);
        setIsLoggedIn(true);
        if (data.isUnderAge) {
          if (isWow) {
            setIsWow(false);
          }
          setTimeout(() => {
            setIsModalShown(true);
          }, 700);
          setTimeout(() => {
            setTimeout(() => {
              navigate('/virgin');
            }, 3500);
          }, 1700);
        } else {
          setIsWow(true);
          setTimeout(() => {
            navigate('/');
          }, 3000);
        }
      }
    } catch (error) {
      console.error(
        'Error occured while logging in. Please try again later.',
        error,
      );
    }
  };

  return (
    <div className='bg-pastel-blue flex h-screen items-center justify-center p-5'>
      <div
        className='absolute z-30 h-screen w-screen overflow-x-hidden bg-center bg-no-repeat'
        style={{ backgroundImage: `url('/enter.svg')` }}
      >
        <div className='z-40 mt-10 flex h-screen w-screen flex-col items-center justify-center'>
          {isLoggedIn ? <GreetsLogin /> : null}
          <h1 className='text-light font-stroke justify mb-4 text-center text-5xl font-bold'>
            {'Login'}
          </h1>
          <form
            onSubmit={handleSubmit}
            className='m-10 flex flex-col items-center gap-2'
          >
            <input
              className='2px border-dark m-1 h-14 w-72 rounded border-[5px] p-1 text-center text-xl md:w-80 md:text-2xl'
              type='email'
              placeholder='Email'
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <input
              className='2px border-dark m-1 h-14 w-72 rounded border-[5px] p-1 text-center text-xl md:w-80 md:text-2xl'
              type='password'
              placeholder='Password'
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <div className='flex items-center justify-center gap-1.5'>
              <button
                className='button border-dark m-1 h-14 w-[288px] rounded border-[5px] bg-blue-500 p-1 text-sm font-bold text-white hover:bg-blue-700 md:w-[185px] md:text-xl'
                type='submit'
              >
                {'Login'}
              </button>
            </div>
          </form>
          {isUnderAge !== undefined && <CheckBirthdateAnimations />}
        </div>
      </div>
      <div className='fixed top-1 z-40 flex h-1/5 flex-col items-start justify-center'>
        {email !== '' && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) && (
          <div className='mb-3 rounded border-2 border-red-600 bg-red-300 p-1'>
            {'example@example.com'}
          </div>
        )}
        {password == '' ||
          (password.length < 10 && (
            <>
              <div className='mb-3 rounded border-2 border-red-600 bg-red-300 p-1 '>
                {'Password must contain at least 10 caracters'}
              </div>
              <div className='mb-3 rounded border-2 border-red-600 bg-red-300 p-1 '>
                {'Password field must be completed'}
              </div>
            </>
          ))}
      </div>
    </div>
  );
}
