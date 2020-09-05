import React, { useState, useContext} from 'react';
import { Link } from 'react-router-dom';
import { FirebaseContext } from '../firebase/encapsule';


const ForgetPassword = props => {

    const firebase = useContext(FirebaseContext);

    const [email, setEmail] = useState('');
    // Gestion du message de succè
    const [success, setSuccess] = useState(null);
    // Gestion du message d'erreur
    const [error, setError] = useState(null);


    const handleSubmit = e => {
        e.preventDefault();
        firebase.passwordReset(email)
        .then(() => {
            // Au cas ou la personne a déja fait une tentative, il faut retirer le message d'erreur
            setError(null);
            setSuccess(`Consulter votre adresse email ${email} pour changer le MDP`);
            setEmail('');

            setTimeout(() => {
                props.history.push('/login')
            }, 5000)
        })
        .catch(error => {
            setError(error)
            setEmail('');
        })
    }

    // Condition qui vérifie si le state email est vide si oui le boutton sera en disabled
    const disabled = email === '';

    return (
        <div className="signUpLoginBox">
            <div className="slContainer">
                <div className="formBoxLeftForget">
                </div>
                <div className="formBoxRight">
                    <div className="formContent">

                        { 
                            success && <span 
                                style={{ 
                                border: "1px solid green",
                                background: "green",
                                color: "#ffffff"
                            }}
                            >
                                {success}
                            </span>
                        }

                        {error && <span>{error.message}</span>}

                        <h2>Mot de passe oublié?</h2>
                        <form onSubmit={handleSubmit}>

                            <div className="inputBox">
                                <input onChange={e => setEmail(e.target.value)} value={email} type="email" autoComplete="off" required />
                                <label htmlFor="email">Email</label>
                            </div>

                            <button disabled={disabled}>Récupérer</button>

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

export default ForgetPassword;