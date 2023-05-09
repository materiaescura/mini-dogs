import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadNewPhotos } from '../store/photos'
import Loading from './Helper/Loading'
import styles from './PhotosLoadMore.module.css'

const PhotosLoadMore = () => {
  const {page, infinite, loading} = useSelector(state => state.photos)
  const dispatch = useDispatch()

  if(loading) return <Loading />
  return <div>
    {infinite &&
     <button className={styles.button} onClick={() => dispatch(loadNewPhotos(page+1))}>
      +</button>
    }
  </div>
}

export default PhotosLoadMore