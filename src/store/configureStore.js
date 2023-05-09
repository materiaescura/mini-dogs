import { combineReducers, configureStore } from '@reduxjs/toolkit'
import localStorage from './middleware/localStorage'
import login from './login'
import photos from './photos'

const reducer = combineReducers({login, photos})
const store = configureStore({reducer, middleware: middleware => [...middleware(), localStorage]})

export default store