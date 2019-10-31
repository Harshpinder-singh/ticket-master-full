import { createStore, combineReducers, applyMiddleware } from 'redux'
import { userAuthReducer } from '../reducers/userAuthReducer'
import thunk from 'redux-thunk'

const configureStore = () => {
    const store = createStore(combineReducers({
        user: userAuthReducer
    }), applyMiddleware(thunk))

    return store
}

export default configureStore