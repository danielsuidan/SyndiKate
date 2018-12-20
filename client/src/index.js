import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';

firebase.initializeApp({
    apiKey: "AIzaSyCqXGtgzyL2ldSRpiIDPtD1XBT_PwGc-Y0",
    authDomain: "syndikate-5b79b.firebaseapp.com",
    databaseURL: "https://syndikate-5b79b.firebaseio.com",
    projectId: "syndikate-5b79b",
    storageBucket: "syndikate-5b79b.appspot.com",
    messagingSenderId: "150505254293"
}); 

ReactDOM.render(<Router><App /></Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
