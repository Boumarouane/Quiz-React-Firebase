import React from 'react';

const ProgressBar = ({idQuestion, maxQuestions}) => {

    const getWidth = (totalQuestions, questionId) => {
        return (100 / totalQuestions) * questionId;
    }

    const actualQuestion = idQuestion + 1;
    const progressPrecent = getWidth(maxQuestions, actualQuestion);

    return (
        <>
            <div className="percentage">
                <div className="progressPercent">{`Question: ${idQuestion + 1} / ${maxQuestions}`}</div>
                <div className="progressPercent">{`Progression: ${progressPrecent}%`}</div>
            </div>
            <div className="progressBar">
                <div className='progressBarChange' style={{width: `${progressPrecent}%`}}></div>
            </div>
        </>
    );
};

export default React.memo(ProgressBar);