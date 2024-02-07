import type { CommentsProfile } from '@app/types';

import Comments from './Comments';

interface CommentsSectionProfileProps {
  readonly comments: CommentsProfile[] | null;
}

export default function CommentsSection({
  comments,
}: CommentsSectionProfileProps) {
  return (
    <>
      <h1 className='font-stroke-title text-light ml-7 pb-5 text-xl font-extrabold uppercase lg:text-2xl'>
        {'your comments'}
      </h1>
      <div>
        <div className='mb-20 ms-8 mt-5 flex grid h-full w-full items-center justify-center gap-5 md:grid-cols-2 lg:grid-cols-3'>
          {comments === null ? (
            '"No comments yet"'
          ) : (
            <Comments comments={comments} />
          )}
        </div>
      </div>
    </>
  );
}
