import User from './reducers/User'
import {createLogger} from 'redux-logger'
import {combineReducers} from 'redux'
import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import Images from './reducers/Images'
import thunk from 'redux-thunk'
import {reducer as formReducer} from 'redux-form'
const loggerMiddleware = createLogger()

const app = combineReducers({
  Images: Images,
  User: User
})
export const store = createStore(
  app,
  composeWithDevTools(applyMiddleware(thunk))
)
export const initStore = initialState => {
  return createStore(app, composeWithDevTools(applyMiddleware(thunk)))
}
