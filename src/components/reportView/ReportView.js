import { useState, memo } from 'react'
import { touchMoves, touchEnds } from '../../misc/touch'

import ReportNoContent from './ReportNoContent'
import ReportContent from './ReportContent'
import ReportFooter from './ReportFooter'

import './reportView.css'
import { useDispatch } from 'react-redux'
import { nextIndex, prevIndex } from '../../features/register/registerSlice'

const ReportView = ({ reports }) => {
    const [touchStart, setTouchStart] = useState(0)
    const dispatch = useDispatch()

    let reportView
    if (reports) reportView = <ReportContent reports={reports} />
    if (!reports) reportView = <ReportNoContent />

    const handleNextClick = () => {
        dispatch(nextIndex())
    }

    const handlePrevClick = () => {
        dispatch(prevIndex())
    }

    const handleTouchStart = (e) => {
        setTouchStart(e.changedTouches[0].clientX)
    }
    const handleTouchEnd = (e) => {
        if (touchStart - 150 > e.changedTouches[0].clientX) handleNextClick()
        if (touchStart + 150 < e.changedTouches[0].clientX) handlePrevClick()
        touchEnds()
    }

    return (
        <div
            className="report-view"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchMove={(e) => touchMoves(e, touchStart)}
        >
            {reportView}
            <ReportFooter handleNextClick={handleNextClick} handlePrevClick={handlePrevClick} />
        </div>
    )
}

export default memo(ReportView)
