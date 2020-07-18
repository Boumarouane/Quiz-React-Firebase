import React, { useRef, useEffect, useState } from 'react';

const Landing = () => {

    const [btn, setBtn] = useState(false);

    // Faire une reference à la balise main
    const refWolverine = useRef(null);

    // useEffect permetra monter un composant qui va acceder à la class de la reference pour pouvoir la changer.
    useEffect(() => {
        refWolverine.current.classList.add('startingImg');
        setTimeout(() => {
            refWolverine.current.classList.remove('startingImg');
            setBtn(true)
        }, 3000)
    }, []);

    const setLeftImg = () => {
        refWolverine.current.classList.add('leftImg');
    }
    const setRightImg = () => {
        refWolverine.current.classList.add('rightImg');
    }

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
                <button className="btn-welcome">Inscription</button>
            </div>
            <div onMouseOver={setRightImg} onMouseOut={clearImg} className="rightBox">
                <button className="btn-welcome">Connexion</button>
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