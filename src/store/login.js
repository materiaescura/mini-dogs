import { createSlice } from '@reduxjs/toolkit'
import { getToken } from '../api'

const slice = createSlice(
    {
        name:'login',
        initialState: {
            loading: false,
            data: null,
            error: null
        },
        reducers: {
            fetchStarted: state => {state.loading = true},
            fetchSuccess: (state, action) => {
                state.loading = false
                state.data = action.payload
                state.error = null
            },
            fetchError: (state, action) => {
                state.loading = false
                state.data = null
                state.error = action.payload
            }
        }
    }
)

const {fetchStarted, fetchSuccess, fetchError} = slice.actions

export const login = data => async dispatch => {
    try {
        dispatch(fetchStarted())
        const {url, options} = getToken(data)
        const response = await fetch(url, options)
        const json = await response.json()
        return dispatch(fetchSuccess(json))
    } catch (error) {
        return dispatch(fetchError(error.message))
    }
}

export default slice.reducer