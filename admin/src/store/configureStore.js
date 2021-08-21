import { createStore, applyMiddleware,combineReducers,compose } from "redux";
import { rootReducer } from "./reducers/rootReducer";
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas/rootSaga'
import { tagReducer } from './reducers/tagReducer'
import { catReducer } from './reducers/catReducer'
import { newArticleReducer } from "./reducers/newArticleReducer";
import { articleListReducer } from "./reducers/articleListReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const reducers = combineReducers({
    rootReducer,
    tagReducer,
    catReducer,
    newArticleReducer,
    articleListReducer,
})

const sagaMiddleware = createSagaMiddleware()

const middleware = [sagaMiddleware]

const store = createStore(reducers,{},composeEnhancers(applyMiddleware(...middleware)))

sagaMiddleware.run(rootSaga)

export default store

