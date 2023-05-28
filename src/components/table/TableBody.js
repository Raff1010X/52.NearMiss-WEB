import { useDispatch, useSelector } from 'react-redux'
import { selectNodata, selectColumn, changeTableView, setIndex } from '../../features/register/registerSlice'
import { useEffect, useState } from 'react'

import CircularProgress from '@mui/material/CircularProgress'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import DoneAllIcon from '@mui/icons-material/DoneAll'

const TableBody = ({ reports }) => {
    const dispatch = useDispatch()
    const noData = useSelector(selectNodata)
    const column = useSelector(selectColumn)
    const [textWidth, setTextWidth] = useState()

    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                if (entry.contentBoxSize) {
                    setTextWidth(entry.contentBoxSize[0].inlineSize / 6)
                }
            }
        })
        resizeObserver.observe(document.body)
        return () => {
            resizeObserver.unobserve(document.body)
        }
    }, [])

    function cutText(text) {
        const lastSpaceIndex = text.lastIndexOf(' ', textWidth)
        if (lastSpaceIndex < textWidth - 20) return text
        return text.substring(0, lastSpaceIndex) + '...'
    }

    const handleClick = (e, index) => {
        dispatch(changeTableView(false))
        dispatch(setIndex(index))
    }

    if (!reports)
        return (
            <tbody>
                <tr className="table__tr--loading">
                    <td>
                        {!noData && <CircularProgress />}
                        {noData && (
                            <p>
                                Brak wyników
                                <br />
                                wyszukiwania
                            </p>
                        )}
                    </td>
                </tr>
            </tbody>
        )

    const arr = []
    if (reports.length < 10) {
        for (let i = reports.length; i < 10; i++) {
            arr.push(<tr key={i} className="table__tr--empty"></tr>)
        }
    }

    const body = reports.map((el, index) => (
        <tr key={index} onClick={(e) => handleClick(e, index)}>
            <td>{el['Numer zgłoszenia']}</td>
            <td>{el['Data utworzenia']}</td>
            <td>{el['Dział']}</td>
            <td>{cutText(el[column])}</td>
            <td>
                {el['Status'] === 'Wykonane' && <DoneAllIcon htmlColor="limegreen" />}
                {el['Status'] === 'Niewykonane' && <RemoveCircleOutlineIcon htmlColor="red" />}
            </td>
        </tr>
    ))

    return (
        <tbody>
            {body}
            {arr}
        </tbody>
    )
}

export default TableBody
