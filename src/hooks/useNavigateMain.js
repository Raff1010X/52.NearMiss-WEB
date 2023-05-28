import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectUserIsLogged } from '../features/login/loginSlice'

const useNavigateMain = () => {
    const userIsLogged = useSelector(selectUserIsLogged)
    const navigate = useNavigate()
    useEffect(() => {
        if (!userIsLogged) navigate('/')
    }, [navigate, userIsLogged])
}

export default useNavigateMain
