import React, { useState } from 'react';

interface ImageWithFallbackProps {
  readonly src: string;
  readonly name: string;
}

export default function ImageWithFallback({
  src,
  name,
}: ImageWithFallbackProps) {
  const fallback = '/placeholder-product.png';
  const [currentSource, setCurrentSource] = useState(src);

  const handleError = () => {
    setCurrentSource(fallback);
  };

  return (
    <img
      src={currentSource}
      alt={name}
      className='h-[100px] w-[100px] object-cover'
      onError={handleError}
    />
  );
}
