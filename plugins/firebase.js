import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';
// import 'firebase/messaging'
import 'firebase/storage'

import { bus } from '@/plugins/bus'

let config = {
  apiKey: "AIzaSyDacU8HGVpQrKQJzgqFTeuwG6viniPFofY",
  authDomain: "tsgmedia-e0472.firebaseapp.com",
  databaseURL: "https://tsgmedia-e0472.firebaseio.com",
  projectId: "tsgmedia-e0472",
  storageBucket: "tsgmedia-e0472.appspot.com",
  messagingSenderId: "393265654100",
  appId: "1:393265654100:web:33522d7bce719d9eb200c1",
  measurementId: "G-N293YFPT0L"
};

// const firebase = firebase

// firebase.firestore().enablePersistence({synchronizeTabs: true})
// .catch(function(err) {
//   if (err.code == 'failed-precondition') {
//     // Multiple tabs open, persistence can only be enabled
//     // in one tab at a a time.
//     // ...
//       console.log(err)
//   } else if (err.code == 'unimplemented') {
//     // The current browser does not support all of the
//     // features required to enable persistence
//     // ...
//     console.log(err)
//   }
// })

const app = !firebase.apps.length ? firebase.initializeApp(config) : ''
const db = firebase.firestore();
const database = firebase.database();
// const messaging = firebase.messaging();
const storage = firebase.storage()



export { firebase, db, database, app, storage }