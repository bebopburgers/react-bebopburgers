import {applyMiddleware, createStore} from 'redux';
import rootReducer from './reducers/index';
import createSagaMiddleware from 'redux-saga';
import watchAll from './sagas/index';
import {composeWithDevTools} from "redux-devtools-extension";

// eslint-disable-next-line import/no-anonymous-default-export
export default function () {
    // const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    //     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    //     : compose;

    const sagaMiddleware = createSagaMiddleware();
    const middlewareEnhancer = applyMiddleware(sagaMiddleware);
    const enhancers = composeWithDevTools(middlewareEnhancer)

    const store = createStore(rootReducer, enhancers);
    sagaMiddleware.run(watchAll);

    return store;
}