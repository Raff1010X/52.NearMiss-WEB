import React from 'react'

const Email = ({ reff, value, id = 'email', className = 'email', label = 'Adres email', setFn }) => {
    return (
        <React.Fragment>
            <label htmlFor="email" className={className + '__label'}>
                {label}
            </label>
            <input
                ref={reff}
                type="email"
                id={id}
                className={className}
                placeholder="Adres email"
                autoComplete="email"
                required
                value={value}
                onChange={(e) => {
                    reff.current.setCustomValidity('')
                    setFn(e.target.value)
                }}
            />
        </React.Fragment>
    )
}

export default Email
