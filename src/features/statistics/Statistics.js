import { useMemo, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    selectPage,
    selectTop10,
    selectReportsStats,
    selectReportsToDepartment,
    selectReportsByDepartment,
    selectReportsDone,
    selectReportsPost,
    setPage,
    setRangeValues,
    selectRangeValues,
} from './statisticsSlice'
import {
    fetchStatsAsync,
    fetchReportsToDepartmentAsync,
    fetchReportsByDepartmentAsync,
    fetchTop10Async,
} from './statisticsApi'
import { selectOnlineStatus } from '../../api/otherSlice'
import useAppScroll from '../../hooks/useAppScroll'
import useNavigateMain from '../../hooks/useNavigateMain'
import { touchMoves, touchEnds } from '../../misc/touch'
import Stat1 from './Stat1'
import Stat2 from './Stat2'
import Stat3 from './Stat3'
import Stat4 from './Stat4'
import Stat5 from './Stat5'
import Stat6 from './Stat6'
import Stat7 from './Stat7'
import Slider from '@mui/material/Slider'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'

import './statistics.css'

const Statistics = () => {
    useNavigateMain()
    useAppScroll()
    const dispatch = useDispatch()
    const numberOfStats = 7
    const page = useSelector(selectPage)
    const top10 = useSelector(selectTop10)
    const reportsStats = useSelector(selectReportsStats)
    const reportsToDepartment = useSelector(selectReportsToDepartment)
    const reportsByDepartment = useSelector(selectReportsByDepartment)
    const reportsPost = useSelector(selectReportsPost)
    const reportsDone = useSelector(selectReportsDone)
    const [dates, setDates] = useState(`Zakres dat: --.-- / --.--`)
    const rangeValues = useSelector(selectRangeValues)
    const [value, setValue] = useState([0, 0])
    const [touchStart, setTouchStart] = useState(0)
    const online = useSelector(selectOnlineStatus)

    const reportsByDate = useMemo(
        () =>
            reportsPost
                .map((el) => {
                    let index = reportsDone.map((ob) => ob.date).indexOf(el.date)
                    if (index > -1) return { date: el.date, post: el.post, done: reportsDone[index].done }
                    else return { date: el.date, post: el.post, done: 0 }
                })
                .reverse(),
        [reportsDone, reportsPost]
    )

    useEffect(() => {
        if (rangeValues[0] === -1 && reportsByDate.length !== 0) {
            const maxRange = reportsByDate.length - 1
            dispatch(setRangeValues([0, maxRange]))
        }
    }, [dispatch, rangeValues, reportsByDate])

    useEffect(() => {
        if (reportsByDate[rangeValues[0]] && reportsByDate[rangeValues[1]]) {
            setDates(`Zakres dat: ${fromDate} / ${toDate}`)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rangeValues])

    const reportsToRange = useMemo(
        () => reportsByDate.slice(rangeValues[0], rangeValues[1] + 1),
        [reportsByDate, rangeValues]
    )

    const fromDate = useMemo(
        () => {
            if (reportsByDate[rangeValues[0]]) {
                const v0 = reportsByDate[rangeValues[0]].date
                return '20' + v0.slice(3, 5) + '-' + v0.slice(0, 2) + '-01'
            }
            return '----------'
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [rangeValues]
    )
    const toDate = useMemo(
        () => {
            if (reportsByDate[rangeValues[1]]) {
                let v1 = reportsByDate[rangeValues[1]].date
                v1 = v1.replaceAll('.', '/')
                const lastDay = new Date('20' + v1.slice(3, 5), v1.slice(0, 2), 0).getDate()
                return '20' + v1.slice(3, 5) + '-' + v1.slice(0, 2) + '-' + lastDay.toString()
            }
            return '----------'
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [rangeValues]
    )

    const handleMouseUp = (e) => {
        e.preventDefault()
        if (value[0] !== rangeValues[0] || value[1] !== rangeValues[1]) {
            setValue(rangeValues[0], rangeValues[1])
            const query = `?from=${fromDate}&to=${toDate}`
            setDates(`Zakres dat: ${fromDate} / ${toDate}`)
            dispatch(fetchStatsAsync(query))
            dispatch(fetchReportsToDepartmentAsync(query))
            dispatch(fetchReportsByDepartmentAsync(query))
            dispatch(fetchTop10Async(query))
        }
    }

    const handleChange = (e, newValue) => {
        if (rangeValues[0] !== newValue[0] || rangeValues[1] !== newValue[1]) {
            dispatch(setRangeValues(newValue))
        }
    }

    const handleNextClick = () => {
        if (page + 1 <= numberOfStats) dispatch(setPage(page + 1))
    }
    const handlePrevClick = () => {
        if (page - 1 >= 1) dispatch(setPage(page - 1))
    }

    let classPrev = 'report-view__button--enabled'
    if (page - 1 < 1) classPrev = 'report-view__button--disabled'
    let classNext = 'report-view__button--enabled'
    if (page + 1 > numberOfStats) classNext = 'report-view__button--disabled'

    let stat
    if (page === 1) stat = <Stat1 data={reportsStats} />
    if (page === 2) stat = <Stat2 data={reportsStats} />
    if (page === 3) stat = <Stat3 data={reportsToRange} />
    if (page === 4)
        stat = (
            <Stat4
                data={reportsToDepartment
                    .filter((el) => el['Liczba zgłoszeń'] >= 5)
                    .map((el) => {
                        return {
                            Dział: el['Dział'],
                            'Liczba zgłoszeń wykonanych': el['Liczba zgłoszeń wykonanych'],
                            Różnica: el['Liczba zgłoszeń'] - el['Liczba zgłoszeń wykonanych'],
                        }
                    })}
            />
        )
    if (page === 5)
        stat = (
            <Stat5
                data={
                    reportsToDepartment.filter((el) => el['Liczba zgłoszeń'] >= 5)
                    // .sort((a, b) => b['Liczba zgłoszeń'] - a['Liczba zgłoszeń'])
                }
            />
        )
    if (page === 6) stat = <Stat6 data={reportsByDepartment} />
    if (page === 7) stat = <Stat7 data={top10} />

    const handleTouchStart = (e) => {
        setTouchStart(e.changedTouches[0].clientX)
    }
    const handleTouchEnd = (e) => {
        try {
            if (e.target.className.includes('MuiSlider')) return
        } catch {}
        if (touchStart - 150 > e.changedTouches[0].clientX) handleNextClick()
        if (touchStart + 150 < e.changedTouches[0].clientX) handlePrevClick()
        touchEnds()
    }

    return (
        <div
            className="stats"
            onTouchStart={(e) => handleTouchStart(e)}
            onTouchEnd={(e) => handleTouchEnd(e)}
            onTouchMove={(e) => touchMoves(e, touchStart)}
        >
            <div className="stats__charts">{stat}</div>
            <div className="stats__dates">{dates}</div>
            <Slider
                sx={{ color: '#009bcd', width: '85%' }}
                getAriaLabel={() => 'Zakres dat'}
                min={0}
                max={reportsByDate.length - 1}
                value={rangeValues}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchEnd={(e) => handleMouseUp(e)}
                onChange={handleChange}
                valueLabelDisplay={'off'}
                disabled={!online}
            />
            <div className="report-view__footer">
                <div className={classPrev} onClick={handlePrevClick}>
                    <ArrowCircleLeftIcon />
                </div>
                <div className="report-view__pages">
                    Strona {page} z {numberOfStats}
                </div>
                <div className={classNext} onClick={handleNextClick}>
                    <ArrowCircleRightIcon />
                </div>
            </div>
        </div>
    )
}

export default Statistics
