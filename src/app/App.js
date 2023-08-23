import ReactDOM from 'react-dom'
import { useEffect, useState } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'

import { selectUserIsLogged, selectUser } from '../features/login/loginSlice'
import { fetchCRSF } from '../api/fetch'

import Navbar from '../features/navbar/Navbar'
import Login from '../features/login/Login'
import Logout from '../features/login/Logout'
import SignIn from '../features/login/SignIn'
import ForgotPassword from '../features/login/ForgotPassword'
import ResetPassword from '../features/login/ResetPassword'
import ActivateAccount from '../features/login/ActivateAccount'
import Main from '../features/main/Main'
import Report from '../features/report/Report'
import Register from '../features/register/Register'
import Statistics from '../features/statistics/Statistics'
import User from '../features/user/User'
import Comments from '../features/comments/Comments'
import ChangeUserData from '../features/user/ChangeUserData'
import useServiceWorkerMessage from '../hooks/useServiceWorkerMessage'
import useBackgroundSync from '../hooks/useBackgroundSync'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'

import './App.css'

function App() {
    useServiceWorkerMessage()
    useBackgroundSync()
    const fullScreen = useFullScreenHandle()
    const [fetched, setFetched] = useState(false)
    const userIsLogged = useSelector(selectUserIsLogged)
    const user = useSelector(selectUser)
    const { role } = user
    const dispatch = useDispatch()

    useEffect(() => {
        async function fetchCrsf() {
            const crsf = await fetchCRSF()
            if (crsf) {
                const el = ReactDOM.findDOMNode(document.querySelector('#loader'))
                if (el) el.remove()
                setFetched(true)
            } 
        }
        fetchCrsf()
    }, [dispatch])

    let style = {}
    if (!userIsLogged || role === 'Użytkownik') {
        style = { height: 'calc(100vh - var(--nav-height))' }
    }
    try {
        return (
            fetched && (
                <Router>
                    <FullScreen handle={fullScreen}>
                        <Navbar fullScreen={fullScreen} />
                        <div id="App" className="no_scroll" style={style}>
                            <Routes>
                                <Route path="/" element={<Main />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/logout" element={<Logout />} />
                                <Route path="/signin" element={<SignIn />} />
                                <Route path="/forgotpassword" element={<ForgotPassword />} />
                                <Route path="/register" element={<Register />} />
                                <Route path="/resetpassword/:id" element={<ResetPassword />} />
                                <Route path="/activateaccount/:id" element={<ActivateAccount />} />
                                <Route path="/report" element={<Report />} />
                                <Route path="/editReport" element={<Report />} />
                                <Route path="/statistics" element={<Statistics />} />
                                <Route path="/user" element={<User />} />
                                <Route path="/changeUserData" element={<ChangeUserData />} />
                                <Route path="/comments" element={<Comments />} />
                                <Route path="*" element={<Main />} />
                            </Routes>
                        </div>
                        <div id="prev-icon">
                            <i>
                                <ArrowCircleRightIcon />
                            </i>
                        </div>
                        <div id="next-icon">
                            <i>
                                <ArrowCircleLeftIcon />
                            </i>
                        </div>
                        <div id="message"></div>
                    </FullScreen>
                </Router>
            )
        )
    } catch {
        return (
            <div id="app-error">
                <div>
                    Aplikacja nie działa w tej przeglądarce. Zaktualizuj przeglądarkę lub otwórz aplikację w
                    przeglądarce Chrome, Edge, lub Firefox.
                </div>
            </div>
        )
    }
}

export default App
