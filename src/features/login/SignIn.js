import { useState, useRef } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { selectStatus } from './loginSlice'
import { selectDepartments } from '../../api/otherSlice'
import { userSignInAsync } from './loginAPI'

import { NavLink } from 'react-router-dom'

import { is } from '../../misc/validate'
import CircularProgress from '@mui/material/CircularProgress'
import List from '../../components/list/List'
import Button from '../../components/button/Button'
import Email from '../../components/email/Email'
import Password from '../../components/password/Password'

const SignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordRepeat, setPasswordRepeat] = useState('')
    const [department, setDepartment] = useState()

    const refEmail = useRef(null)
    const refDepartment = useRef(null)
    const refPassword = useRef(null)
    const refRepeat = useRef(null)

    const status = useSelector(selectStatus)
    const departments = useSelector(selectDepartments)

    const dispatch = useDispatch()

    const isValidForm = () => {
        if (!refEmail.current.checkValidity()) return false
        if (!refRepeat.current.checkValidity()) return false
        if (!refPassword.current.checkValidity()) return false
        if (!is.equal(refRepeat, refPassword.current.value, 'Hasła muszą być identyczne!')) return false
        if (!is.notEqual(refDepartment)) return false
        return true
    }

    const handleSubmit = () => {
        if (isValidForm()) {
            dispatch(userSignInAsync({ password, email, department }))
        }
    }

    return (
        <div className="login">
            <form className="login__form" onSubmit={(e) => e.preventDefault()}>
                <h1>Rejestracja</h1>
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
                    <List
                        reff={refDepartment}
                        label={'Twój dział'}
                        id={'department'}
                        value={department}
                        setFn={setDepartment}
                        options={departments}
                        optionName="department"
                        optionId="department_id"
                    />
                </fieldset>
                <Button id="login__button" onClick={() => handleSubmit()}>
                    {status === 'loading' ? <CircularProgress /> : 'Utwórz konto'}
                </Button>
                <NavLink className="login__link" to="/login">
                    Masz już konto? Zaloguj się!
                </NavLink>
            </form>
        </div>
    )
}
export default SignIn
