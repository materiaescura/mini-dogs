import React from 'react'
import { useDispatch } from 'react-redux'
import {login } from '../store/login'
import styles from './Login.module.css'

const Login = () => {

  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  const dispatch = useDispatch()

  const handleSubmit = async(event) => {
    event.preventDefault()
    dispatch(login({username, password}))
  }

  return (
    <form onSubmit={handleSubmit}>

      <label className={styles.label}>Usuário</label>
      <input className={styles.input} type='text' value={username} onChange={({target}) => setUsername(target.value)} />
      <label className={styles.label}>Senha</label>
      <input className={styles.input} type='password' value={password} onChange={({target}) => setPassword(target.value)} />

      <button className={styles.button}>Enviar</button>
    </form>
  )
}

export default Login