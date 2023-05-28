import NavigationLink from './NavigationLink'

import { useSelector } from 'react-redux'
import { selectUser } from '../login/loginSlice'

import AddCommentIcon from '@mui/icons-material/AddComment'
import LeaderboardIcon from '@mui/icons-material/Leaderboard'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration'

const Navigation = (props) => {
  const user = useSelector(selectUser)
  const { role } = user

  if (role === 'Super użytkownik' || role === 'Administrator') {
    return (
      <ul id="navigation" className={props.className}>
        <NavigationLink
          to="/report"
          icon={<AddCommentIcon />}
          text="Nowe zgłoszenie"
          handleClick={props.handleClick}
        />
        <NavigationLink
          to="/register"
          icon={<AppRegistrationIcon />}
          text="Rejestr"
          handleClick={props.handleClick}
        />
        <NavigationLink
          to="/statistics"
          icon={<LeaderboardIcon />}
          text="Statystyki"
          handleClick={props.handleClick}
        />
      </ul>
    )
  }

  return null
}

export default Navigation
