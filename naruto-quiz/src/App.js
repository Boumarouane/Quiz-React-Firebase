import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from './components/Header/Header';
import Landing from './components/Landing/Landing';
import Footer from './components/Footer/Footer';
import Welcome from './components/Welcome/Welcome';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import ErrorPage from './components/ErrorPage/ErrorPage';
import ForgetPassword from './components/ForgetPassword/ForgetPassword'
import './App.css';

function App() {
  return (
    <Router>

      <Header/>
        <Switch>
          <Route  exact path="/" component={Landing}/>
          <Route  path="/welcome" component={Welcome}/>
          <Route  path="/login" component={Login}/>
          <Route  path="/signup" component={Signup}/>
          <Route  path="/forgetpassword" component={ForgetPassword}/>
          <Route  component={ErrorPage}/>
        </Switch>
      <Footer/>

    </Router>
  );
}

export default App;
