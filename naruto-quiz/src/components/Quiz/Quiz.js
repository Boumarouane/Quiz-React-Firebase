import React, { Component } from 'react';
import Levels from '../Levels/Levels';
import ProgressBar from '../ProgressBar/ProgressBar';
import { QuizMarvel } from '../QuizMarvel/QuizMarvel'

class Quiz extends Component {

    state = {
        levelNames: ["debutant", "confirme", "expert"],
        quizLevel: 0,
        maxQuestions: 10,
        // C'est ici que l'on va pusher les 10 questions
        storedQuestions: [],
        question: null,
        options: [],
        idQuestion:0
    }
    loadQuestions = quizz => {
        // On va cibler les données relatives au quiz
        const fetchedArrayQuiz = QuizMarvel[0].quizz[quizz];
        if (fetchedArrayQuiz.length >= this.state.maxQuestions){

            // Ici on enlève les réponses en pushant les data dans un nouveau tableau qui seront misent dans le state
            const newArray = fetchedArrayQuiz.map(({answer, ...keepRest}) => keepRest);
            this.setState({storedQuestions: newArray})
        }
        else {
            console.log('nope');
        }
    }

    componentDidMount() {
        this.loadQuestions(this.state.levelNames[this.state.quizLevel])
    }

    componentDidUpdate(prevProps, prevState) {
        // On vérifie si le state est vide
        if (this.state.storedQuestions !== prevState.storedQuestions){
            this.setState({
                question:this.state.storedQuestions[this.state.idQuestion].question,
                options:this.state.storedQuestions[this.state.idQuestion].options
            })
        }
    }
    

    render() {

        const displayOptions = this.state.options.map((option) => {
            return (
            <p className="answerOptions">{option}</p>
            )
        })

        // const { pseudo } = this.props.userData;
        
        return (
            <div>
                <Levels/>
                <ProgressBar/>
                <h2>{this.state.question}</h2>

                {displayOptions}

                <button className="btnSubmit">Suivant</button>
            </div>
        );
    }
};

export default Quiz;