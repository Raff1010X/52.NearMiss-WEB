import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserIsLogged } from '../features/login/loginSlice'
import { userMeAsync } from '../features/login/loginAPI'
import {
    fetchReportsDoneAsync,
    fetchReportsPostAsync,
    fetchStatsAsync,
    fetchReportsToDepartmentAsync,
    fetchReportsByDepartmentAsync,
    fetchTop10Async,
} from '../features/statistics/statisticsApi'
import { getDepartmentsAsync, getThreatsAsync, getConsequencesAsync } from '../api/otherAPI'

const useFetchData = () => {
    const dispatch = useDispatch()
    const userIsLogged = useSelector(selectUserIsLogged)
    useEffect(() => {
        dispatch(userMeAsync())
        dispatch(getDepartmentsAsync())
        if (userIsLogged) {
            dispatch(fetchReportsDoneAsync())
            dispatch(fetchReportsPostAsync())
            dispatch(fetchStatsAsync(''))
            dispatch(fetchReportsToDepartmentAsync(''))
            dispatch(fetchReportsByDepartmentAsync(''))
            dispatch(fetchTop10Async(''))
            dispatch(getThreatsAsync())
            dispatch(getConsequencesAsync())
        }
    }, [dispatch, userIsLogged])
}

export default useFetchData
