import * as firebase from 'firebase-admin';
import * as serviceAccount from '../serviceAccountKey.json';

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
})

export default firebase;