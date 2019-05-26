import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyBtFH0HqCkCLFOQdqxru7uBEBfs16-6L0I',
  authDomain: 'prime-db-d6711.firebaseapp.com',
  databaseURL: 'https://prime-db-d6711.firebaseio.com',
  projectId: 'prime-db-d6711',
  storageBucket: 'prime-db-d6711.appspot.com',
  messagingSenderId: '768922239879',
  appId: '1:768922239879:web:27b4cd7f010ebc88',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
