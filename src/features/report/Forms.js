import Form1 from './Form1'
import Form2 from './Form2'
import Form3 from './Form3'
import Form4 from './Form4'
import Form5 from './Form5'
import Form6 from './Form6'
import Form7 from './Form7'
import Form8 from './Form8'
import Form9 from './Form9'

const Forms = ({ currentStep, handleStep }) => {
  return (
    <div className="report__forms">
      {currentStep === 1 && <Form1 handleStep={handleStep} />}
      {currentStep === 2 && <Form2 handleStep={handleStep} />}
      {currentStep === 3 && <Form3 handleStep={handleStep} />}
      {currentStep === 4 && <Form4 handleStep={handleStep} />}
      {currentStep === 5 && <Form5 handleStep={handleStep} />}
      {currentStep === 6 && <Form6 handleStep={handleStep} />}
      {currentStep === 7 && <Form7 handleStep={handleStep} />}
      {currentStep === 8 && <Form8 handleStep={handleStep} />}
      {currentStep === 9 && <Form9 handleStep={handleStep} />}
    </div>
  )
}

export default Forms
