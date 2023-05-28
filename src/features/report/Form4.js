import { useRef, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { setReport, selectReport } from './reportSlice'

import List from '../../components/list/List'
import TextArea from '../../components/textarea/TextArea'
import { is } from '../../misc/validate'

import Buttons from './Buttons'
import { selectThreats } from '../../api/otherSlice'

const Form4 = ({ handleStep }) => {
    const report = useSelector(selectReport)
    const threats = useSelector(selectThreats)
    const [threat, setThreat] = useState(report['Zagrożenie'])
    const [description, setDescription] = useState(report['Opis Zagrożenia'])

    const threatsRef = useRef(null)
    const descriptionRef = useRef(null)
    const dispatch = useDispatch()

    const checkValidyty = () => {
        return is.notEqual(threatsRef) && is.notLess(descriptionRef)
    }

    const dispatchData = () => {
        dispatch(setReport({ Zagrożenie: threat, 'Opis Zagrożenia': description }))
    }
    const clickPrev = () => {
        dispatchData()
        handleStep(3)
    }
    const clickNext = () => {
        if (checkValidyty()) {
            dispatchData()
            handleStep(5)
        }
    }

    return (
        <div className="report__form">
            <h1>Opis zagrożenia</h1>
            <form className="report__content">
                <fieldset className="report__fieldset">
                    <List
                        reff={threatsRef}
                        label={'Rodzaj zagrożenia'}
                        id={'newreport__list'}
                        className={'newreport__list'}
                        value={threat}
                        setFn={setThreat}
                        options={threats}
                        optionName="threat"
                        optionId="threat_id"
                    />
                </fieldset>
                <fieldset className="report__fieldset">
                    <TextArea
                        reff={descriptionRef}
                        label="Opis zagrożenia"
                        placeholder="Podaj opis zagrożenia np.: potknięcie, poślizgnięcie, uderzenie przez pojazd w ruchu, uszkodzona instalacja, narzędzie..."
                        id="report__textarea"
                        className="report__textarea"
                        value={description}
                        setFn={setDescription}
                    />
                </fieldset>
            </form>
            <Buttons clickPrev={clickPrev} clickNext={clickNext} />
        </div>
    )
}

export default Form4
