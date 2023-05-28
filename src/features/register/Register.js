import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

import { useSelector, useDispatch } from 'react-redux'
import { searchAsync } from './registerAPI'
import {
    selectReports,
    selectPage,
    selectPages,
    setSelectedPage,
    clearReports,
    setSearchString,
    selectSearchString,
    selectOrderBy,
    selectDescending,
    selectTableView,
    selectUpdate,
    changeTableView,
    setScrollTop,
    selectScrollTop,
} from './registerSlice'

import useAppScroll from '../../hooks/useAppScroll'
import useScroll from '../../hooks/useScroll'
import useNavigateMain from '../../hooks/useNavigateMain'
import SerchBar from '../../components/searchBar/SearchBar'
import Table from '../../components/table/Table'
import ReportView from '../../components/reportView/ReportView'

import './register.css'

const initialState = [
    { id: 0, label: 'Numer zgłoszenia', value: '', selected: false, type: 'number' },
    { id: 1, label: 'Zgłaszający', value: '', selected: false, type: 'text' },
    { id: 2, label: 'Dział', value: '', selected: false, type: 'list' },
    { id: 3, label: 'Miejsce', value: '', selected: false, type: 'text' },
    { id: 4, label: 'Data zdarzenia od dnia...', value: '', selected: false, type: 'date' },
    { id: 5, label: 'Data zdarzenia do dnia...', value: '', selected: false, type: 'date' },
    { id: 6, label: 'Zagrożenie', value: '', selected: false, type: 'list' },
    { id: 7, label: 'Opis Zagrożenia', value: '', selected: false, type: 'text' },
    { id: 8, label: 'Skutek', search: '', value: '', selected: false, type: 'text' },
    { id: 9, label: 'Konsekwencje', search: '', value: '', selected: false, type: 'list' },
    { id: 10, label: 'Działania do wykonania', value: '', selected: false, type: 'text' },
    { id: 11, label: 'Status', value: '', selected: false, type: 'list' },
]

const Register = () => {
    useNavigateMain()
    useAppScroll()
    useScroll()

    const [search, setSearch] = useState(initialState)
    const [visible, setVisible] = useState(false)
    const update = useSelector(selectUpdate)
    const dispatch = useDispatch()
    const reports = useSelector(selectReports)
    const page = useSelector(selectPage)
    const pages = useSelector(selectPages)
    const searchString = useSelector(selectSearchString)
    const orderBy = useSelector(selectOrderBy)
    const descending = useSelector(selectDescending)
    const tableView = useSelector(selectTableView)
    const scrollTop = useSelector(selectScrollTop)

    useEffect(() => {
        const app = ReactDOM.findDOMNode(document.querySelector('#App'))
        if (scrollTop > 0) {
            setTimeout(() => {
                app.scrollTo({ top: app.scrollHeight, behavior: 'smooth' })
            }, 1000)
        }
        return () => {
            dispatch(setScrollTop(app.scrollTop))
        }
    }, [dispatch, scrollTop])

    const handleClick = (e) => {
        if (search.find((el) => el.selected === false)) setVisible(!visible)
    }

    const handleChange = (id, key, value) => {
        if (key === 'selected' && value) {
            const searchItem = ReactDOM.findDOMNode(document.getElementById(`search_${id}`))
            searchItem.focus()
        } else {
            setVisible(false)
            dispatch(setSelectedPage(1))
        }

        if (search[id][key] !== value) {
            setSearch((state) => {
                const newState = state.map((el) => {
                    if (el.id === id) {
                        el[key] = value
                        return el
                    }
                    return el
                })
                return newState
            })
            if (key === 'value') {
                dispatch(setSelectedPage(1))
                dispatch(clearReports())
            }
        }
    }

    useEffect(() => {
        if (reports.length !== 0) return
        const stringToSearch = (searchState) => {
            const stringToSearch = searchState
                .filter((el) => el.selected && el.value !== '')
                .map((el) => `${el.label.toLowerCase().split(' za')[0].split(' do w')[0].split(' zg')[0]}=${el.value}`)
            stringToSearch.push('limit=10')
            stringToSearch.push(`offset=${(page - 1) * 10}`)
            stringToSearch.push(`order=${orderBy}`)
            if (descending) stringToSearch.push(`desc=true`)

            let ret = stringToSearch
                .join('&')
                .replace('data zdarzenia do dnia...', 'to')
                .replace('data zdarzenia od dnia...', 'from')
                .replace('numer', 'report_id')

            if (ret) ret = `?${ret}`
            return ret.toString()
        }

        const find = stringToSearch(search)
        dispatch(setSearchString(find))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, search, page, orderBy, descending])

    useEffect(() => {
        if (reports.length !== 0) return
        if (search[11].selected) {
            if (reports.length === 1) dispatch(setSelectedPage(page - 1))
            dispatch(changeTableView(true))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, update])

    useEffect(() => {
        if (reports.length !== 0) return
        dispatch(searchAsync(searchString))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, searchString, update])

    return (
        <div className="register">
            <SerchBar search={search} visible={visible} handleClick={handleClick} handleChange={handleChange} />
            {tableView && <Table reports={reports} page={page} pages={pages} />}
            {!tableView && <ReportView reports={reports} />}
        </div>
    )
}

export default Register
