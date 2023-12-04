interface StarProps {
  index: number;
}

const starIndex: React.FC<StarProps> = ({ index }) => (
  <img
    key={index}
    src={index === 0 ? 'star-yellow.png' : 'star.png'}
    className='h-[1.7rem] w-[1.7rem]'
    alt={`Star ${index + 1}`}
  />
);

export default starIndex;
