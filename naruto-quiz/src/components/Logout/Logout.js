import React, {useState, useEffect, useContext} from 'react';
import { FirebaseContext } from '../firebase/encapsule';
import ReactToolTip from 'react-tooltip';


const Logout = () => {

    const [checked, setCheked] = useState(false);

    const firebase = useContext(FirebaseContext);

    // Si le checked est true alors on la personne est déco (firebase sais comment gérer ca)
    useEffect(() => {
        if(checked){
            console.log('Je suis putain de déconnecter de la vie');
            firebase.signOutUser()
        }
    }, [checked, firebase])

    // On change le state checked en true lorsque la personne clique sur l'input
    const handleChange = e => {
        setCheked(e.target.checked)
    }

    return (
        <div className="logoutContainer">
            <label className="switch">
                <input  onChange={handleChange} type="checkbox" checked={checked}/>
                <span className="slider round" data-tip="Déconnexion"></span>
            </label>
            <ReactToolTip
                place="left"
                effect="solid"
            />
        </div>
    );
};

export default Logout;