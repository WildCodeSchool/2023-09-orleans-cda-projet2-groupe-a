interface CardImageProps {
  readonly image: string | undefined;
  readonly totalDegree: number;
}
const picture = (image: string | undefined, total_degree: number) => {
  if (image === null) {
    return total_degree > 0
      ? '/placeholder-cocktail.webp'
      : '/placeholder-cocktail-virgin.webp';
  } else {
    return `uploads/${image}`;
  }
};
export default function CardImage({ image, totalDegree }: CardImageProps) {
  return (
    <img
      src={picture(image, totalDegree)}
      alt='Cocktail picture'
      className='border-dark mx-auto mt-8 h-[13rem] w-[14rem] rounded-sm border-[3px] object-cover'
    />
  );
}
