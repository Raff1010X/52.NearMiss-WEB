import { useSelector } from 'react-redux'
import { selectIndex, selectNumberOfReports, selectPage, selectNodata } from '../../features/register/registerSlice'

import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'

const ReportFooter = ({ handlePrevClick, handleNextClick }) => {
    const index = useSelector(selectIndex)
    const page = useSelector(selectPage)
    const numberOfReports = useSelector(selectNumberOfReports)
    const noData = useSelector(selectNodata)

    let classPrev = 'report-view__button--enabled'
    if ((page - 1) * 10 + index - 1 < 0) classPrev = 'report-view__button--disabled'
    let classNext = 'report-view__button--enabled'
    if ((page - 1) * 10 + index + 2 > numberOfReports) classNext = 'report-view__button--disabled'

    if (noData) return null
    return (
        <div className="report-view__footer">
            <div className={classPrev} onClick={handlePrevClick}>
                <ArrowCircleLeftIcon />
            </div>

            <div className="report-view__pages">
                Strona {(page - 1) * 10 + index + 1} z {numberOfReports}
            </div>
            <div className={classNext} onClick={handleNextClick}>
                <ArrowCircleRightIcon />
            </div>
        </div>
    )
}

export default ReportFooter
