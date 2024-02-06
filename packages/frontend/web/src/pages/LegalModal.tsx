import { useEffect, useState } from 'react';

const now: Date = new Date();

export default function LegalNotice() {
  const [isModalShown, setIsModalShown] = useState(true);

  // checks LocalStorage when component is mounted.
  // It can store simple datas like user's preferences
  // and would be cleared as long as the user shuts down his browser.
  useEffect(() => {
    const hideModal: string | null = localStorage.getItem('hide-legal-notice');
    if (hideModal === 'true') {
      setIsModalShown(false);
    }
  }, []);

  const handleClose = () => {
    // registers user's choice into browser's LocalStorage
    localStorage.setItem('hide-legal-notice', 'true');
    setIsModalShown(false);
  };

  // NB : The condition below is a preventive mesure.
  // It ensures that if the modal is not shown, then, it returns null.
  if (!isModalShown) {
    return null;
  }

  return (
    <div className='flex flex-col items-center text-black'>
      <div className='z-50 flex h-screen w-screen flex-col items-center justify-center gap-6 text-4xl'>
        <div className='bg-light-green xxs:rounded-xl xxs:text-xl m-2 rounded-[30px] border-[5px] border-black p-4 font-bold transition-transform duration-500 ease-in-out hover:rotate-1 hover:scale-110 hover:justify-normal hover:bg-opacity-80 sm:rounded-3xl sm:text-6xl'>
          <a href='/virgin'>{'Legal Notice'}</a>
          {/* Todo : relier à la page /virgin ou cocktail random healthy */}
        </div>
        <div className='xxs:rounded-3xl xxs:text-lg z-50 mt-3 flex h-2/3 w-2/3 flex-col overflow-auto overscroll-y-contain border-[6px] border-black bg-blue-400 object-center opacity-90 shadow-2xl sm:rounded-[90px]'>
          <h1 className='xxs:text-md p-0.3 mx-0.5 my-10 text-center font-bold sm:text-3xl'>
            {'Warning against excessive alcohol consumption'}
          </h1>
          <div className='leading-5loose justify-center px-8 text-lg tracking-widest'>
            <h2 className='xxs:text-md mb-2 sm:text-xl'>{'Article 1'}</h2>
            <p className='xxs:text-xs xxs:leading-5 mb-4 sm:text-sm'>
              {
                'This warning aims to inform site users about the risks associated with excessive alcohol consumption and to promote responsible drinking.'
              }
            </p>
            <h2 className='xxs:text-md mb-2 sm:text-xl'>
              {'Article 2: Definition of Excessive Consumption'}
            </h2>
            <p className='xxs:text-xs xxs:leading-5 mb-4 sm:text-sm'>
              {
                'Consumption is considered excessive when it exceeds the recommendations of public health authorities, generally more than two standard drinks per day for women and three for men.'
              }
            </p>

            <h2 className='xxs:text-md mb-2 sm:text-xl'>
              {'Article 3: Health Risks'}
            </h2>
            <p className='xxs:text-xs xxs:leading-5 mb-4 sm:text-sm'>
              {
                'Excessive alcohol consumption is associated with an increased risk of developing numerous diseases, including liver, cardiovascular, neurological, and psychiatric disorders, as well as certain types of cancer.'
              }
            </p>

            <h2 className='xxs:text-md mb-2 sm:text-xl'>
              {'Article 4: Social and Legal Consequences'}
            </h2>
            <p className='xxs:text-xs xxs:leading-5 mb-4 sm:text-sm'>
              {
                'Excessive alcohol consumption can lead to risky behaviors, accidents, violence, and relationship problems. It may also have legal consequences in cases of driving under the influence of alcohol or reprehensible behaviors.'
              }
            </p>

            <h2 className='xxs:text-md mb-2 sm:text-xl'>
              {'Article 5: Recommendations for Responsible Consumption'}
            </h2>
            <h3 className='mb-2 text-lg'>
              {'5.1. Limit your consumption to a moderate level'}
            </h3>
            <p className='xxs:text-xs xxs:leading-5 mb-4 sm:text-sm'>
              {
                'It is advised not to exceed the recommended amounts of alcohol per day.'
              }
              {
                'Moderate consumption helps to reduce health risks and maintain a balance in life habits.'
              }
            </p>

            <h3 className='mb-2 text-lg'>
              {'5.2. Avoid consuming alcohol in certain situations'}
            </h3>
            <p className='xxs:text-xs xxs:leading-5 mb-4 sm:text-sm'>
              {
                'It is imperative not to consume alcohol before driving, during pregnancy, or when taking certain medications.'
              }
              {
                'Alcohol can impair judgment and reflexes, and have harmful effects on fetal development.'
              }
            </p>

            <h3 className='mb-2 text-lg'>
              {'5.3. Alternate alcohol consumption with water'}
            </h3>
            <p className='xxs:text-xs xxs:leading-5 mb-4 sm:text-sm'>
              {
                'To avoid dehydration and reduce intoxication, it is recommended to alternate each glass of alcohol with a glass of water.'
              }
              {'This also helps to decrease the amount of alcohol consumed.'}
            </p>

            <h3 className='mb-2 text-lg'>
              {'5.4. Do not consume alcohol on an empty stomach'}
            </h3>
            <p className='xxs:text-xs xxs:leading-5 mb-4 sm:text-sm'>
              {
                'Drinking alcohol on an empty stomach increases the speed of alcohol absorption into the bloodstream.'
              }
              {
                'Therefore, it is advised to eat before drinking to mitigate the effects of alcohol.'
              }
            </p>
            <h2 className='xxs:text-md mb-2 sm:text-xl'>
              {'Article 6: Warning to Minors'}
            </h2>
            <p className='xxs:text-xs xxs:leading-5 mb-4 sm:text-sm'>
              {
                'The sale and consumption of alcohol are strictly prohibited to minors. It is the responsibility of each user to comply with the legislation in force regarding the legal drinking age.'
              }
            </p>

            <h2 className='xxs:text-md mb-2 sm:text-xl'>
              {'Article 7: Assistance and Support'}
            </h2>
            <p className='xxs:text-xs xxs:leading-5 mb-4 sm:text-sm'>
              {
                'If you or someone you know is facing problems related to alcohol, it is strongly advised to seek help from health professionals or specialized associations.'
              }
            </p>

            <h2 className='xxs:text-md mb-2 sm:text-xl'>
              {'Article 8: Application of the Warning'}
            </h2>
            <p className='xxs:text-xs xxs:leading-5 mb-4 sm:text-sm'>
              {
                'This warning applies to all users of the site and must be read and accepted before any use of the services offered in connection with alcohol consumption.'
              }
            </p>

            <h2 className='xxs:text-md mb-2 sm:text-xl'>
              {'Article 9: Modification of the Warning'}
            </h2>
            <p className='xxs:text-xs xxs:leading-5 mb-4 sm:text-sm'>
              {
                'The site operator reserves the right to modify this warning at any time to adapt it to legislative or regulatory changes.'
              }
            </p>

            <p className='xxs:text-xs mb-4 pb-4 sm:text-sm'>
              {
                'By using this site, you acknowledge having read this warning and commit to respecting the recommendations for responsible alcohol consumption.'
              }
            </p>
            <div className='my-10 flex flex-col items-center justify-center sm:flex-row sm:justify-around'>
              <div className='xxs:text-xs flex items-center justify-center text-center sm:text-sm'>
                {'YummyCorn'}
                <img
                  src='/yummycorn.svg'
                  alt='YummyCorn Logo'
                  className='mx-3 h-[60px] w-[60px]'
                />
                {' 2023 - ' + now.toLocaleDateString().slice(6, 10)}
              </div>
              <div className='xxs:text-xs xxs:flex xxs:mt-5 flex flex-col items-center justify-center rounded-xl border-2 border-transparent p-2 text-right text-blue-300 duration-500 hover:border-blue-500 sm:mt-0 sm:text-sm'>
                <button type='button' onClick={handleClose}>
                  {"Don't show this message again"}
                </button>
              </div>
            </div>
          </div>
        </div>
        <button
          type='button'
          className='font-stroke text-light hover:text-dark-purple duration-250 flex h-[10px] w-[10px] justify-end transition-transform ease-in-out hover:scale-110'
          onClick={() => {
            setIsModalShown(false);
          }}
        >
          <div className='items-center'>{'X'}</div>
        </button>
      </div>
    </div>
  );
}
