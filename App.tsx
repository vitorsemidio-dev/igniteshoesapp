import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto';
import { NativeBaseProvider } from 'native-base';
import { StatusBar } from 'react-native';
import OneSignal from 'react-native-onesignal';

import { ONE_SIGNAL_APP_ID } from '@env';
import { useEffect } from 'react';
import { Loading } from './src/components/Loading';
import { CartContextProvider } from './src/contexts/CartContext';
import { Routes } from './src/routes';
import { THEME } from './src/theme';

OneSignal.setAppId(ONE_SIGNAL_APP_ID);

const USER_EMAIL = 'test@onesignal.com';
OneSignal.setEmail(USER_EMAIL);

OneSignal.promptForPushNotificationsWithUserResponse((response) => {
  console.log('Prompt response:', response);
});

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  useEffect(() => {
    const unsubscribe = OneSignal.setNotificationOpenedHandler((event) => {
      const { actionId } = event.action as any;
      const actions: { [key: string]: () => void } = {
        '1': () => console.log('Ver todas'),
        '2': () => console.log('Ver pedidos'),
      };
      const defaultAction = () => console.log('Notificação aberta');
      const action = actions[actionId] || defaultAction;
      action();
    });

    return () => unsubscribe;
  }, []);

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>
    </NativeBaseProvider>
  );
}
