import { useRef, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { setReport, selectReport } from './reportSlice'
import { selectConsequences } from '../../api/otherSlice'

import List from '../../components/list/List'
import TextArea from '../../components/textarea/TextArea'
import { is } from '../../misc/validate'

import Buttons from './Buttons'

const Form5 = ({ handleStep }) => {
    const report = useSelector(selectReport)
    const consequences = useSelector(selectConsequences)
    const [consequence, setConsequence] = useState(report['Konsekwencje'])
    const [description, setDescription] = useState(report['Skutek'])

    const consequencesRef = useRef(null)
    const descriptionRef = useRef(null)
    const dispatch = useDispatch()

    const checkValidyty = () => {
        return is.notEqual(consequencesRef) && is.notLess(descriptionRef)
    }

    const dispatchData = () => {
        dispatch(setReport({ Konsekwencje: consequence, Skutek: description }))
    }
    const clickPrev = () => {
        dispatchData()
        handleStep(4)
    }
    const clickNext = () => {
        if (checkValidyty()) {
            dispatchData()
            handleStep(6)
        }
    }

    return (
        <div className="report__form">
            <h1>Skutki zagrożenia</h1>
            <form className="report__content">
                <fieldset className="report__fieldset">
                    <List
                        reff={consequencesRef}
                        label={'Skutki zagrożenia'}
                        id={'newreport__list'}
                        className={'newreport__list'}
                        value={consequence}
                        setFn={setConsequence}
                        options={consequences}
                        optionName="consequence"
                        optionId="consequence_id"
                    />
                </fieldset>
                <fieldset className="report__fieldset">
                    <TextArea
                        reff={descriptionRef}
                        label="Opis możliwych skutków"
                        placeholder="Podaj opis możliwych skutków zagrożenia np.: złamanie, stłuczenie, zranienie, zniszczenie mienia..."
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

export default Form5
