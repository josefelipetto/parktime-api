// import 'utils/numeralLocale';
// import 'index.css';

// redux
import React from 'react';
// import { Provider } from 'react-redux';
// import { createStore, applyMiddleware, compose } from 'redux';
// import rootReducers from 'redux/rootReducers';
// import createSagaMiddleware from 'redux-saga'; // SAGA
// import rootSagas from 'redux/rootSagas';

// Styles
import { ThemeProvider } from 'styled-components';
import defaultTheme from './themes'

// Router
import { BrowserRouter } from 'react-router-dom';

// create the saga middleware
// const sagaMiddleware = createSagaMiddleware();

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// let store = createStore(rootReducers, {}, composeEnhancers(applyMiddleware(sagaMiddleware)));

// run the saga
// sagaMiddleware.run(rootSagas);

export default props =>
    <ThemeProvider theme={defaultTheme}>
        <BrowserRouter>{props.children}</BrowserRouter>
    </ThemeProvider>
