import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {
    Router,
} from "react-router-dom";

import App from './components/App';
import reducers from './reducers';
import history from './helpers/history'
import './index.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )
    );

ReactDOM.render(
    <Provider store= {store}>
        <Router history={history}>
            <App/>
        </Router>
    </Provider>,
    document.querySelector('#root')
)