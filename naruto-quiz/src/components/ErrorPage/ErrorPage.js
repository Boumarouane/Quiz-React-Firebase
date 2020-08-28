import React from 'react';
import Batman from '../../images/batman.png'

const centerh2 = {
    textAlign: 'center',
    marginTop: '50px'
}

const imageCenter = {
    display: 'block',
    width: '100%',
    height: '100%'
}

const ErrorPage = () => {
    return (
        <div className="quiz-bg">
            <div className="container">
                <h2 style={centerh2}>Oups tu t'es gouré gars</h2>
                <img style = {imageCenter}src={ Batman } alt="logo de batman"></img>
            </div>
        </div>
    );
};

export default ErrorPage;