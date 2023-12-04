interface CommentComponentProps {
  numberComment: number;
}

const commentComponent: React.FC<CommentComponentProps> = ({
  numberComment,
}) => {
  const comments = Array.from({ length: numberComment }, (_, index) => (
    <img key={index} src='comment.png' className='w-full sm:w-1/2 lg:w-1/3' />
  ));

  return <div className='flex w-full flex-wrap p-2'>{comments}</div>;
};

export default commentComponent;
