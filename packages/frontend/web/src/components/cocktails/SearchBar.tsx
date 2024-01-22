import { Search } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface Cocktails {
  cocktail_id: number;
  cocktail_name: string;
  avg_rating: number;
  cocktail_image: string;
  cocktail_created: Date;
  readonly cardCocktails: Cocktails[] | undefined;
}

interface SearchBarProps {
  readonly setCocktails: (cocktails: Cocktails[] | undefined) => void;
  readonly onSubmit: (data: InputSearchBar) => void;
}
type InputSearchBar = {
  searchTerm?: string;
};
export default function SearchBar({ onSubmit }: SearchBarProps) {
  const { register, handleSubmit, watch } = useForm<InputSearchBar>({
    defaultValues: {
      searchTerm: '',
    },
  });

  return (
    <div className='ms-6 mt-4'>
      <div className='group relative'>
        <Search
          size={20}
          className='text-dark absolute left-0 top-1/2 ms-2 -translate-y-1/2 transform stroke-[3px] text-sm'
        />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='bg-card-green border-dark flex h-[2.5rem] w-[2rem] rounded-sm border-[3px] opacity-0 transition-all duration-500 ease-in-out focus:outline-none group-hover:w-[15rem] group-hover:opacity-100 '
        >
          <input
            value={watch('searchTerm')}
            placeholder='Search your cocktail by name or ingredient'
            type='text'
            className='bg-card-green ms-8 h-[100%] w-[100%] border-none outline-none'
            {...register('searchTerm', { required: false })}
          />
        </form>
      </div>
    </div>
  );
}
