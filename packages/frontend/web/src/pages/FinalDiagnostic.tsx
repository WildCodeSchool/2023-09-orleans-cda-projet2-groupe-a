import { useCallback, useEffect, useState } from 'react';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';

import CardFinalDiagnostic from '@/components/CardFinalDiagnostic';

import Menu from '../components/Menu';
import { useAuth } from '../contexts/AuthContext';

const productsVieux = [
  {
    name: 'Sérum Anti-Âge Régénérant',
    brand: "L'Oréal Paris",
    category: 'serum visage',
    image: 'serum-anti-age.jpg',
    price: 29.99,
  },
  {
    name: 'Crème Contour des Yeux Anti-Cernes',
    brand: "L'Oréal Paris",
    category: 'crème visage',
    image: 'creme-contour-yeux.jpg',
    price: 19.99,
  },
  {
    name: 'Masque Nourrissant Anti-Rides',
    brand: "L'Oréal Paris",
    category: 'masque viasge',
    image: 'masque-anti-rides.jpg',
    price: 24.99,
  },
  {
    name: 'Correcteur de Rides Intensif',
    brand: "L'Oréal Paris",
    category: 'crème visage',
    image: 'correcteur-rides.jpg',
    price: 34.99,
  },
  {
    name: 'Gel Anti-Fatigue et poche Yeux',
    brand: "L'Oréal Paris",
    category: 'gel visage',
    image: 'gel-anti-fatigue.jpg',
    price: 15.99,
  },
  {
    name: 'Soin Hydratant Nuit Anti-Âge',
    brand: "L'Oréal Paris",
    category: 'crème visage',
    image: 'soin-hydratant-nuit.jpg',
    price: 27.99,
  },
];

const fieldNameItems = 'selectedProducts';

export default function FinalDiagnostic() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState<Product[] | undefined>([]);
  const [products, setProducts] = useState();

  const [bool, setBool] = useState(false);

  const handleClick = useCallback((product) => {
    const selectedProducts = JSON.parse(
      localStorage.getItem(fieldNameItems) || '[]',
    );
    console.log(selectedProducts);
    console.log(product);

    const updatedSelectedProducts = [...selectedProducts, product];
    console.log(updatedSelectedProducts);

    localStorage.setItem(
      fieldNameItems,
      JSON.stringify(updatedSelectedProducts),
    );
    setBool(!bool);
    console.log(`Produit ajouté : ${productId}`);
  }, []);
  return (
    <div
      style={{ backgroundImage: `url('/bg.png')` }}
      className='flex h-screen w-screen items-center justify-center overflow-hidden  bg-cover bg-no-repeat text-center font-bold uppercase tracking-widest'
    >
      <div>
        <div className='absolute left-[2rem] top-[2rem] h-[120px] w-[120px] cursor-pointer'>
          <img src='/logo.png' />
        </div>
      </div>
      <div>
        <Menu bool={bool} setBool={setBool} />
      </div>
      <div className='bg-primary flex items-center justify-center lg:left-[120px] xl:left-[150px]'>
        <div className='h-[80vh] w-[90vw] shadow-lg lg:w-[60vw]'>
          <h1 className='racking-widest ps-10 pt-10 text-left text-2xl font-medium uppercase'>{`recommandé pour vous`}</h1>
          <div className='flex flex-wrap px-20 pb-20 pt-6'>
            <div className='flex h-[35rem] flex-wrap overflow-y-scroll tracking-widest'>
              {productsVieux.map((product, index) => (
                <div
                  key={product.name}
                  className='m-1 h-[28rem] w-[14rem] shadow-lg'
                >
                  <img src='/placeholder-product.png' />

                  <p className='pt-3 uppercase'>{product.name}</p>
                  <p className='uppercase'>{product.category}</p>

                  <p className='pb-8 pt-3 text-sm font-light normal-case'>
                    {product.brand}
                  </p>
                  <button
                    type='button'
                    onClick={() => {
                      // const productId = Number(id);
                      // if (!Number.isNaN(productId)) {
                      handleClick(product);
                      // }
                    }}
                    className='bg-secondary text-primary h-[3.7rem] w-full text-sm font-bold uppercase tracking-widest'
                  >
                    {`ajouter à la liste`}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
