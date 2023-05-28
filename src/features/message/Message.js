import { createPortal } from 'react-dom'
import { useSelector, useDispatch } from 'react-redux'
import { sendMessage, selectMessage, selectFunction } from './messageSlice'
import { executedAsync, deleteAsync } from '../../features/register/registerAPI'
import { deleteCommentsAsync } from '../comments/commentsAPI'

import Button from '../../components/button/Button'

import './message.css'

export default function Message() {
    const message = useSelector(selectMessage)
    const funxion = useSelector(selectFunction)

    const dispatch = useDispatch()

    const handleClickCancel = () => {
        dispatch(sendMessage(''))
    }

    const handleClickOK = () => {
        const id = Number(message.slice(message.lastIndexOf(' ')))
        if (funxion === 'setReportExecuted') {
            dispatch(executedAsync(id))
        }
        if (funxion === 'deleteReport') {
            dispatch(deleteAsync(id))
        }
        if (funxion === 'deleteComment') {
            dispatch(deleteCommentsAsync(id))
        }
        dispatch(sendMessage(''))
    }

    const container = (
        <div className="message" onClick={handleClickCancel}>
            <div className="message__container">
                <div className="message__text">{message}</div>
                <Button id="message__button" onClick={handleClickOK}>
                    OK
                </Button>
                {funxion && (
                    <Button id="message__button" onClick={handleClickCancel}>
                        Anuluj
                    </Button>
                )}
            </div>
        </div>
    )
    if (message === '') return null

    return createPortal(container, document.getElementById('message'))
}
