
//handle imports
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics'

const config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
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
