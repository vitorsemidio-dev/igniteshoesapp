import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { useTheme } from 'native-base';
import { useEffect, useState } from 'react';
import OneSignal, {
  NotificationReceivedEvent,
  OSNotification,
} from 'react-native-onesignal';

import { Notification } from '../components/Notification';
import { AppRoutes } from './app.routes';

const linking = {
  prefixes: ['com.vitorsemidio.igniteshoesapp://'],
  config: {
    screens: {
      details: {
        path: 'details/:productId',
        parse: {
          productId: (productId: string) => productId,
        },
      },
      cart: {
        path: 'cart',
      },
    },
  },
};

export function Routes() {
  const { colors } = useTheme();
  const [notification, setNotification] = useState<OSNotification | undefined>(
    undefined,
  );

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  useEffect(() => {
    const unsubscribed = OneSignal.setNotificationWillShowInForegroundHandler(
      (notificationReceivedEvent: NotificationReceivedEvent) => {
        console.log(notificationReceivedEvent);
        const response = notificationReceivedEvent.getNotification();

        setNotification(response);
      },
    );

    return () => unsubscribed;
  }, []);

  return (
    <NavigationContainer linking={linking} theme={theme}>
      <AppRoutes />

      {notification && (
        <Notification
          data={notification}
          onClose={() => setNotification(undefined)}
        />
      )}
    </NavigationContainer>
  );
}
