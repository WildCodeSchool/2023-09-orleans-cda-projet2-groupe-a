import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type Product = {
  id: number;
  name: string;
  brand: string;
  description: string;
  image: string;
};

type RouteParameters = {
  id: string;
};

export default function CardFinalDiagnostic() {
  const { id } = useParams<RouteParameters>();
  const [products, setProducts] = useState<Product[] | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState<Product[] | undefined>([]);
  const fieldNameItems = 'selectedProducts';

  const fetchProducts = async (url: string, signal: AbortSignal) => {
    const response = await fetch(url, {
      signal,
    });
    if (response.ok) {
      const data = await response.json();
      setProducts(data.products);
      console.log(data.products);
      setIsLoading(false);
    } else {
      console.error(`Request error: ${response.status}`);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const savedItems = localStorage.getItem(fieldNameItems);

    if (savedItems !== null) {
      setSelectedItems(JSON.parse(savedItems));
    }
    fetchProducts(`${import.meta.env.VITE_API_URL}/product`, signal).catch(
      (error) => {
        console.error(error);
      },
    );

    return () => {
      controller.abort();
    };
  }, [id]);

  const handleClick = useCallback(
    (productId: number) => {
      const selectedProducts: Product[] = JSON.parse(
        localStorage.getItem(fieldNameItems) || '[]',
      );

      const productToAdd = products?.find(
        (product) => product.id === productId,
      );

      if (productToAdd) {
        const updatedSelectedProducts = [...selectedProducts, productToAdd];
        localStorage.setItem(
          fieldNameItems,
          JSON.stringify(updatedSelectedProducts),
        );
        setSelectedItems(updatedSelectedProducts);
        console.log(`Produit ajouté : ${productId}`);
      }
    },
    [products],
  );

  return (
    <div className='flex h-[35rem] flex-wrap overflow-y-scroll tracking-widest'>
      <div className='m-1 h-[25rem] w-[14rem] shadow-lg'>
        <img src='/placeholder-product.png' />

        <p className='pt-3 uppercase'>{`product name`}</p>
        <p className='uppercase'>{`brand product`}</p>

        <p className='pb-8 pt-3 text-sm font-light normal-case'>{`Petite description`}</p>
        <button
          type='button'
          onClick={() => {
            // const productId = Number(id);
            // if (!Number.isNaN(productId)) {
            handleClick(Number(1));
            // }
          }}
          className='bg-secondary text-primary h-[3.7rem] w-full text-sm font-bold uppercase tracking-widest'
        >
          {`ajouter à la liste`}
        </button>
      </div>
    </div>
  );
}
