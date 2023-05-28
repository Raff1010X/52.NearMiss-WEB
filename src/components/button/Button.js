import './button.css'

const Button = ({ id, className = 'button', onClick, icon, children }) => {
  const handleClick = () => {
    setTimeout(() => {
      onClick()
    }, 400)
  }

  return (
    <button id={id} className={className} onClick={handleClick}>
      <div className="button__icon">{icon}</div>
      <p className="button__text">{children}</p>
    </button>
  )
}

export default Button
