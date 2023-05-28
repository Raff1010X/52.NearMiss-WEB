import CheckIcon from '@mui/icons-material/Check'
import Button from '../../components/button/Button'

const Form9 = ({ handleStep }) => {
    const clickNext = () => {
        handleStep(2)
    }

    return (
        <div className="report__form">
            <div className="report__content">
                <h1>Dziękujemy za zgłoszenie!</h1>
                <CheckIcon id="report__check" />
                <p>
                    Kliknij przycisk poniżej, <br />
                    aby dodać kolejny raport.
                </p>
            </div>
            <div className="report__buttons">
                <Button className="button button-rounded" onClick={clickNext}>
                    Nowe zgłoszenie
                </Button>
            </div>
        </div>
    )
}

export default Form9
