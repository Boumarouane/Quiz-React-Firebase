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
        idQuestion:0,
        btnDisabled: true,
        userAnswer: null,
        score: 0
    }
    storedDataRef = React.createRef();

    loadQuestions = quizz => {
        // On va cibler les données relatives au quiz
        const fetchedArrayQuiz = QuizMarvel[0].quizz[quizz];
        if (fetchedArrayQuiz.length >= this.state.maxQuestions){

            this.storedDataRef.current = fetchedArrayQuiz;
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

    nextQuestion = () => {
        if (this.state.idQuestion === this.state.maxQuestions -1){
            // End

        }else{
            this.setState(prevState => ({
                idQuestion: prevState.idQuestion +1
            }))
        }
        const goodAnswer = this.storedDataRef.current[this.state.idQuestion].answer;
        if (this.state.userAnswer === goodAnswer){
            this.setState(prevState => ({
                score: prevState.score +1
            }))
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // On vérifie si le state est vide
        if (this.state.storedQuestions !== prevState.storedQuestions){
            this.setState({
                question:this.state.storedQuestions[this.state.idQuestion].question,
                options:this.state.storedQuestions[this.state.idQuestion].options
            })
        }
        if (this.state.idQuestion !== prevState.idQuestion){
            this.setState({
                question:this.state.storedQuestions[this.state.idQuestion].question,
                options:this.state.storedQuestions[this.state.idQuestion].options,
                userAnswer: null,
                btnDisabled: true
            })
        }
    }
    
    submitAnswer = selectedAnswer => {
        this.setState({
            userAnswer:selectedAnswer,
            btnDisabled:false
        })
    }

    render() {

        const displayOptions = this.state.options.map((option,index) => {
            return (
            <p  key={index} 
                className={`answerOptions ${this.state.userAnswer === option ? "selected" : null}`}
                onClick={() => this.submitAnswer(option)}
                >
                    {option}
                </p>
            )
        })

        // const { pseudo } = this.props.userData;
        
        return (
            <div>
                <Levels/>
                <ProgressBar/>
                <h2>{this.state.question}</h2>

                {displayOptions}

                <button 
                    disabled={this.state.btnDisabled} 
                    className="btnSubmit"
                    onClick={this.nextQuestion}
                    >
                        Suivant
                    </button>
            </div>
        );
    }
};

export default Quiz;