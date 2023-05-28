import { useEffect, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { selectStatus } from './loginSlice'
import { userLogOutAsync } from './loginAPI'

import CircularProgress from '@mui/material/CircularProgress'

const Logout = () => {
  const [logedOut, setLogetOut] = useState(false)

  const status = useSelector(selectStatus)

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
        {logedOut && status === 'idle' && <p>Wylogowano pomyślnie</p>}
      </div>
    </div>
  )
}

export default Logout
