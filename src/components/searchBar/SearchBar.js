import SearchGlass from './SearchGlass'
import SearchMenu from './SearchMenu'
import SearchItems from './SearchItems'
import { useSelector } from 'react-redux'
import { selectOnlineStatus } from '../../api/otherSlice'

import './searchBar.css'

const SerchBar = ({ search, visible, handleClick, handleChange }) => {
    const online = useSelector(selectOnlineStatus)

    return (
        <div
            className="search-bar"
            onClick={() => {
                if (online) handleClick()
            }}
        >
            <SearchGlass search={search} handleClick={handleClick} handleChange={handleChange} />
            <SearchMenu search={search} visible={visible} handleClick={handleClick} handleChange={handleChange} />
            <SearchItems search={search} handleClick={handleClick} handleChange={handleChange} />
            {!online && (
                <div
                    className="search-bar-disabled"
                    onClick={(e) => {
                        e.preventDefault()
                    }}
                ></div>
            )}
        </div>
    )
}

export default SerchBar
