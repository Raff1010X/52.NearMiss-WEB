import { useDispatch, useSelector } from 'react-redux'
import {
    postNewReport,
    selectStatus,
    resetUri,
    selectMessage,
    resetReport,
    selectReport,
    patchEditedReport,
} from './reportSlice'
import { setUpdate } from '../register/registerSlice'

import CheckIcon from '@mui/icons-material/Check'
import CircularProgress from '@mui/material/CircularProgress'
import Buttons from './Buttons'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Form8 = ({ handleStep }) => {
    const status = useSelector(selectStatus)
    const message = useSelector(selectMessage)
    const reportNumber = useSelector(selectReport)['Numer zgłoszenia']
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const clickPrev = () => {
        handleStep(7)
    }

    useEffect(() => {
        if (message === 'ok') {
            dispatch(resetUri())
            dispatch(resetReport())
            if (reportNumber) navigate('/register')
            else handleStep(9)
            dispatch(setUpdate())
        }
    }, [dispatch, handleStep, message, navigate, reportNumber])

    const clickNext = () => {
        if (status === 'idle') {
            if (reportNumber) dispatch(patchEditedReport())
            else dispatch(postNewReport())
        }
    }

    return (
        <div className="report__form">
            <div className="report__content">
                <h1>Wyślij zgłoszenie</h1>
                <CheckIcon id="report__check" />
                {status !== 'idle' && (
                    <p>
                        Wysyłam...
                        <br /> <CircularProgress />
                    </p>
                )}
                {status === 'idle' && (
                    <p>
                        Kliknij "Dalej",
                        <br /> aby wysłać raport.
                    </p>
                )}
            </div>
            <Buttons clickPrev={clickPrev} clickNext={clickNext} />
        </div>
    )
}

export default Form8
