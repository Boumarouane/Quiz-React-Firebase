import React,{ useState, useEffect, useContext } from 'react';
import {Link} from 'react-router-dom';
import { FirebaseContext } from '../firebase/encapsule';

const Login = (props) => {

    const firebase = useContext(FirebaseContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [btn, setBtn] = useState(false);
    const [error, setError] = useState('');

    // On vérifie si le password a plus de 5 caractères le state btn sera true et sinon il sera false et donc le bonton sera en disabled
    useEffect(() => {
        if(password.length > 5 && email !== ''){
            setBtn(true)
        }else if (btn){
            setBtn(false)
        }
        // Dépendance permettant de rendre une fois quand le state change
    }, [email, password, btn]);

    const handleSubmit = e => {
        e.preventDefault();
        firebase.loginUser(email, password)
        .then(user => {
            props.history.push('/welcome')
            setEmail('');
            setPassword('');
        })
        .catch(error => {
            setError(error);
            setEmail('');
            setPassword('');
        })
    }

    return (
        <div className="signUpLoginBox">
            <div className="slContainer">
                <div className="formBoxLeftLogin"></div>
                <div className="formBoxRight">
                    <div className="formContent">

                        {error !== '' && <span>{error.message}</span>}

                        <h2>Connexion</h2>
                        <form onSubmit={handleSubmit}>

                            <div className="inputBox">
                                <input onChange={e => setEmail(e.target.value)} value={email} type="email" autoComplete="off" required />
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="inputBox">
                                <input onChange={e => setPassword(e.target.value)} value={password} type="password" autoComplete="off" required />
                                <label htmlFor="password">Mot de passe</label>
                            </div>

                            {btn ? <button>Connexion</button> : <button disabled>Connexion</button> }

                        </form>
                        <div className="linkContainer">
                            <Link className="simpleLink" to="/signup">Nouveau sur Marvel Quiz ? Inscrivez-vous maintenant.</Link>
                            <br/>
                            <Link className="simpleLink" to="/forgetPassword">Mot de passe oublié ? Récupérez-le ici</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;