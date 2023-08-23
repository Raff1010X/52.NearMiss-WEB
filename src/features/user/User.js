import { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useAppScroll from '../../hooks/useAppScroll'
import useNavigateMain from '../../hooks/useNavigateMain'

import { selectUser } from '../login/loginSlice'
import { fetchNumberOfUserReports } from '../../api/fetch'
import { selectOnlineStatus } from '../../api/otherSlice'

import Button from '../../components/button/Button'
import './user.css'

const User = () => {
    useNavigateMain()
    useAppScroll()
    const [numberOfReports, setNumberOfRecords] = useState('Liczę...')
    const user = useSelector(selectUser)
    // const { email, department, role } = user
    const { email, department } = user
    const online = useSelector(selectOnlineStatus)
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchDep() {
            try {
                const data = await fetchNumberOfUserReports()
                setNumberOfRecords(data.data[0].x_user_number_of_reports)
            } catch (err) { }
        }
        if (online) fetchDep()
    }, [online])

    const handleClick = () => {
        navigate('/changeUserData')
    }

    return (
        <div className="user">
            <h1>Adres email:</h1>
            <p>{email}</p>
            <h1>Dział:</h1>
            <p>{department}</p>
            <h1>Liczba zgłoszeń:</h1>
            <p>{numberOfReports}</p>
            <Button className="button user__button" onClick={handleClick}>
                Zmień moje dane
            </Button>
            {/* TODO */}
            {/* {role === 'Administrator' && <Button className="button user__button">Panel administratora</Button>} */}
        </div>
    )
}

export default User
