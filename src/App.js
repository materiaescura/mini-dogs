import React from 'react'
import { useDispatch} from 'react-redux'
import Header from './Components/Header'
import { login } from './store/login'

const App = () => {

  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  const dispatch = useDispatch()

  const handleSubmit = async() => {
    dispatch(login({username, password}))
  }

  return (
    <div>
      <Header />
      <input value={username} onChange={({target}) => setUsername(target.value)} />
      <input value={password} onChange={({target}) => setPassword(target.value)} />
      <button onClick={handleSubmit}>Enviar</button>
    </div>
  )
}

export default App