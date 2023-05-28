import NavigationLink from './NavigationLink'

import { useSelector } from 'react-redux'
import { selectUserIsLogged } from '../login/loginSlice'

import ThemeSwitch from './ThemeSwitch'
import FullScreenSwitch from './FullSreenSwitch'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'

const Status = (props) => {
    const userIsLogged = useSelector(selectUserIsLogged)

    return (
        <div id="status" className={props.className}>
            <ul className={`status__menu ${props.className}`}>
                {userIsLogged ? (
                    <NavigationLink
                        to="/user"
                        icon={<PersonOutlineIcon />}
                        text="Użytkownik"
                        handleClick={props.handleClick}
                    />
                ) : (
                    <li className="status__menuitem"></li>
                )}
                {userIsLogged ? (
                    <NavigationLink
                        to="/logout"
                        icon={<LogoutIcon />}
                        text="Wyloguj się"
                        handleClick={props.handleClick}
                    />
                ) : (
                    <NavigationLink
                        to="/login"
                        icon={<LoginIcon />}
                        text="Zaloguj się"
                        handleClick={props.handleClick}
                    />
                )}
                <FullScreenSwitch fullScreen={props.fullScreen} className={props.className} />
                <ThemeSwitch className={props.className} />
            </ul>
        </div>
    )
}

export default Status
