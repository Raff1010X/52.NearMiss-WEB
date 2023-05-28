import { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'

const ThemeSwitch = (props) => {
    const [theme, setTheme] = useState(localStorage.getItem('ZPW-theme'))

    useEffect(() => {
        if (theme !== 'light' && theme !== 'dark') setTheme('light')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const root = ReactDOM.findDOMNode(document.documentElement)
        root.setAttribute('color-theme', theme)
        localStorage.setItem('ZPW-theme', theme)
    }, [theme])

    const handleClick = () => {
        theme !== 'dark' ? setTheme('dark') : setTheme('light')
    }

    return (
        <li id="theme-switch" className={props.className} onClick={handleClick}>
            <SettingsBrightnessIcon className="theme-switch__icon" />
        </li>
    )
}

export default ThemeSwitch
