import DateRangeIcon from '@mui/icons-material/DateRange'
import AbcIcon from '@mui/icons-material/Abc'
import Looks3Icon from '@mui/icons-material/Looks3'
import TocIcon from '@mui/icons-material/Toc'

const SearchMenuItem = ({ id, label, handleChange, type }) => {
    const handleClick = () => {
        handleChange(id, 'selected', true)
    }

    return (
        <div id={`search_menu_${id}`} className="search-menu-item" onClick={handleClick}>
            {label}
            <i>
                {type === 'date' && <DateRangeIcon />}
                {type === 'text' && <AbcIcon />}
                {type === 'number' && <Looks3Icon />}
                {type === 'list' && <TocIcon />}
            </i>
        </div>
    )
}

export default SearchMenuItem
