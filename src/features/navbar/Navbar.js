import { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import useFetchData from '../../hooks/useFetchData'
import { useDispatch } from 'react-redux'
import { resetReport, resetUri } from '../report/reportSlice'
// import { MobileView } from 'react-device-detect'
import Logo from './Logo'
import Status from './Status'
import Navigation from './Navigation'
import Burger from './Burger'
import Message from '../message/Message'
// import FullscreenIcon from '@mui/icons-material/Fullscreen'

import './navbar.css'

const Navbar = ({ fullScreen }) => {
    useFetchData()
    const dispatch = useDispatch()

    const [isActive, setIsActive] = useState('')

    const handleClickBurger = () => {
        setIsActive(isActive === '' ? ' is-active' : '')
    }

    const getHref = (e) => {
        for (let x = 0; x <= 4; x++) {
            if (e.href) if (e.href.slice(-6) === 'report') return true
            e = e.parentNode
        }
        return false
    }

    const handleClickMenuItem = (e) => {
        if (getHref(e.target)) {
            dispatch(resetUri())
            dispatch(resetReport())
        }
        if (isActive !== '') {
            setTimeout(() => {
                setIsActive('')
            }, 650)
        }
    }

    useEffect(() => {
        const root = ReactDOM.findDOMNode(document.querySelector('body'))
        const observerWidth = new ResizeObserver((entries) => {
            const [entry] = entries
            if (entry.contentRect.width <= 590) {
                setIsActive('')
            }
        })
        observerWidth.observe(root)

        return () => {
            observerWidth.unobserve(root)
        }
    }, [])

    window.screen.orientation.onchange = function () {
        setIsActive('')
    }

    return (
        <nav id="navbar">
            {/* <MobileView id="mobile-view">
                {fullScreen.active ? null : (
                    <div id="fullscreen-message" onClick={fullScreen.enter}>
                        <p>Uruchom na pełnym ekranie</p>
                        <p>Kliknij</p>
                        <i>
                            <FullscreenIcon />
                        </i>
                    </div>
                )}
            </MobileView> */}
            <Logo handleClick={handleClickMenuItem} />
            <Navigation className={isActive} handleClick={handleClickMenuItem} />
            <Status className={isActive} handleClick={handleClickMenuItem} fullScreen={fullScreen} />
            <Burger isActive={isActive} handleClick={handleClickBurger} />
            <Message />
        </nav>
    )
}

export default Navbar
