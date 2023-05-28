const PaginationOptions = ({ pages }) => {
    const arr = []

    for (let i = 1; i <= pages; i++) {
        arr.push(
            <option key={i} value={i} className="tfoot__option">
                {i} z {pages}
            </option>
        )
    }

    return arr
}

export default PaginationOptions
