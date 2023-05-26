import { ReactNode, createContext, useEffect, useState } from 'react';

import { updateCartItemsCount } from '../notifications/tagNotifications';
import {
  StorageCartProps,
  storageClear,
  storageProductGetAll,
  storageProductRemove,
  storageProductSave,
} from '../storage/storageCart';

export type CartContextDataProps = {
  addProductCart: (newProduct: StorageCartProps) => Promise<void>;
  removeProductCart: (productId: string) => Promise<void>;
  finishPurchase: () => Promise<void>;
  cart: StorageCartProps[];
};

type CartContextProviderProps = {
  children: ReactNode;
};

export const CartContext = createContext<CartContextDataProps>(
  {} as CartContextDataProps,
);

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cart, setCart] = useState<StorageCartProps[]>([]);

  async function addProductCart(newProduct: StorageCartProps) {
    try {
      const storageResponse = await storageProductSave(newProduct);
      setCart(storageResponse);
    } catch (error) {
      throw error;
    }
  }

  async function removeProductCart(productId: string) {
    try {
      const response = await storageProductRemove(productId);
      setCart(response);
    } catch (error) {
      throw error;
    }
  }

  async function finishPurchase() {
    try {
      await storageClear();
      setCart([]);
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    storageProductGetAll()
      .then((products) => setCart(products))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    updateCartItemsCount(cart.length);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addProductCart,
        removeProductCart,
        finishPurchase,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
