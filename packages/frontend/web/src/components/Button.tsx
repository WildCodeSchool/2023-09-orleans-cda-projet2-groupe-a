/* eslint-disable react/button-has-type */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  readonly children: React.ReactNode;
  readonly type: 'button' | 'submit' | 'reset';
  readonly onClick?: () => void;
}

export default function Button({ children, type, onClick }: ButtonProps) {
  return (
    // Use Link for navigation
    <button
      type={type}
      onClick={onClick}
      className={`text-secondary bg-primary font-title border px-5 py-2 text-sm uppercase tracking-[5px]`}
    >
      {children}
    </button>
  );
}
