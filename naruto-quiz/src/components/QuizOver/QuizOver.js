import React, { useEffect, useState } from 'react';
import {GiTrophyCup} from 'react-icons/gi'
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';
import axios from 'axios'
 

const QuizOver = React.forwardRef((props, ref) => {

    const { levelNames,
            score, 
            maxQuestions, 
            quizLevel, 
            percent,
            loadLevelQuestions
        } = props;

    const API_PUBLIC_KEYS = process.env.REACT_APP_MARVEL_API_KEY;
    const hash = 'e8e89ad47c2f554f9cf3cfcb3982adca';

    const [asked, setAsked] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [charachterInfos, setCharachterInfos] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {  
        setAsked(ref.current)

        if (localStorage.getItem('marvelStorageDate')){
            const date = localStorage.getItem('marvelStorageDate');
            checkDataAge(date)
        }
    }, [ref]); 

    const checkDataAge = date => {
        const today =Date.now();
        const timeDifference = today - date;

        const daysDifference = timeDifference / (1000 * 3600 * 24);

        if (daysDifference >= 15){
            localStorage.clear();
            localStorage.setItem('marvelStorageDate', Date.now());
        }
    }
    
    const showModal = id => {
        setOpenModal(true);


        if (localStorage.getItem(id)){
            setCharachterInfos(JSON.parse(localStorage.getItem(id)));
            setLoading(false);
        }else {
            axios
            .get(`https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${API_PUBLIC_KEYS}&hash=${hash}`)
            .then( response  => {
                setCharachterInfos(response.data);
                setLoading(false);
    
                localStorage.setItem(id, JSON.stringify(response.data));

                if (!localStorage.getItem('marvelStorageDate')){
                    localStorage.setItem('marvelStorageDate', Date.now());
                }
            })
            .catch(err =>  console.log(err))
        }
    }

    const hideModal = () => {
        setOpenModal(false);
        setLoading(true);
    }

    const capitalizeFirestletter = string => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Si on a la moyenne
    const averageGrade = maxQuestions / 2

    if (score < averageGrade){
        // Dans le cas où on veux faire recommencer le quiz
        setTimeout(() => loadLevelQuestions(0), 3000);
        // Dans le cas ou on veut faire recommencer le niveau dans lequel la personne ce trouve
        // setTimeout(() => loadLevelQuestions(quizLevel), 3000);
    }

    const decision = score >= averageGrade ? (
        <>
            <div className="stepsBtnContainer">
                {
                    quizLevel < levelNames.length ? (
                        <>
                            <p className="successMsg">Bravo, passez au niveau suivant !</p>
                            <button 
                                className="btnResult success"
                                onClick={() => loadLevelQuestions(quizLevel)}
                            >
                                Niveau suivant
                            </button>
                        </>
                    ) : (
                        <>
                            <p className="successMsg"><GiTrophyCup size='50px'/>  Bravo vous êtes un expert</p>
                            <button 
                                className="btnResult gameOver"
                                onClick={() => loadLevelQuestions(0)}
                            >
                                Accueil
                            </button>
                        </>
                    )
                }
            </div>
            <div className='percentage'>
                <div className="progressPercent">Réussite {percent}%</div>
                <div className="progressPercent">Note: {score} / {maxQuestions}</div>
            </div>
        </>
    // En cas d'echec
    ) : (
        <>
            <div className="stepsBtnContainer">
                <p className="failureMsg">Vous avez échoué !</p>
            </div>

            <div className='percentage'>
                <div className="progressPercent">Réussite {percent}%</div>
                <div className="progressPercent">Note: {score} / {maxQuestions}</div>
            </div>
        </>
    )

    const questionAnswer = score >= averageGrade ? (
            asked.map(question => {
            return (
                <tr key={question.id}>
                    <td>{question.question}</td>
                    <td>{question.answer}</td>
                    <td>
                        <button 
                            className="btnInfo"
                            onClick={ () => showModal(question.heroId)}
                            >
                                Infos
                        </button>
                    </td>
                </tr>
            )
        })
    ) : (
        <tr>
            <td colSpan="3" > 
            <Loader
                loadingMsg={"Pas de réponses !"}
                styling={{textAlign: 'center', color: 'red'}}
            />
            </td>
        </tr>
    )

    const resultInModal = !loading ? (

        <>
            <div className="modalHeader">
                <h2>{charachterInfos.data.results[0].name}</h2>
            </div>
            <div className="modalBody">
                <div className="comicImage">
                    <img 
                        src={charachterInfos.data.results[0].thumbnail.path+'.'+charachterInfos.data.results[0].thumbnail.extension} 
                        alt={charachterInfos.data.results[0].name}
                    /> 
                    <p>{charachterInfos.attributionText}</p>
                </div>
                <div className="comicDetails">
                    <h3>Description</h3>
                    {
                        charachterInfos.data.results[0].description ? <p>{charachterInfos.data.results[0].description}</p>
                        : <p>Description indisponible ...</p>
                    }
                    <h3>Plus d'infos</h3>
                    {
                        charachterInfos.data.results[0].urls && 
                        charachterInfos.data.results[0].urls.map((url,index) => {
                            return <a 
                                    key={index} 
                                    href={url.url} 
                                    target='_blank' 
                                    rel="noopener noreferrer"
                                    >
                                        {capitalizeFirestletter(url.type)}
                                    </a>
                        })
                    }
                </div>
            </div>
            <div className="modalFooter">
                <button className="modalBtn" onClick={hideModal}>Fermer</button>
            </div>
        </>
    )
    : (
        <>
            <div className="modalHeader">
                <h2>Réponse de Marvel</h2>
            </div>
            <div className="modalBody">
                <Loader/>
            </div>
        </> 
    )

    return (
        <>
            { decision }
            <hr/>
            <p>Les réponses aux questions posées : </p>

            <div className="answerContainer">
                <table className="answers">
                    <thead>
                        <tr>
                            <th>Question</th>
                            <th>Réponses</th>
                            <th>Info</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questionAnswer}
                    </tbody>
                </table>
            </div>

            <Modal showModal={openModal} hideModal={hideModal}>
                { resultInModal }
            </Modal>
        </>
    )
})

export default React.memo(QuizOver)
