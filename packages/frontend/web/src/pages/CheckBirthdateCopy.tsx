import { type FormEvent, useEffect, useMemo, useState } from 'react';
import DatePicker from 'react-datepicker';
import { Navigate, useNavigate } from 'react-router-dom';

import { useAuth } from '@/contexts/AuthContext';

export default function CheckBirthdate2() {
  const [birthdate, setBirthdate] = useState<string>('');
  const [isShownImage, setIsShownImage] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  // useMemo is going to memorize the eighteenYearsAgo value, as long as birthdate doesn't change.
  const eighteenYearsAgo: Date = useMemo(() => {
    const now = new Date();
    return new Date(now.getFullYear() - 18, now.getMonth(), now.getDate());
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    // hide the image and clear the previous timer when birthdate changes.
    setIsShownImage(false);
    let timer: NodeJS.Timeout;

    if (
      birthdate !== '' &&
      new Date(birthdate).getTime() >= eighteenYearsAgo.getTime()
    ) {
      setIsShownImage(true);
      setTimeout(() => {
        setIsShownImage(false);
      }, 3000); // 3 seconds timeout before the image disappears.

      // clear the timer when the component is unmounted or if birthdate changes.
      return () => {
        clearTimeout(timer);
      };
    }
    return () => {
      abortController.abort();
    };
  }, [birthdate, eighteenYearsAgo]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // prevents refresh.
    setIsSubmitted(true);

    if (new Date(birthdate).getTime() < eighteenYearsAgo.getTime()) {
      navigate('/nokidsallowed');
    } else {
      navigate('/register');
    }
    console.log(eighteenYearsAgo.getTime());
    console.log(new Date(birthdate).getTime());

    const res = await fetch(`${import.meta.env.VITE_API_URL}/checkbirthdate`, {
      method: 'POST',
      credentials: 'include', // optional but essentiel to find out the cookie.
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        // body contains birthdate. JSON.stringify converts objectinto a JSON string.
        birthdate,
      }),
    });

    const data = (await res.json()) as {
      isLoggedIn: boolean;
    };

    if (data.isLoggedIn) {
      setIsLoggedIn(true);
      navigate('/home'); // if the user is logged in, he's redirected to homepage.
    }
  };

  if (isLoggedIn) {
    return <Navigate to='/' />;
  }

  return (
    <div className='flex h-auto w-full flex-col items-center justify-center'>
      <form
        onSubmit={handleSubmit}
        className='justiy-center z-50 m-10 flex items-center gap-2'
      >
        <DatePicker
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
          }}
          className="bg-blue-light text-dark font-bold rounded border-2 border-blue-light p-2 m-2"
        >
          <div style={{ color: 'red' }}>
            {"Don't forget to check the weather!"}
          </div>
        </DatePicker>
        <button type='submit'>{'Submit'}</button>
      </form>
    </div>
  );
}
