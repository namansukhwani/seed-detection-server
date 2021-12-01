import * as firebase from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import * as serviceAccount from '../serviceAccountKey.json';

firebase.initializeApp({
    credential: firebase.credential.cert(<ServiceAccount>serviceAccount),
})

export default firebase;