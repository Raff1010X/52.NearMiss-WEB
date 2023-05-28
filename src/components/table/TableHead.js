import { useDispatch, useSelector } from 'react-redux'
import {
    selectNodata,
    selectDescending,
    selectOrderBy,
    setDescending,
    setOrderBy,
    selectColumn,
    setNextColumn,
    clearReports,
    setSelectedPage,
} from '../../features/register/registerSlice'

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'

const TableHead = () => {
    const dispatch = useDispatch()
    const noData = useSelector(selectNodata)
    const orderBy = useSelector(selectOrderBy)
    const descending = useSelector(selectDescending)
    const column = useSelector(selectColumn)

    const handleClick = (order) => {
        dispatch(setOrderBy(order))
        dispatch(setDescending(!descending))
        dispatch(setSelectedPage(1))
        dispatch(clearReports())
    }

    const handleNextColumnClick = () => {
        dispatch(setNextColumn())
    }

    let Arrow = <ArrowDropUpIcon />
    if (descending) Arrow = <ArrowDropDownIcon />

    const head = (
        <tr>
            <th onClick={() => handleClick('Numer zgłoszenia')}>Nr{orderBy === 'Numer zgłoszenia' && Arrow}</th>
            <th onClick={() => handleClick('Data zdarzenia')}>Data{orderBy === 'Data zdarzenia' && Arrow}</th>
            <th onClick={() => handleClick('Dział')}>Dział{orderBy === 'Dział' && Arrow}</th>
            <th onClick={handleNextColumnClick}>
                {column}
                <ArrowRightIcon />
            </th>
            <th onClick={() => handleClick('Status')}>Wykonano{orderBy === 'Status' && Arrow}</th>
        </tr>
    )

    return <thead>{!noData && head}</thead>
}

export default TableHead
