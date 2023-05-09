import React from 'react'
import Photos from './Photos'
import Login from './Login'
import { useSelector } from 'react-redux'
import Loading from './Helper/Loading'

const Content = () => {
    const {token, user} = useSelector(state => state.login)

    if(token.loading || user.loading) return <Loading />
    if(user.data) return <Photos />
    else return <Login />
}

export default Content