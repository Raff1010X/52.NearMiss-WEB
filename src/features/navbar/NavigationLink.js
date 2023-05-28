import { NavLink } from 'react-router-dom'

const NavigationLink = (props) => {
    return (
        <li className={props.className}>
            <NavLink to={props.to} onClick={props.handleClick}>
                <p>
                    <i>{props.icon}</i>
                </p>
                <p>{props.text}</p>
            </NavLink>
        </li>
    )
}

export default NavigationLink
