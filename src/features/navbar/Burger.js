import React from 'react'

const Burger = (props) => {
  const { isActive, handleClick } = props

  return (
    <React.Fragment>
      <div className={'burger' + isActive} title="Menu" onClick={handleClick}>
        <div className="burger__inner"></div>
      </div>
      <div className={'burger__menu' + isActive} />
    </React.Fragment>
  )
}

export default Burger
