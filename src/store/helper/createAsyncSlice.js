import { createSlice } from '@reduxjs/toolkit'

const createAsyncSlice = config  => {
    const slice = createSlice(
        {
            name: config.name,
            initialState: {
                loading: false,
                data: null,
                error: null,
                ...config.initialState
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
                },
                ...config.configReducers
            }})

    const {fetchStarted, fetchSuccess, fetchError} = slice.actions
    const asyncAction = data => async dispatch => {
        try {
            dispatch(fetchStarted())
            const {url, options} = config.fetchConfig(data)
            const response = await fetch(url, options)
            const json = await response.json()
            return dispatch(fetchSuccess(json))
        } catch (error) {
            return dispatch(fetchError(error.message))
        }
    }

    return {...slice, asyncAction}
}

export default createAsyncSlice