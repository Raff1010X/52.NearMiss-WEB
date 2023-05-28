import { useEffect } from 'react'

import { useParams } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { selectMessage, resetLoginMessage, selectStatus } from './loginSlice'
import { activateAccountAsync } from './loginAPI'

import CircularProgress from '@mui/material/CircularProgress'

const ActivateAccount = () => {
  let { id } = useParams()
  const status = useSelector(selectStatus)
  const message = useSelector(selectMessage)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(resetLoginMessage())
    return () => dispatch(resetLoginMessage())
  }, [dispatch])

  useEffect(() => {
    dispatch(activateAccountAsync(id))
  }, [dispatch, id])

  return (
    <div className="login">
      <h1>Aktywacja konta</h1>
      <div className="login__status">
        {status === 'loading' && <CircularProgress />}
        {status === 'idle' && <p>{message}</p>}
      </div>
    </div>
  )
}

export default ActivateAccount
