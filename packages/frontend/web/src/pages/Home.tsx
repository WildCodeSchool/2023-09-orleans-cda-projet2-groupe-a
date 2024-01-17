import ReactPlayer from 'react-player';

export default function Home() {
  const videoUrl = '/home-video.mp4';
  return (
    <div
      className='relative h-screen w-screen overflow-hidden bg-black
    '
    >
      <ReactPlayer
        url={videoUrl}
        width='100%'
        height='100%'
        playing
        muted
        loop
        pip
      />
      <div className='absolute left-[20px] top-[1px] z-10 flex items-center justify-center lg:left-[120px] xl:left-[150px]'>
        <div className='mt-24 h-[70vh] w-[95vw] shadow-lg lg:w-[80vw]'>
          <div className='flex'>
            <div className='bg-primary/30 h-[80vh] w-[50%] backdrop-blur-md'>
              <img
                className='m-auto mt-32 h-[450px] w-[450px]'
                src='/Logo2.svg'
              />
            </div>
            <div className='bg-secondary text-primary h-[80vh] w-[50%]'>
              <h1 className='mt-10 text-center font-light tracking-widest lg:mt-16'>{`Bienvenue sur L'ORÉAL DIAGNOSTIC `}</h1>
              <div className='mx-10 mb-20 mt-16 lg:mx-24 xl:mt-28'>
                <form className='h-[15vh] w-[40%] font-light tracking-widest'>
                  <div className='mb-10'>
                    <label>{`Email`}</label>

                    <img className='mt-3' src='/user.svg' />
                    <input
                      type='text'
                      id='text'
                      className='w-[18rem] border-b-2 bg-transparent outline-none xl:w-[25rem]'
                    />
                  </div>
                  <div className='mb-10'>
                    <label>{`Mot de passe`}</label>
                    <img className='mt-3' src='/lock.svg' />
                    <input
                      type='text'
                      id='text'
                      className='w-[18rem] border-b-2 bg-transparent outline-none xl:w-[25rem]'
                    />
                  </div>
                  <div className='flex justify-end'>
                    <button
                      type='button'
                      className='bg-primary text-secondary h-[2.5rem] w-[10rem] text-xs font-extrabold uppercase tracking-widest shadow-md'
                    >
                      {`connexion`}
                    </button>
                  </div>
                </form>
              </div>
              <div className='mt-60 flex-col pb-4'>
                <p className='text-center font-light'>{`Pas encore de compte?`}</p>
                <div className='mt-6 flex justify-center'>
                  <button
                    type='button'
                    className='bg-primary text-secondary h-[2.5rem] w-[10rem] text-xs font-extrabold uppercase tracking-widest shadow-md'
                  >
                    {`s'enregistrer`}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
