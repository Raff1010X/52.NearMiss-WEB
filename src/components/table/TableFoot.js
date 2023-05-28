import PaginationOptions from './PaginationOptions'
import { useDispatch, useSelector } from 'react-redux'
import { selectNodata, setSelectedPage, clearReports } from '../../features/register/registerSlice'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'

const TableFoot = ({ page, pages, nextPage, prevPage }) => {
    const dispatch = useDispatch()
    const noData = useSelector(selectNodata)

    const handleChange = (e) => {
        dispatch(setSelectedPage(Number(e.target.value)))
        dispatch(clearReports())
    }

    let classPrev = 'report-view__button--enabled'
    if (page - 1 <= 0) classPrev = 'report-view__button--disabled'
    let classNext = 'report-view__button--enabled'
    if (pages !== 0 && page + 1 > pages) classNext = 'report-view__button--disabled'

    return (
        <tfoot>
            {!noData && (
                <tr>
                    <td className={classPrev} onClick={prevPage}>
                        <ArrowCircleLeftIcon />
                    </td>
                    <td className="tfoot__td--input">
                        <select className="tfoot__select" value={page} onChange={(e) => handleChange(e)}>
                            <PaginationOptions pages={pages} />
                        </select>
                    </td>
                    <td className={classNext} onClick={nextPage}>
                        <ArrowCircleRightIcon />
                    </td>
                </tr>
            )}
        </tfoot>
    )
}

export default TableFoot
