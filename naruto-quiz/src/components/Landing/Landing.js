import React, { useRef, useEffect, useState } from 'react';
import { Link } from "react-router-dom";


const Landing = () => {

    const [btn, setBtn] = useState(false);

    // Faire une reference à la balise main
    const refWolverine = useRef(null);

    // useEffect permetra de monter un composant qui va acceder à la class de la reference pour pouvoir la changer.
    useEffect(() => {
        refWolverine.current.classList.add('startingImg');
        setTimeout(() => {
            refWolverine.current.classList.remove('startingImg');
            setBtn(true)
        }, 3000)
    }, []);
    // Ajout des class contenant les images en onMouseOver
    const setLeftImg = () => {
        refWolverine.current.classList.add('leftImg');
    }
    const setRightImg = () => {
        refWolverine.current.classList.add('rightImg');
    }
    // Condition pour savoir si l'une des deux images existe, et si oui l'autre sera suprimé tous en onMouseOut
    const clearImg = () => {
        if (refWolverine.current.classList.contains('leftImg')){
            refWolverine.current.classList.remove('rightImg')
        }else if (refWolverine.current.classList.contains('rightImg')){
            refWolverine.current.classList.remove('leftImg')
        }
    }

    const displayBtn = btn && (
        <>
            <div onMouseOver={setLeftImg} onMouseOut={clearImg} className="leftBox">
                <Link to="/signup" className="btn-welcome">Inscription</Link>
            </div>
            <div onMouseOver={setRightImg} onMouseOut={clearImg} className="rightBox">
                <Link to="/login" className="btn-welcome">Connexion</Link>
            </div>
        </>
    )

    return (
        <main ref={refWolverine} className="welcomePage">
            { displayBtn }
        </main>
    );
};

export default Landing;