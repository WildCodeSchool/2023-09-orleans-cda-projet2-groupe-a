interface Square {
  color: string;
  order: { lg: number | string; md: number | string };
  biasSide: { lg: string[]; md: string[] };
  width: { lg: number; md: number };
  right?: { lg: number; md: number } | undefined;
  component: JSX.Element;
}

interface FormPartProps {
  readonly square: Square;
  readonly index: number;
  readonly show: number;
}

export default function FormPart({ square, index, show }: FormPartProps) {
  return (
    <div
      key={square.color}
      className={`bg-dark relative lg:clip-path-polygon-${
        square.color
      }-lg md:clip-path-polygon-${square.color}-shaker-md lg:order-${
        square.order.lg
      } md:order-${square.order.md} h-screen w-full md:h-full lg:w-[${
        square.width.lg
      }%] md:w-[${square.width.md}%] ${
        square.right === undefined
          ? ''
          : `lg:right-[${square.right.lg}%] md:right-[${square.right.md}%]`
      }`}
    >
      <div
        className={`lg:clip-path-polygon-${
          square.color
        }-lg md:clip-path-polygon-${
          square.color
        }-shaker-md h-screen w-full bg-transparent md:h-full md:p-2 ${
          square.biasSide.md.includes('left') ? 'md:ps-2.5' : ''
        } ${square.biasSide.md.includes('right') ? 'md:pe-2.5' : ''} ${
          square.biasSide.lg.includes('left') ? 'lg:ps-2.5' : ''
        } ${square.biasSide.lg.includes('right') ? 'lg:pe-2.5' : ''}`}
      >
        <div
          className={`bg-dark-${square.color} lg:clip-path-polygon-${square.color}-lg md:clip-path-polygon-${square.color}-shaker-md border-dark relative h-screen w-full border-[10px] md:h-full md:border-none`}
        >
          <div
            className={`filter-black-to-${square.color} flex h-screen w-full items-center justify-center bg-cover bg-center bg-no-repeat md:h-full md:bg-[url('polygon-black.png')]`}
          />
          <div
            className={`
            ${show < index + 1 ? 'opacity-0' : 'opacity-100'} 
            absolute left-[3%] 
            top-0 flex h-screen w-[95%] flex-col items-center justify-center transition-opacity duration-500 sm:left-[10%] md:left-0 bg-[url('form-cocktail/bubble/bubble-${
              index + 1
            }.png')] bg-contain bg-center bg-no-repeat sm:w-[80%] md:h-full md:w-full md:bg-auto`}
          >
            {square.component}
          </div>
        </div>
      </div>
    </div>
  );
}
