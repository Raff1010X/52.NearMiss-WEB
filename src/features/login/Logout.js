import { useEffect, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { selectStatus } from './loginSlice'
import { userLogOutAsync } from './loginAPI'
import { selectOnlineStatus } from '../../api/otherSlice'

import CircularProgress from '@mui/material/CircularProgress'

const Logout = () => {
  const [logedOut, setLogetOut] = useState(false)

  const status = useSelector(selectStatus)
  const onlineStatus = useSelector(selectOnlineStatus)

  const dispatch = useDispatch()

  useEffect(() => {
    setTimeout(() => {
      dispatch(userLogOutAsync())
      setLogetOut(true)
    }, 1000)
  }, [dispatch])

  return (
    <div className="login">
      <h1>Wylogowanie</h1>
      <div className="login__status">
        {(!logedOut || status !== 'idle') && <CircularProgress />}
        {logedOut && onlineStatus === true && status === 'idle' && <p>Wylogowano pomyślnie</p>}
        {logedOut && onlineStatus === false && status === 'idle' && <p>Brak połączenia z serwerem!</p>}
      </div>
    </div>
  )
}

export default Logout
