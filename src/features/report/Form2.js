import { useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setReport, selectReport } from '../../features/report/reportSlice'

import List from '../../components/list/List'
import TextArea from '../../components/textarea/TextArea'
import { is } from '../../misc/validate'
import Buttons from './Buttons'
import { selectDepartments } from '../../api/otherSlice'

const Form2 = ({ handleStep }) => {
    const report = useSelector(selectReport)
    const departments = useSelector(selectDepartments)
    const [place, setPlace] = useState(report['Miejsce'])
    const [department, setDepartment] = useState(report['Dział'])

    const placeRef = useRef(null)
    const departmentRef = useRef(null)
    const dispatch = useDispatch()

    const checkValidyty = () => {
        return is.notEqual(departmentRef) && is.notLess(placeRef)
    }

    const dispatchData = () => {
        dispatch(setReport({ Dział: department, Miejsce: place }))
    }
    const clickPrev = () => {
        dispatchData()
        handleStep(1)
    }
    const clickNext = () => {
        if (checkValidyty()) {
            dispatchData()
            handleStep(3)
        }
    }

    return (
        <div className="report__form">
            <h1>Miejsce zdarzenia</h1>
            <form className="report__content">
                <fieldset className="report__fieldset">
                    <List
                        reff={departmentRef}
                        label={'Dział'}
                        id={'newreport__list'}
                        className={'newreport__list'}
                        value={department}
                        setFn={setDepartment}
                        options={departments}
                        optionName="department"
                        optionId="department_id"
                    />
                </fieldset>
                <fieldset className="report__fieldset">
                    <TextArea
                        reff={placeRef}
                        label="Miejsce zdarzenia"
                        placeholder="Podaj dokładne miejsce np.: pomieszczenie, stanowisko, linia produkcyjna, maszyna..."
                        id="report__textarea"
                        className="report__textarea"
                        value={place}
                        setFn={setPlace}
                    />
                </fieldset>
            </form>
            <Buttons clickPrev={clickPrev} clickNext={clickNext} />
        </div>
    )
}

export default Form2
