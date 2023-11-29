export default function LevelPart({
  level,
  handleClick,
}: {
  readonly level: number;
  readonly handleClick: (level: number) => void;
}) {
  return (
    <>
      <h1 className='relative bottom-[3%] w-[200px] text-center text-xl uppercase sm:bottom-[10%] sm:w-[300px] sm:text-2xl'>
        {'Choose your duel'}
      </h1>
      <div className='relative bottom-[3%] left-[-4%] flex sm:bottom-[6%] sm:left-[-2%]'>
        <div
          className={`peer order-3 h-[90px] w-[70px] hover:cursor-pointer sm:h-[120px] sm:w-[100px] ${
            level >= 3
              ? "bg-[url('/form-cocktail/fire-level-full.png')]"
              : "bg-[url('/form-cocktail/fire-level-empty.png')]"
          } bg-cover bg-no-repeat hover:bg-[url('/form-cocktail/fire-level-full.png')] peer-hover:bg-[url('/form-cocktail/fire-level-full.png')] `}
          onClick={() => {
            handleClick(3);
          }}
        />
        <div
          className={`peer order-2 h-[90px] w-[70px] hover:cursor-pointer sm:h-[120px] sm:w-[100px] ${
            level >= 2
              ? "bg-[url('/form-cocktail/fire-level-full.png')]"
              : "bg-[url('/form-cocktail/fire-level-empty.png')]"
          } bg-cover bg-no-repeat hover:bg-[url('/form-cocktail/fire-level-full.png')] peer-hover:bg-[url('/form-cocktail/fire-level-full.png')]`}
          onClick={() => {
            handleClick(2);
          }}
        />
        <div
          className={`peer order-1 h-[90px] w-[70px] hover:cursor-pointer sm:h-[120px] sm:w-[100px] ${
            level >= 1
              ? "bg-[url('/form-cocktail/fire-level-full.png')]"
              : "bg-[url('/form-cocktail/fire-level-empty.png')]"
          } bg-cover bg-no-repeat hover:bg-[url('/form-cocktail/fire-level-full.png')] peer-hover:bg-[url('/form-cocktail/fire-level-full.png')]`}
          onClick={() => {
            handleClick(1);
          }}
        />
      </div>
    </>
  );
}
