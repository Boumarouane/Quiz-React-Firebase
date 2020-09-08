import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyD5A-ibwnNpLMtol7Ad2-3jDhilF9yOr40",
    authDomain: "naruto-cb957.firebaseapp.com",
    databaseURL: "https://naruto-cb957.firebaseio.com",
    projectId: "naruto-cb957",
    storageBucket: "naruto-cb957.appspot.com",
    messagingSenderId: "461067245389",
    appId: "1:461067245389:web:8f1ac9346277d0537e4904"
  };

class Firebase {
    constructor() {
        app.initializeApp(config)
        this.auth = app.auth()
        this.db = app.firestore()
    }

    // Inscription
    signupUser = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password)

    // Connexion
    loginUser = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password)

    // Déconnexion
    signOutUser = () => this.auth.signOut()

    // Récupèration du MDP
    passwordReset = email => this.auth.sendPasswordResetEmail(email);

    // Stockage dans la BDD via la reference 'users/+ l'id obtenu dans l'envoi des données lors de l'inscription'
    user = uid => this.db.doc(`'users/${uid}`);
}

export default Firebase;