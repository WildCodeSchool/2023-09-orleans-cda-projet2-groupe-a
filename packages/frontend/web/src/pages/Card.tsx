import Menu from '../components/Menu';

const products = [
  {
    image: '/placeholder-product.png',
    name: 'Crème Yves Delux',
    marque: "l'Oréal PARIS",
    category: 'crème pour les mains',
    price: '14,99',
  },
  {
    image: '/placeholder-product.png',
    name: 'Crème Yves Delux',
    marque: "l'Oréal PARIS",
    category: 'crème pour les mains',
    price: '14,99',
  },
  {
    image: '/placeholder-product.png',
    name: 'Crème Yves Delux',
    marque: "l'Oréal PARIS",
    category: 'crème pour les mains',
    price: '14,99',
  },
  {
    image: '/placeholder-product.png',
    name: 'Crème Yves Delux',
    marque: "l'Oréal PARIS",
    category: 'crème pour les mains',
    price: '14,99',
  },
];

export default function Card() {
  return (
    <div
      style={{ backgroundImage: `url('/bg.png')` }}
      className='flex h-screen w-screen justify-center overflow-x-hidden overflow-y-scroll bg-cover bg-no-repeat font-bold tracking-widest'
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
        <div className='flex flex-col-reverse gap-5 lg:flex-row'>
          <div className='bg-primary px-[50px] py-[50px] shadow-md lg:my-[150px]'>
            <h1 className='mb-4 mt-4 text-2xl uppercase tracking-[.25em]'>
              {'Commande N°14565625'}
            </h1>
            <div className='m-2 flex flex-col gap-5'>
              {products.map((product, index) => {
                return (
                  <div key={index}>
                    <div
                      className={`flex flex-col md:flex-row ${
                        products.length === index + 1
                          ? ''
                          : 'border-divider border-b-2'
                      } gap-2 py-10 md:gap-10`}
                    >
                      <div>
                        <img
                          className='h-[100px] w-[100px] object-cover '
                          src={product.image}
                        />
                      </div>
                      <div>
                        <h2 className='mb-2 text-lg capitalize'>
                          {product.name}
                        </h2>
                        <h3 className='text-base font-normal'>
                          {'Marque : '}{' '}
                          <span className='uppercase'>{product.marque}</span>
                        </h3>
                        <h3 className='text-base font-normal'>
                          {'Catégorie : '}{' '}
                          <span className='uppercase'>{product.category}</span>
                        </h3>
                      </div>
                      <h2 className='text-xl text-red-600'>{`${product.price}€`}</h2>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className='bg-primary mt-[150px] h-full shadow-md lg:my-[150px] lg:w-[250px]'>
            <div className='p-7'>
              <div className='border-divider mb-5 border-b-2'>
                <h3 className='mb-3 capitalize'>{'sous-total'}</h3>
                <h4 className='mb-3 text-sm font-[550] normal-case'>
                  {"nombre d'article: 4"}
                </h4>
              </div>
              <div className='flex justify-end'>
                <h1 className='mb-3 text-4xl font-[1500] text-red-600'>
                  {'59,40€'}
                </h1>
              </div>
            </div>
            <button
              className='text-primary w-full bg-black py-4 text-sm uppercase'
              type='button'
            >
              {'Confirmer'}
            </button>
          </div>
        </div>
        <div className='h-[50px]' />
      </div>
    </div>
  );
}
