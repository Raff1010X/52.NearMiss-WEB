import { useState, useRef, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { selectStatus } from './loginSlice'
import { userForgotPasswordAsync } from './loginAPI'

import { NavLink } from 'react-router-dom'

import CircularProgress from '@mui/material/CircularProgress'
import Button from '../../components/button/Button'
import Password from '../../components/password/Password'
import Email from '../../components/email/Email'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRepeat, setPasswordRepeat] = useState('')

  const refEmail = useRef(null)
  const refPassword = useRef(null)
  const refRepeat = useRef(null)

  const status = useSelector(selectStatus)

  const dispatch = useDispatch()

  useEffect(() => {
    if (refPassword.current.value !== passwordRepeat) {
      refRepeat.current.setCustomValidity('Hasła muszą być identyczne!')
      refRepeat.current.reportValidity()
    }
  }, [passwordRepeat])

  const isValidForm = () => {
    refRepeat.current.setCustomValidity('')
    if (
      refEmail.current.checkValidity() &&
      refPassword.current.checkValidity() &&
      refRepeat.current.checkValidity() &&
      password === passwordRepeat
    )
      return true
    setPasswordRepeat('')
    return false
  }

  const handleSubmit = () => {
    if (isValidForm()) {
      dispatch(userForgotPasswordAsync({ password, email }))
    }
  }

  return (
    <div className="login">
      <form className="login__form" onSubmit={(e) => e.preventDefault()}>
        <h1>Nowe hasło</h1>
        <fieldset className="login__fieldset">
          <Email reff={refEmail} value={email} setFn={setEmail} />
          <Password reff={refPassword} value={password} setFn={setPassword} />
          <Password
            reff={refRepeat}
            value={passwordRepeat}
            id="password-repeat"
            label="Powtórz hasło"
            setFn={setPasswordRepeat}
          />
        </fieldset>
        <Button id="login__button" onClick={() => handleSubmit()}>
          {status === 'loading' ? <CircularProgress /> : 'Aktywuj nowe hasło'}
        </Button>
        <NavLink className="login__link" to="/login">
          Masz już konto? Zaloguj się!
        </NavLink>
      </form>
    </div>
  )
}
export default ForgotPassword
