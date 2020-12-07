import { applyMiddleware, createStore, compose } from 'redux';
import { persistStore } from 'redux-persist';
import reduxThunk from 'redux-thunk';
import rootReducer from './reducers';

const store = createStore(
    rootReducer,
    compose(applyMiddleware(reduxThunk)),
);

persistStore(store);

export default store;
