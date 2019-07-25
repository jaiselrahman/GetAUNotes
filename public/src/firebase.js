import firebaseConfig from './firebaseConfig'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/firestore'
import 'firebase/functions'
import 'firebase/messaging'

firebase.initializeApp(firebaseConfig);
firebase.firestore().enablePersistence()
    .catch(function (err) {
        console.log(err);
    });

export default firebase