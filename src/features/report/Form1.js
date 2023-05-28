import { useSelector } from 'react-redux'
import { selectReport } from './reportSlice'

import Button from '../../components/button/Button'

const Form1 = ({ handleStep }) => {
    const clickNext = () => {
        handleStep(2)
    }

    const report = useSelector(selectReport)

    let edit1 = 'Nowe zgłoszenie'
    let edit2 = 'Wypełnij formularz zgłoszenia'
    let edit3 = 'aby wypełnić formularz.'

    if (report['Numer zgłoszenia']) {
        edit1 = 'Edycja zgłoszenia ' + report['Numer zgłoszenia']
        edit2 = 'Edytuj zgłoszenie w formularzu'
        edit3 = 'aby edytować zgłoszenie.'
    }

    return (
        <div className="report__form">
            <h1>{edit1}</h1>
            <div className="report__content">
                <h1>
                    {edit2}
                    <br />w kolejnych krokach
                </h1>
                <p>
                    Kliknij "dalej", <br />
                    {edit3}
                </p>
            </div>
            <div className="report__buttons">
                <Button className="button button-rounded" onClick={clickNext}>
                    Dalej
                </Button>
            </div>
        </div>
    )
}

export default Form1
