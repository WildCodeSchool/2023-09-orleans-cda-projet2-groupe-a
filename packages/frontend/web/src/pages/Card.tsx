import Menu from '../components/Menu';

const products = [
  {
    image: '/placeholder-product.png',
    name: 'Crème Yves Delux',
    marque: "l'Oréal PARIS",
    category: 'crème pour les mains',
    price: 14.99,
  },
  {
    image: '/placeholder-product.png',
    name: 'Crème Yves Delux',
    marque: "l'Oréal PARIS",
    category: 'crème pour les mains',
    price: 14.99,
  },
  {
    image: '/placeholder-product.png',
    name: 'Crème Yves Delux',
    marque: "l'Oréal PARIS",
    category: 'crème pour les mains',
    price: 14.99,
  },
  {
    image: '/placeholder-product.png',
    name: 'Crème Yves Delux',
    marque: "l'Oréal PARIS",
    category: 'crème pour les mains',
    price: 14.99,
  },
];

export default function Card() {
  return (
    <div
      style={{ backgroundImage: `url('/bg.png')` }}
      className='flex h-screen w-screen justify-center overflow-x-hidden overflow-y-scroll bg-cover bg-no-repeat text-center font-bold uppercase tracking-widest'
    >
      <div>
        <div className='absolute left-[2rem] top-[2rem] h-[120px] w-[120px] cursor-pointer'>
          <img src='/logo.png' />
        </div>
      </div>
      <div>
        <Menu />
      </div>
      <div>
        <div className='bg-primary mb-[150px] mt-[150px] px-[50px] py-[50px]'>
          <h1 className='mb-4 mt-4 text-2xl uppercase tracking-[.25em]'>
            {'Commande N°14565625'}
          </h1>
          <div className='flex flex-col gap-5'>
            {products.map((product, index) => {
              return (
                <div key={product.name}>
                  <div
                    className={`flex ${
                      products.length === index + 1
                        ? ''
                        : 'border-divider border-b-2'
                    } gap-10 p-10`}
                  >
                    <div>
                      <img
                        className='h-[100px] w-[100px] '
                        src={product.image}
                      />
                    </div>
                    <div>
                      <h2>{product.name}</h2>
                      <h3>{product.marque}</h3>
                      <h4>{product.category}</h4>
                    </div>
                    <h2>{product.price}</h2>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
