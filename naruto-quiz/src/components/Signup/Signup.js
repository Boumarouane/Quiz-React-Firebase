import React, {useState, useContext} from 'react';
import { FirebaseContext } from '../firebase/encapsule';
import {Link} from 'react-router-dom';

const Signup = () => {

    const firebase = useContext(FirebaseContext);

    // Objet contenant toutes les données du formulaire qui seront contenu dans le state loginData
    const data = {
        pseudo: '',
        email: '',
        password: '',
        confirmPassword: ''
    }
    const [loginData, setLoginData] = useState(data);
    // Contient le message d'ereur
    const [error, setError] = useState('')

    // Changement des valeurs des states
    const handleChange = e => {
        // Pour changer une valeur à la fois on va mettre tous ce que contient loginData dans le setLoginData, puis je cible un élément de l'objet data grace à son id et je lui rajoute la valeur qui lui correspond.
        setLoginData({...loginData, [e.target.id]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault();
        // Déstructuring pour obtenir les valeurs du state
        const { email, password} = loginData;
        // On accède au context firebase et celle-ci va retourner une réponse donc...
        firebase.signupUser(email, password)
        // ...on gère la réponse
        // Si les données ont été envoyer alors on revient à l'état initial du state
        .then(user => {
            setLoginData({...data})
        })
        // Si c'est un echec on affiche le message d'erreur et on revient à l'état initial du state
        .catch(error => {
            setError(error)
            setLoginData({...data})
        })
    }

    // Destructuring des données contenu dans le state pour éviter d'afficher "loginData.pseudo" dans l'attribut value des inputs   
    const {pseudo, email, password, confirmPassword} = loginData;

    // On va vérifier si la personne rempli chaque champ ,si non, alors le bouton sera en disable
    const btn = pseudo === '' || email === '' || password === '' || password !== confirmPassword
     ? <button disabled>Inscription</button> : <button>Inscription</button>

    // Gestion des erreurs
    const errorMsg = error !== ''&& <span>{error.message}</span>

    return (
        <div className="signUpLoginBox">
            <div className="slContainer">
                <div className="formBoxLeftSignup"></div>
                <div className="formBoxRight">
                    <div className="formContent">

                        {errorMsg}

                    <h2>Inscription</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="inputBox">
                                <input onChange={handleChange} value={pseudo} type="text" id="pseudo" autoComplete="off" required />
                                <label htmlFor="pseudo">Pseudo</label>
                            </div>

                            <div className="inputBox">
                                <input onChange={handleChange} value={email} type="email" id="email" autoComplete="off" required />
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="inputBox">
                                <input onChange={handleChange} value={password} type="password" id="password" autoComplete="off" required />
                                <label htmlFor="password">Mot de passe</label>
                            </div>

                            <div className="inputBox">
                                <input onChange={handleChange} value={confirmPassword} type="password" id="confirmPassword" autoComplete="off" required />
                                <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
                            </div>

                            {btn}

                        </form>
                        <div className="linkContainer">
                            <Link className="simpleLink" to="/login">Déjà inscrit? Connectez-vous.</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;