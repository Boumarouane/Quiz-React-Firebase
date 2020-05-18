import app from 'firebase/app';

const config = {
    apiKey: "AIzaSyBMB_1HWJP1hrhqy172cr1cZFXIPaRrYKk",
    authDomain: "marvel-quiz-53f59.firebaseapp.com",
    databaseURL: "https://marvel-quiz-53f59.firebaseio.com",
    projectId: "marvel-quiz-53f59",
    storageBucket: "marvel-quiz-53f59.appspot.com",
    messagingSenderId: "1048551920897",
    appId: "1:1048551920897:web:177fd1b37ab49a09f2b700"
};

class Firebase {
    constructor() {
        app.initializeApp(config);
    }
}

export default Firebase;