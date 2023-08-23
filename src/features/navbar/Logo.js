import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectOnlineStatus } from '../../api/otherSlice'

import logo from '../../assets/images/logo192.png'
import logoOffline from '../../assets/images/logo-offline.png'

const Logo = (props) => {
    const online = useSelector(selectOnlineStatus)

    let logoSrc = logo
    if (!online) logoSrc = logoOffline

    return (
        <NavLink to="/" id="logo" onClick={props.handleClick}>
            <img className="logo__img" src={logoSrc} alt="logo" />
            <p className="logo__text">
                Rejestr zdarzeń
                <br />
                potencjalnie wypadkowych
            </p>
        </NavLink>
    )
}

export default Logo
