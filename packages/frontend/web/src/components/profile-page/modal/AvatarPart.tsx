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
          <img
            src={`/avatar/avatar-${index + 1}.webp`}
            alt={`avatar-${index + 1}.webp`}
            className={`h-[7rem] w-[7rem] rounded-full object-cover ${
              selectedImage === `avatar-${index + 1}.webp`
                ? 'border-dark border-[3px]'
                : null
            }`}
            onClick={() => {
              handleImageChange(`avatar-${index + 1}.webp`);
            }}
          />
        </div>
      ))}
    </>
  );
}
