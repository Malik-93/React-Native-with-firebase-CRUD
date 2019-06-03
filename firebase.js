import { firebase } from '@firebase/app';
import '@firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyBTHB6JsbQUTT9umkC8S5DW0KYLLTKkp8I",
    authDomain: "chat-up-6831e.firebaseapp.com",
    databaseURL: "https://chat-up-6831e.firebaseio.com",
    projectId: "chat-up-6831e",
    storageBucket: "chat-up-6831e.appspot.com",
    messagingSenderId: "1052286825077",
    appId: "1:1052286825077:web:098e7fec5cf503e3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const fieldValue = firebase.firestore.FieldValue
  const db = firebase.firestore();
  export { db, fieldValue } ;
