import firebaseConfig from './firebaseConfig'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'

firebase.initializeApp(firebaseConfig);

export default firebase