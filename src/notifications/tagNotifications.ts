import OneSignal from 'react-native-onesignal';

export function createTagUserEmail(email: string) {
  OneSignal.sendTag('email', email);
}

export function deleteTag(tagName: string) {
  OneSignal.deleteTag(tagName);
}

export function createTagUserInfo() {
  OneSignal.sendTags({
    user_name: 'John',
    user_email: 'johndoe@email.com',
  });
}
