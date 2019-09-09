import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './components/reducers';
import RouterNav from './components';

ReactDOM.render(
    <Provider store={createStore(reducers, applyMiddleware(reduxThunk))}>
        <RouterNav />
    </Provider>,
    document.getElementById('root')
    );
