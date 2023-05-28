import React from 'react'

const Password = ({ reff, value, id = 'password', className, label = 'Hasło', placeholder = 'Hasło', setFn }) => {
    return (
        <React.Fragment>
            <label htmlFor="password" className={className + '__label'}>
                {label}
            </label>
            <input
                ref={reff}
                type="password"
                id={id}
                className={className}
                placeholder={placeholder}
                autoComplete="current-password"
                minLength={8}
                maxLength={16}
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

export default Password
