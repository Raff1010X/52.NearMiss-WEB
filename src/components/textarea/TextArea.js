import React from 'react'

const TextArea = ({ reff, label, placeholder, id, className = 'textarea', value, setFn, maxLen = 1024 }) => {
    return (
        <React.Fragment>
            <label htmlFor={id} className={className + '__label'}>
                {label}
            </label>
            <textarea
                ref={reff}
                className={className}
                id={id}
                placeholder={placeholder}
                required
                minLength={8}
                maxLength={maxLen}
                value={value}
                onChange={(e) => {
                    reff.current.setCustomValidity('')
                    setFn(e.target.value)
                }}
            ></textarea>
        </React.Fragment>
    )
}

export default TextArea
