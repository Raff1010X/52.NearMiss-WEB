import Buttons from './Buttons'
import File from '../../components/file/File'

const Form7 = ({ handleStep }) => {
  const clickPrev = () => {
    handleStep(6)
  }
  const clickNext = () => {
    handleStep(8)
  }

  return (
    <div className="report__form">
      <h1>Fotografia</h1>
      <form className="report__content">
        <File />
      </form>
      <Buttons clickPrev={clickPrev} clickNext={clickNext} />
    </div>
  )
}

export default Form7
