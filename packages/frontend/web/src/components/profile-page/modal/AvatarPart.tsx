interface ModalAvatarPartProps {
  readonly handleImageChange: (image: string) => void;
  readonly selectedImage: string;
}

export default function AvatarPart({
  handleImageChange,
  selectedImage,
}: ModalAvatarPartProps) {
  return (
    <>
      {Array.from({ length: 22 }, (_, index: number) => (
        <div key={index} className='flex gap-3'>
          <input
            className='hover:cursor-pointer'
            type='checkbox'
            id={`avatar-${index + 1}.webp`}
            value={`avatar-${index + 1}.webp`}
            checked={selectedImage === `avatar-${index + 1}.webp`}
            onChange={() => {
              handleImageChange(`avatar-${index + 1}.webp`);
            }}
          />
          <img
            src={`/avatar/avatar-${index + 1}.webp`}
            alt={`avatar-${index + 1}.webp`}
            className=' w-[70%] object-cover'
            onClick={() => {
              handleImageChange(`avatar-${index + 1}.webp`);
            }}
          />
        </div>
      ))}
    </>
  );
}
