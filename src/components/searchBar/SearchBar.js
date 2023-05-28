import SearchGlass from './SearchGlass'
import SearchMenu from './SearchMenu'
import SearchItems from './SearchItems'

import './searchBar.css'

const SerchBar = ({ search, visible, handleClick, handleChange }) => {
    return (
        <div className="search-bar" onClick={handleClick}>
            <SearchGlass search={search} handleClick={handleClick} handleChange={handleChange} />
            <SearchMenu search={search} visible={visible} handleClick={handleClick} handleChange={handleChange} />
            <SearchItems search={search} handleClick={handleClick} handleChange={handleChange} />
        </div>
    )
}

export default SerchBar
