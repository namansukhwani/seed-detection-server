import * as firebase from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import * as serviceAccount from '../serviceAccountKey.json';

firebase.initializeApp({
    credential: firebase.credential.cert(<ServiceAccount>serviceAccount),
    storageBucket:"seed-detection-de9f8.appspot.com"
})

export const bucket = firebase.storage().bucket()
export const db=firebase.firestore()
export default firebase