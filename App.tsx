import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto';
import { NativeBaseProvider } from 'native-base';
import { StatusBar } from 'react-native';
import OneSignal, {
  NotificationReceivedEvent,
  OSNotification,
} from 'react-native-onesignal';

import { ONE_SIGNAL_APP_ID } from '@env';
import { useEffect, useState } from 'react';
import { Loading } from './src/components/Loading';
import { Notification } from './src/components/Notification';
import { CartContextProvider } from './src/contexts/CartContext';
import { createTagUserInfo } from './src/notifications/tagNotifications';
import { Routes } from './src/routes';
import { THEME } from './src/theme';

OneSignal.setAppId(ONE_SIGNAL_APP_ID);

const USER_EMAIL = 'test@onesignal.com';
OneSignal.setEmail(USER_EMAIL);

OneSignal.promptForPushNotificationsWithUserResponse((response) => {
  console.log('Prompt response:', response);
});

export default function App() {
  const [notification, setNotification] = useState<OSNotification | undefined>(
    undefined,
  );
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  useEffect(() => {
    // createTagUserEmail(USER_EMAIL);
    // deleteTag('email');
    createTagUserInfo();
  }, []);

  useEffect(() => {
    const unsubscribed = OneSignal.setNotificationWillShowInForegroundHandler(
      (notificationReceivedEvent: NotificationReceivedEvent) => {
        console.log(notificationReceivedEvent);
        const response = notificationReceivedEvent.getNotification();

        setNotification(response);
      },
    );
  }, []);

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {notification?.title && (
        <Notification
          title={notification.title}
          onClose={() => setNotification(undefined)}
        />
      )}
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>
    </NativeBaseProvider>
  );
}
