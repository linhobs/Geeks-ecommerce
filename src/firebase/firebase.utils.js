
//handle imports
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics'

const config = {
    apiKey: "AIzaSyDIY2mp_vLsh_PWGweUM7dpHFzNXDk_jWc",
    authDomain: "shopit-db.firebaseapp.com",
    databaseURL: "https://shopit-db.firebaseio.com",
    projectId: "shopit-db",
    storageBucket: "shopit-db.appspot.com",
    messagingSenderId: "663609297253",
    appId: "1:663609297253:web:639859a946d8f6aa1df98c",
    measurementId: "G-K9CGZ2M17J"
};
//create user profile in database after login
export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    //check if data already exists
    //get reference to the object
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    //get the snapshot
    const snapshot = await userRef.get();
    //create user if user does not exist
    if (!snapshot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        //create user in firestore db
        try {
            await userRef.set({
                displayName, email, createdAt, ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;

}


firebase.initializeApp(config);
firebase.analytics();

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const SignInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;