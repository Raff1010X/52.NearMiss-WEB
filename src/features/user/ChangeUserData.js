import { useState, useRef, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { selectStatus } from './userSlice'
import { selectUser } from '../login/loginSlice'
import { selectDepartments } from '../../api/otherSlice'
import { userPatch } from './userAPI'
import useNavigateMain from '../../hooks/useNavigateMain'

import { is } from '../../misc/validate'
import CircularProgress from '@mui/material/CircularProgress'
import List from '../../components/list/List'
import Button from '../../components/button/Button'
import Password from '../../components/password/Password'
import { userMeAsync } from '../login/loginAPI'

const ChangeUserData = () => {
    useNavigateMain()
    const user = useSelector(selectUser)
    const departments = useSelector(selectDepartments)
    const [password, setPassword] = useState('')
    const [passwordRepeat, setPasswordRepeat] = useState('')
    const [department, setDepartment] = useState(user.department)

    const refDepartment = useRef(null)
    const refPassword = useRef(null)
    const refRepeat = useRef(null)

    const status = useSelector(selectStatus)

    const dispatch = useDispatch()

    const isValidForm = () => {
        if (!refRepeat.current.checkValidity()) return false
        if (!refPassword.current.checkValidity()) return false
        if (!is.equal(refRepeat, refPassword.current.value, 'Hasła muszą być identyczne!')) return false
        if (!is.notEqual(refDepartment)) return false
        return true
    }

    useEffect(() => {
        return () => {
            dispatch(userMeAsync())
        }
    }, [dispatch])

    const handleSubmit = () => {
        if (isValidForm()) {
            dispatch(userPatch({ password, department }))
        }
    }

    return (
        <div className="login">
            <form className="login__form" onSubmit={(e) => e.preventDefault()}>
                <h1>Zmiana danych</h1>
                <fieldset className="login__fieldset">
                    <input type="text" autoComplete="username" hidden />
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
                    {status === 'loading' ? <CircularProgress /> : 'Zmień dane'}
                </Button>
            </form>
        </div>
    )
}

export default ChangeUserData
