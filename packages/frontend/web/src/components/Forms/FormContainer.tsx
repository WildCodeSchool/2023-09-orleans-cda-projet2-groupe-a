interface Container extends React.HTMLAttributes<HTMLDivElement> {}
export default function FormContainer({ children }: Container) {
  return (
    <div className='text-secondary relative flex h-full flex-col bg-pink-700 px-7 pb-12 pt-5 text-sm shadow-md lg:text-base'>
      {children}
    </div>
  );
}
