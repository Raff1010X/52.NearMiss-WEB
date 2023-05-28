import SearchMenuItem from './SearchMenuItem'
import CloseIcon from '@mui/icons-material/Close'

const SearchMenu = ({ search, visible, handleClick, handleChange }) => {
    let className = 'search-menu'
    if (!visible) className = 'search-menu search-menu--hidden'

    return (
        <div className={className}>
            <div className="search-menu__icon">
                <p>Wyszukaj według:</p>
                <i>
                    <CloseIcon onClick={handleClick} />
                </i>
            </div>

            <br />
            {search
                .filter((el) => el.selected !== true)
                .map((el) => (
                    <SearchMenuItem
                        key={el.id}
                        id={el.id}
                        label={el.label}
                        handleChange={handleChange}
                        type={el.type}
                    />
                ))}
        </div>
    )
}

export default SearchMenu
