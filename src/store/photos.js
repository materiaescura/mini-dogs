import { getPhotos } from '../api'
import createAsyncSlice from './helper/createAsyncSlice'

const photos = createAsyncSlice({
    name:'photos',
    initialState: {
        list: [],
        page: 0,
        infinite: true
    },
    configReducers: {
        addPhotos: (state, action) => {
            state.list.push(...action.payload)
            state.page++
            if(action.payload.length === 0) state.infinite = false
        },
        removePhotos: (state) => {
            state.list = []
            state.page = 0
            state.infinite = true
            state.data = null
        }
    },
    fetchConfig: getPhotos
})

export const fetchPhotos = photos.asyncAction
export const {addPhotos, removePhotos} = photos.actions

export const loadNewPhotos = (page = 1) => async dispatch => {
    const {payload} = await dispatch(fetchPhotos(page))
    dispatch(addPhotos(payload))
}
export default photos.reducer