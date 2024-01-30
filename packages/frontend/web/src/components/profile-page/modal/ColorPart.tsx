interface ModalColorPartProps {
  readonly selectedColor: string;
  readonly handleColorChange: (color: string) => void;
  readonly colors: string[];
}

export default function ColorPart({
  handleColorChange,
  selectedColor,
  colors,
}: ModalColorPartProps) {
  return (
    <>
      {colors.map((color) => (
        <div
          key={color}
          className={`h-[25px] w-[25px] cursor-pointer rounded-full bg-profile-picture-${color} ${
            selectedColor === color ? 'border-dark border-[3px]' : null
          }`}
          onClick={() => {
            handleColorChange(color);
          }}
        />
      ))}
    </>
  );
}
