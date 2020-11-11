import React, {useState, useEffect, useContext} from 'react';
import Logout from '../Logout/Logout';
import Quiz from '../Quiz/Quiz';
import { FirebaseContext } from '../firebase/encapsule';
import Loader from '../Loader/Loader'


const Welcome = props => {

    const firebase = useContext(FirebaseContext);

    // Contenant l'information concernant l'authentification de la session
    const [userSession, setUserSession] = useState(null);
    const [userData, setUserData] = useState({});

    // Permet de detecter si l'utilisateur est authentifier puis on doit démonter l'evenement lorqu'il est utilisé via la fonction callback
    useEffect(() => {
        let listener = firebase.auth.onAuthStateChanged(user => {
            user ? setUserSession(user) : props.history.push('/')
        })
        // On vérifie si le userSession est null car si c'est le cas on ne peut récupéré l'user id
        if (!!userSession){
            firebase.user(userSession.uid)
            .get()
            // Ici on récupère les data concernant l'utilisateur dont le pseudo que l'on va afficher
            .then(doc => {
                if (doc && doc.exists){
                    const myData = doc.data()
                    setUserData(myData)
                }
            })
            .catch( error => {
                console.log(error);
            })
        }

        return () => {
            listener()
        };
    }, [userSession, props.history]);

    // On vérifie si le state est rempli si non on met le loader et si oui on met le quiz
    return userSession === null ? (
        <Loader
            loadingMsg={"Authentification..."}
            styling={{textAlign: 'center', color: '#FFFFFF'}}
        />
    ) : (
        <div className="quiz-bg">
            <div className="container">
                <Logout/>
                <Quiz userData={userData}/>
            </div>
        </div>
    )
};

export default Welcome;