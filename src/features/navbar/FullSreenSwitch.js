import FullscreenIcon from '@mui/icons-material/Fullscreen'
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit'

const FullScreenSwitch = (props) => {
    return (
        <li id="fullscreen-switch" className={props.className}>
            {props.fullScreen.active ? (
                <FullscreenExitIcon onClick={props.fullScreen.exit} />
            ) : (
                <FullscreenIcon onClick={props.fullScreen.enter} />
            )}
        </li>
    )
}

export default FullScreenSwitch
