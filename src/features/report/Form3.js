import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setReport, selectReport } from './reportSlice'

import { is } from '../../misc/validate'

import Buttons from './Buttons'

const Form3 = ({ handleStep }) => {
  const report = useSelector(selectReport)
  const [date, setDate] = useState(report['Data zdarzenia'])
  const [time, setTime] = useState(report['Godzina zdarzenia'])

  const dateRef = useRef(null)
  const timeRef = useRef(null)

  const dispatch = useDispatch()

  const dispatchData = () => {
    dispatch(setReport({ 'Data zdarzenia': date, 'Godzina zdarzenia': time }))
  }
  const clickPrev = () => {
    dispatchData()
    handleStep(2)
  }
  const clickNext = () => {
    if (is.notFuture(dateRef, timeRef)) {
      dispatchData()
      handleStep(4)
    }
  }

  return (
    <div className="report__form">
      <h1>Data zdarzenia</h1>
      <form className="report__content">
        <fieldset className="report__fieldset">
          <label htmlFor="report__date">Data zdarzenia</label>
          <input
            ref={dateRef}
            id="report__date"
            type="date"
            defaultValue={date}
            onChange={(e) => setDate(e.currentTarget.value)}
          />
          <label htmlFor="report__time">Godzina zdarzenia</label>
          <input
            ref={timeRef}
            id="report__time"
            type="time"
            defaultValue={time}
            onChange={(e) => setTime(e.currentTarget.value)}
          />
        </fieldset>
      </form>
      <Buttons clickPrev={clickPrev} clickNext={clickNext} />
    </div>
  )
}

export default Form3
