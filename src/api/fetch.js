import { API } from './API'

export function fetchCRSF() {
    const response = API.makeGet('/api/getCSRFToken')
    return response
}

export function fetchNumberOfUserReports() {
    const response = API.makeGet('/api/users/me/number')
    return response
}
