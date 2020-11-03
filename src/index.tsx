import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import config from './config';
import firebase from 'firebase/app';
import 'firebase/analytics';

if (config.useFirebase) {
    const app = firebase.initializeApp({
        apiKey: config.firebaseConfig.apiKey,
        authDomain: config.firebaseConfig.authDomain,
        databaseURL: config.firebaseConfig.databaseURL,
        projectId: config.firebaseConfig.projectId,
        storageBucket: config.firebaseConfig.storageBucket,
        messagingSenderId: config.firebaseConfig.messagingSenderId,
        appId: config.firebaseConfig.appId,
        measurementId: config.firebaseConfig.measurementId,
    });
    app.analytics();
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
