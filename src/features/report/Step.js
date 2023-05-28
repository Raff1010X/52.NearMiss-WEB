import CheckIcon from '@mui/icons-material/Check'

const Step = ({ currentStep, number }) => {
  let className = 'report__step'
  if (currentStep === number) className = 'report__step--selected'
  if (currentStep > number) className = 'report__step--completed'

  return (
    <div className={className}>
      {currentStep > number ? <CheckIcon /> : number}
    </div>
  )
}

export default Step
