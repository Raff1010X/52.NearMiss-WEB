import { useState, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearReports, selectNodata, setSelectedPage } from '../../features/register/registerSlice'
import { touchMoves, touchEnds } from '../../misc/touch'

import TableBody from './TableBody'
import TableHead from './TableHead'
import TableFoot from './TableFoot'

import './table.css'

const Table = ({ reports, page, pages }) => {
    const [touchStart, setTouchStart] = useState(0)
    const noData = useSelector(selectNodata)
    const dispatch = useDispatch()
    const prevPage = () => {
        if (page - 1 > 0) {
            dispatch(setSelectedPage(page - 1))
            dispatch(clearReports())
        }
    }
    const nextPage = () => {
        if (page + 1 <= pages) {
            dispatch(setSelectedPage(page + 1))
            dispatch(clearReports())
        }
    }

    const handleTouchStart = (e) => {
        setTouchStart(e.changedTouches[0].clientX)
    }
    const handleTouchEnd = (e) => {
        if (touchStart - 150 > e.changedTouches[0].clientX) nextPage()
        if (touchStart + 150 < e.changedTouches[0].clientX) prevPage()
        touchEnds()
    }

    let className = ''
    if (noData) className = ' table--loading'
    return (
        <div className={'table' + className}>
            <table
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onTouchMove={(e) => touchMoves(e, touchStart)}
            >
                <TableHead />
                <TableBody reports={reports} />
                <TableFoot page={page} pages={pages} nextPage={nextPage} prevPage={prevPage} />
            </table>
        </div>
    )
}

export default memo(Table)
