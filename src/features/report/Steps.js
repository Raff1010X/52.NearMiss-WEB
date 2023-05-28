import Step from './Step'

const Steps = ({ numberOfSteps, currentStep }) => {
  const allSteps = []

  for (let i = 1; i <= numberOfSteps; i++) {
    allSteps.push(<Step key={i} number={i} currentStep={currentStep} />)
  }

  return <div className="report__steps">{allSteps}</div>
}

export default Steps
