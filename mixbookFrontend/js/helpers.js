import store from 'react-native-simple-store';

// export default function getToken() {
//   store.get('account')
//   .then((data) => {
//     data.userInfo.token
//   })
//   .catch((error) => {
//     console.warn("error getting user token from local store");
//   });
// }

export default async function isLoggedIn() {
  await store.get('account')
  .then((data) => {
    if (data.isLoggedIn == true) {
      return true;
    } else {
      return false;
    }
  });
}
