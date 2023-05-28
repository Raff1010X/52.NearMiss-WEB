import React from 'react'

const List = ({
    reff,
    label = '',
    id,
    className = 'list',
    value,
    setFn,
    options,
    optionName,
    optionId,
    onBlur = null,
    onFocus = null,
}) => {
    return (
        <React.Fragment>
            <label htmlFor={id} className={`${className}__label`}>
                {label}
            </label>
            <select
                ref={reff}
                id={id}
                className={className}
                value={value}
                required
                onBlur={onBlur}
                onFocus={onFocus}
                onChange={(e) => {
                    reff.current.setCustomValidity('')
                    setFn(e.target.value)
                }}
            >
                {!options && (
                    <option hidden value="hidden">
                        Ładuję dane...
                    </option>
                )}
                <option hidden value="hidden">
                    {`Wybierz ${label.toLowerCase()}...`}
                </option>
                {options &&
                    options
                        .filter((el) => el[optionName] !== '')
                        .map((el) => (
                            <option key={el[optionId]} value={el[optionName]}>
                                {el[optionName]}
                            </option>
                        ))}
            </select>
        </React.Fragment>
    )
}

export default List
