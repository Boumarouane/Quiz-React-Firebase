import React, {useState, useEffect, useContext} from 'react';
import Logout from '../Logout/Logout';
import Quiz from '../Quiz/Quiz';
import { FirebaseContext } from '../firebase/encapsule';


const Welcome = props => {

    const firebase = useContext(FirebaseContext);

    // Contenant l'information concernant l'authentification de la session
    const [userSession, setUserSession] = useState(null);

    // Permet de detecter si l'utilisateur est authentifier puis on doit démonter l'evenement lorqu'il est utilisé via la fonction callback
    useEffect(() => {
        let listener = firebase.auth.onAuthStateChanged(user => {
            user ? setUserSession(user) : props.history.push('/')
        })
        return () => {
            listener()
        };
    }, [props.history]);

    // On vérifie si le state est rempli si non on met le loader et si oui on met le quiz
    return userSession === null ? (
        <>
            <div className="loader"></div>
            <p className="loaderText">Loader ...</p>
        </>
    ) : (
        <div className="quiz-bg">
            <div className="container">
                <Logout/>
                <Quiz/>
            </div>
        </div>
    )
};

export default Welcome;