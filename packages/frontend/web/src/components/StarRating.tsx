import Star from './StarIndex';

interface StarRatingProps {
  starCount: number;
}

const starRating: React.FC<StarRatingProps> = ({ starCount }) => {
  const stars = [];
  for (let index = 0; index < starCount; index++) {
    stars.push(<Star key={index} index={index} />);
  }

  return <div className='mt-2 flex justify-center'>{stars}</div>;
};

export default starRating;
