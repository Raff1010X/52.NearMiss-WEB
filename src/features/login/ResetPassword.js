import { useEffect } from 'react'

import { useParams } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { selectMessage, resetLoginMessage, selectStatus } from './loginSlice'
import { resetPasswordAsync } from './loginAPI'

import CircularProgress from '@mui/material/CircularProgress'

const ResetPassword = () => {
  const { id } = useParams()
  const status = useSelector(selectStatus)
  const message = useSelector(selectMessage)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(resetLoginMessage())
    return () => dispatch(resetLoginMessage())
  }, [dispatch])

  useEffect(() => {
    dispatch(resetPasswordAsync(id))
  }, [dispatch, id])

  return (
    <div className="login">
      <h1>Resetowanie hasła</h1>
      <div className="login__status">
        {status === 'loading' && <CircularProgress />}
        {status === 'idle' && <p>{message}</p>}
      </div>
    </div>
  )
}

export default ResetPassword
