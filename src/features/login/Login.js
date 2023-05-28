import { useState, useRef, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { selectStatus, selectUserIsLogged } from './loginSlice'
import { userLogInAsync } from './loginAPI'

import { useNavigate, NavLink } from 'react-router-dom'
import useAppScroll from '../../hooks/useAppScroll'

import CircularProgress from '@mui/material/CircularProgress'
import Button from '../../components/button/Button'
import Email from '../../components/email/Email'
import Password from '../../components/password/Password'

import './login.css'

const Login = () => {
  useAppScroll()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const refPassword = useRef(null)
  const refEmail = useRef(null)

  const status = useSelector(selectStatus)
  const userIsLogged = useSelector(selectUserIsLogged)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (userIsLogged) navigate('/report')
  }, [dispatch, userIsLogged, navigate])

  const handleSubmit = () => {
    if (refEmail.current.checkValidity() && refPassword.current.checkValidity()) {
      dispatch(userLogInAsync({ password, email }))
    }
  }

  return (
    <div className="login">
      <form className="login__form" onSubmit={(e) => e.preventDefault()}>
        <h1>Logowanie</h1>
        <fieldset className="login__fieldset">
          <Email reff={refEmail} value={email} setFn={setEmail} />
          <Password reff={refPassword} value={password} setFn={setPassword} />
          <NavLink className="login__link" to="/forgotpassword">
            Zapomniałeś hasło? Zmień je na nowe!
          </NavLink>
        </fieldset>
        <Button id="login__button" type="submit" onClick={handleSubmit}>
          {status === 'loading' ? <CircularProgress /> : 'Zaloguj się'}
        </Button>
        <NavLink className="login__link" to="/signin">
          Nie masz konta? Stwórz nowe konto!
        </NavLink>
      </form>
    </div>
  )
}

export default Login
