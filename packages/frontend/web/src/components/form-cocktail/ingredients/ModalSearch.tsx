interface ModalSearchProps {
  readonly setIsModalShown: (isModalShown: boolean) => void;
}

export default function ModalSearch({ setIsModalShown }: ModalSearchProps) {
  return (
    <div className='bg-light fixed left-0 top-0 z-50 flex h-screen w-screen flex-col items-center text-black'>
      <div>
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
