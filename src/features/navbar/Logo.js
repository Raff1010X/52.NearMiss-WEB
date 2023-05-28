import { NavLink } from 'react-router-dom'

import logo192 from '../../assets/images/logo192.png'

const Logo = (props) => {
    return (
        <NavLink to="/" id="logo" onClick={props.handleClick}>
            <img className="logo__img" src={logo192} alt="logo" />
            <p className="logo__text">
                Rejestr zdarzeń
                <br />
                potencjalnie wypadkowych
            </p>
        </NavLink>
    )
}

export default Logo
