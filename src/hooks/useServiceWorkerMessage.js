import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setOnlineStatus } from '../api/otherSlice'

const useServiceWorkerMessage = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        navigator.serviceWorker.addEventListener('message', (event) => {
            if (event.data.hasOwnProperty('serverOnline')) dispatch(setOnlineStatus(event.data.serverOnline))
        })

        return () => {
            navigator.serviceWorker.removeEventListener('message', (event) => {
                if (event.data.hasOwnProperty('serverOnline')) dispatch(setOnlineStatus(event.data.serverOnline))
            })
        }
    }, [dispatch])
}

export default useServiceWorkerMessage
