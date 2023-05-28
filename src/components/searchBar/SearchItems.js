import SearchItem from './SearchItem'

const SearchItems = ({ search, handleChange }) => {
    return (
        <div className="serch-items">
            {search.map((el) => (
                <SearchItem
                    key={el.id}
                    id={el.id}
                    label={el.label}
                    value={el.value}
                    handleChange={handleChange}
                    selected={el.selected}
                    type={el.type}
                />
            ))}
        </div>
    )
}

export default SearchItems
