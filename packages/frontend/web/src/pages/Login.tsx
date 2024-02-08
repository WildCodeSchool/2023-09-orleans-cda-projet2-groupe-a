import { type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// import CheckBirthdateAnimations from '@/components/CheckBirthdateAnimations';
import GreetsLogin from '@/components/GreetsLogin';
import { useAnimations } from '@/contexts/AnimationsContext';
import { useAuth } from '@/contexts/AuthContext';
import { useBirth } from '@/contexts/BirthContext';

export default function Login() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const { birthdate } = useBirth();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isUnderAge, setIsUnderAge] = useState<boolean>();
  const { setIsImageShown, setIsModalShown, isWow, setIsWow } = useAnimations();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // prevents default behaviour that would refresh the page.

    // Fetch sends request to /login route and returns a promise that is the answer to that request.
    // Await suspends code execution as soon as the promise is resolved.
    // Param1 from fetch : server adress & route.
    // Param2: Object containing : method, credentials, headers, body.

    try {
      const res = await fetch(`/api/auth/login`, {
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
        isLoggedIn: boolean;
        // isUnderAge: boolean;
      }; // Hover .json shows that it's a promise. la souris au-dessus de json ci-contre montre que c'est d'une promesse. Hence, the mention "await" preceed res.json.

      if (
        data.isLoggedIn
        // && !data.isUnderAge
      ) {
        setIsLoggedIn(true);
        navigate('/'); // If the user is logged in, he's redirected towards homepage.
      }
      // (data.isUnderAge)
      else {
        setIsLoggedIn(true);
        // setIsUnderAge(true);
        navigate('/virgin'); // If the user is logged in && is under 18, he's redirected towards virgin page where alcohol is prohibited.
      }
    } catch (error) {
      console.error(
        'Error occured while logging in. Please try again later.',
        error,
      );
    }

    if (
      birthdate &&
      // isUnderAge &&
      isLoggedIn
    ) {
      document.body.classList.add('overflow-hidden');
      setIsImageShown(true);
      setTimeout(() => {
        setIsModalShown(true);
        setIsModalOpen;
      }, 2500);
      if (isModalOpen) {
        setTimeout(() => {
          setIsModalOpen(false);
          navigate('/register');
        }, 1000);
      }
    } else {
      setTimeout(() => {
        if (!isWow) {
          setIsWow(true);
        }
        setTimeout(() => {
          document.body.classList.add('overflow-hidden');
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth',
          });
        }, 700);
      }, 1200);
    }
  };

  return (
    <div className='bg-pastel-blue flex h-screen items-center justify-center p-5'>
      <div
        className='absolute z-40 h-screen w-screen overflow-x-hidden bg-center bg-no-repeat'
        style={{ backgroundImage: `url('/enter.svg')` }}
      >
        <div className='flex h-screen w-screen flex-col items-center justify-center'>
          {isLoggedIn ? <GreetsLogin /> : null}
          <h1 className='text-light font-stroke justify mb-4 text-center text-5xl font-bold'>
            {'Login'}
          </h1>
          {/* {isUnderAge !== undefined && (
            <CheckBirthdateAnimations isUnderAge={isUnderAge} />
          )} */}
          <form
            onSubmit={handleSubmit}
            className='z-50 m-10 flex flex-col items-center gap-2'
          >
            <input
              className='2px border-dark z-40 m-1 h-14 w-72 rounded border-[5px] p-1 text-center text-xl md:w-80 md:text-2xl'
              type='email'
              placeholder='Email'
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <input
              className='2px border-dark z-40 m-1 h-14 w-72 rounded border-[5px] p-1 text-center text-xl md:w-80 md:text-2xl'
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
        </div>
      </div>
      <div className='fixed top-1 z-40 flex h-1/5 flex-col items-start justify-center'>
        {email !== '' && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) && (
          <div className='mb-3 rounded border-2 border-red-600 bg-red-300 p-1'>
            {'example@example.com'}
          </div>
        )}
        {password == '' ||
          (password.length < 3 && (
            <>
              <div className='mb-3 rounded border-2 border-red-600 bg-red-300 p-1 '>
                {'Password must contain at least 3 caracters'}
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
