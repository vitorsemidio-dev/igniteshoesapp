import { VStack } from 'native-base';
import { useEffect, useState } from 'react';

import { Brands } from '../components/Brands';
import { HomeHeader } from '../components/HomeHeader';
import { ProductCardProps } from '../components/ProductCard';
import { Products } from '../components/Products';
import { PRODUCTS } from '../data/products';

export function Home() {
  const [brandSelected, setBrandSelected] = useState('Nike');
  const [products, setProducts] = useState<ProductCardProps[]>([]);

  useEffect(() => {
    const filtered = PRODUCTS.filter(
      (product) => product.brand === brandSelected,
    ) as ProductCardProps[];
    setProducts(filtered);
  }, [brandSelected]);

  return (
    <VStack flex={1}>
      <HomeHeader />
      <Brands onSelect={setBrandSelected} selected={brandSelected} />
      <Products brand={brandSelected} data={products} />
    </VStack>
  );
}
