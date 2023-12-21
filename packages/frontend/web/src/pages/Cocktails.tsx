import CardCocktail from '@/components/cocktails/CardCocktail';
import CardTitle from '@/components/cocktails/CardTitle';
import FilterBar from '@/components/cocktails/FilterBar';

export default function Cocktails() {
  return (
    <div
      className='h-screen w-screen overflow-x-hidden overflow-y-scroll bg-cover bg-center bg-no-repeat pt-16'
      style={{ backgroundImage: `url('bg-cocktails.png')` }}
    >
      <CardTitle />
      <FilterBar />
      <CardCocktail />
    </div>
  );
}
