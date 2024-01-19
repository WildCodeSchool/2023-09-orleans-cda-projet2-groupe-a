import { useEffect, useState } from 'react';

interface Container extends React.HTMLAttributes<HTMLDivElement> {
  readonly page: number;
}

interface Category {
  id: number;
  name: string;
}
export default function FormContainer({ children, page }: Container) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/criteria/categories`,
        {
          signal: controller.signal,
        },
      );

      const data = await response.json();
      setCategories(data);
    })();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className='text-secondary relative flex h-full text-sm lg:text-base'>
      <div className='border-secondary flex w-[30%] flex-col justify-around border-r'>
        {categories.map((category, index) => (
          <div
            key={category.id}
            className={`text-primary flex grow items-center justify-start px-3 ${index === page ? 'bg-primary text-secondary' : 'bg-secondary text-primary'}`}
          >
            <h2>{category.name}</h2>
          </div>
        ))}
      </div>
      <div className='flex grow flex-col justify-between px-5 py-5'>
        {children}
      </div>
    </div>
  );
}
