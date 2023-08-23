import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setOnlineStatus } from '../api/otherSlice'

const useServerStatus = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        fetch('/status')
            .then((res) => {
                if (res.ok) dispatch(setOnlineStatus(true))
                else dispatch(setOnlineStatus(false))
            })
            .catch(() => {
                dispatch(setOnlineStatus(false))
            })
    }, [dispatch])
}

export default useServerStatus
