import { useRef, useState, useEffect, memo } from 'react'
import ReactDOM from 'react-dom'

import List from '../list/List'

import CloseIcon from '@mui/icons-material/Close'
import SearchIcon from '@mui/icons-material/Search'

// import { is } from '../../misc/validate'
import { useSelector } from 'react-redux'
import { selectDepartments, selectThreats } from '../../api/otherSlice'

const SearchItem = ({ id, label, value, handleChange, selected, type }) => {
    const threats = useSelector(selectThreats)
    const departments = useSelector(selectDepartments)
    const [inputValue, setInputValue] = useState(value)
    const input = useRef(null)
    const [close, setClose] = useState(true)

    useEffect(() => {
        if (type === 'text') input.current.innerText = value
        if (value === '') setClose(false)
        // if (type === 'number') {
        //     input.current.addEventListener('keypress', is.inputDigitsOnly, false)
        //     const reff = input.current
        //     return () => {
        //         reff.removeEventListener('keypress', is.inputDigitsOnly, false)
        //     }
        // }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleKeyDown = (e) => {
        if (e.which === 13) {
            e.preventDefault()
            input.current.blur()
        } else {
            setClose(false)
        }
    }

    const handleInputChange = () => {
        if (input.current.value === 'hidden') return
        if (type === 'text') handleChange(id, 'value', input.current.innerText)
        else handleChange(id, 'value', input.current.value)
        setClose(true)
    }

    const handleFocus = () => {
        if (type === 'list') setClose(true)
        else setClose(false)
        try {
            if (type === 'date' && !selected) input.current.showPicker()
        } catch {
            return
        }
    }

    const handleItemClick = (e) => {
        e.stopPropagation()
        const searchItem = ReactDOM.findDOMNode(document.getElementById(`search_${id}`))
        searchItem.focus()
    }

    const handleClose = (e) => {
        e.stopPropagation()
        handleChange(id, 'value', '') //XD
        handleChange(id, 'selected', false)
    }

    // lista dział
    let options = departments
    let optionName = 'department'
    let optionId = 'department_id'

    // lista zagrożenia
    if (id === 6) {
        options = threats
        optionName = 'threat'
        optionId = 'threat_id'
    }

    // lista konsekwencje
    const kosekwencje = [
        { konsekwencje_id: 1, konsekwencje: 'Bardzo małe' },
        { konsekwencje_id: 2, konsekwencje: 'Małe' },
        { konsekwencje_id: 3, konsekwencje: 'Średnie' },
        { konsekwencje_id: 4, konsekwencje: 'Duże' },
        { konsekwencje_id: 5, konsekwencje: 'Bardzo duże' },
    ]

    if (id === 9) {
        options = kosekwencje
        optionName = 'konsekwencje'
        optionId = 'konsekwencje_id'
    }

    // lista status
    const status = [
        { status_id: 1, status: 'Wykonane' },
        { status_id: 2, status: 'Niewykonane' },
    ]
    if (id === 11) {
        options = status
        optionName = 'status'
        optionId = 'status_id'
    }

    // class
    let className = 'search-item'
    if (!selected) className = 'search-item search-item--hidden'

    return (
        <div className={className} onClick={(e) => handleItemClick(e)}>
            <div className="search-item__container">
                <label htmlFor={id} className="search-item__label">
                    {label}
                </label>
                {type === 'text' && (
                    <div
                        ref={input}
                        contentEditable
                        id={`search_${id}`}
                        className="search-item__input"
                        onKeyDown={(e) => handleKeyDown(e)}
                        onBlur={handleInputChange}
                        onFocus={handleFocus}
                    ></div>
                )}
                {(type === 'date' || type === 'number') && (
                    <input
                        ref={input}
                        type={type}
                        id={`search_${id}`}
                        className="search-item__input"
                        onKeyDown={(e) => handleKeyDown(e)}
                        onBlur={handleInputChange}
                        onFocus={handleFocus}
                        onChange={(e) => setInputValue(e.target.value)}
                        value={inputValue}
                        min={1}
                    ></input>
                )}
                {type === 'list' && (
                    <List
                        reff={input}
                        value={value}
                        setFn={handleInputChange}
                        options={options}
                        optionName={optionName}
                        optionId={optionId}
                        id={`search_${id}`}
                        className="search-item__input"
                        onFocus={handleFocus}
                    />
                )}
            </div>

            <i>
                {close && <CloseIcon onClick={(e) => handleClose(e)} />}
                {!close && <SearchIcon />}
            </i>
        </div>
    )
}

export default memo(SearchItem)
