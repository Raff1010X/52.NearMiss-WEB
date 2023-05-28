import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setReport, selectReport } from './reportSlice'

import { is } from '../../misc/validate'
import TextArea from '../../components/textarea/TextArea'
import Buttons from './Buttons'

const Form6 = ({ handleStep }) => {
    const report = useSelector(selectReport)
    const [description, setDescription] = useState(report['Działania do wykonania'])

    const descriptionRef = useRef(null)
    const dispatch = useDispatch()

    const checkValidyty = () => {
        return is.notLess(descriptionRef)
    }

    const dispatchData = () => {
        dispatch(setReport({ 'Działania do wykonania': description }))
    }
    const clickPrev = () => {
        dispatchData()
        handleStep(5)
    }
    const clickNext = () => {
        if (checkValidyty()) {
            dispatchData()
            handleStep(7)
        }
    }

    return (
        <div className="report__form">
            <h1>Działania zapobiegawcze</h1>
            <form className="report__content">
                <fieldset className="report__fieldset">
                    <TextArea
                        reff={descriptionRef}
                        label="Proponowane działania"
                        placeholder="Opisz proponowane działania techniczne lub organizacyjne zapobiegające zagrożeniu"
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

export default Form6
