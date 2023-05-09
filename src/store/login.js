import { combineReducers } from '@reduxjs/toolkit'
import createAsyncSlice from './helper/createAsyncSlice'
import {getToken, getUser} from '../api'
import getLocalStorage from './helper/getLocalStorage'
import {removePhotos} from './photos'

// token
const token = createAsyncSlice({
    name:'token',
    fetchConfig: getToken,
    initialState: {
        data: {
            token: getLocalStorage('token', null)
        }
    },
    configReducers: {
        removeToken: (state) => {
            state.data = null
        },
        fetchSuccess: {
            reducer: (state, action) => {
                state.loading = false
                state.data = action.payload
                state.error = null
            },
            prepare: payload => {
                return {
                   payload,
                   meta:{
                    localStorage: {
                        key:'token',
                        value: payload.token
                    }
                   }
                }
            }
        }
    }
})

const tokenReducer = token.reducer

const fetchToken = token.asyncAction


// user
const user  = createAsyncSlice({
    name: 'user',
    configReducers: {
        removeUser: state => {
            state.data = null
        }
    },
    fetchConfig: getUser
})


const userReducer = user.reducer
const fetchUser = user.asyncAction


 //
export const login = data => async dispatch => {
    const {payload} = await dispatch(fetchToken(data))
    if(payload.token !== undefined) await dispatch(fetchUser(payload.token))
}

export const autoLogin = () => async (dispatch, getState) => {
    const state = getState()
    const {token} = state.login.token.data
    if(token) await dispatch(fetchUser(token))
}

const {removeToken} = token.actions
const {removeUser} = user.actions

export const logout = () => dispatch => {
    dispatch(removeUser())
    dispatch(removeToken())
    dispatch(removePhotos())
}

export default combineReducers({token:tokenReducer, user:userReducer})