import { useNavigation } from '@react-navigation/native';
import { FlatList, VStack, useToast } from 'native-base';

import { Button } from '../components/Button';
import { useCart } from '../hooks/useCart';
import { HeaderList } from './HeaderList';
import { ItemCartCard } from './ItemCartCard';

export function ItemsCart() {
  const { cart, removeProductCart, finishPurchase } = useCart();
  const toast = useToast();
  const { navigate } = useNavigation();

  async function handleItemRemove(productId: string) {
    try {
      await removeProductCart(productId);

      toast.show({
        title: 'Produto removido',
        placement: 'top',
        bgColor: 'green.500',
      });
    } catch (error) {
      toast.show({
        title: 'Não foi possível remover o produto',
        placement: 'top',
        bgColor: 'reed.500',
      });
    }
  }

  async function handleFinishPurchase() {
    try {
      await finishPurchase();

      toast.show({
        title: 'Compra finalizada',
        placement: 'top',
        bgColor: 'green.500',
      });
      navigate('products');
    } catch (error) {
      toast.show({
        title: 'Não foi possível finalizar a compra',
        placement: 'top',
        bgColor: 'reed.500',
      });
    }
  }

  return (
    <VStack flex={1}>
      <HeaderList title="Produtos" counter={cart.length} />

      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ItemCartCard
            data={item}
            onRemove={() => handleItemRemove(item.id)}
          />
        )}
        _contentContainerStyle={{ alignItems: 'center', paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        px={8}
        mt={2}
      />

      {cart.length > 0 && (
        <Button
          title="Finalizar compra"
          mx={8}
          my={3}
          onPress={handleFinishPurchase}
        />
      )}
    </VStack>
  );
}
