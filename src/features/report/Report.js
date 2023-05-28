import { useState } from 'react'
import useAppScroll from '../../hooks/useAppScroll'
import useNavigateMain from '../../hooks/useNavigateMain'
import { useSelector } from 'react-redux'
import { selectReport } from './reportSlice'

import Steps from './Steps'
import Forms from './Forms'

import './report.css'
import { useEffect } from 'react'

const Report = () => {
    useNavigateMain()
    useAppScroll()
    const report = useSelector(selectReport)
    const [reportNumber, setReportNumber] = useState(report['Numer zgłoszenia'])
    const [currentStep, setCurrentStep] = useState(1)

    const handleStep = (stepNumber) => {
        setCurrentStep(stepNumber)
    }

    useEffect(() => {
        if (report['Numer zgłoszenia'] !== reportNumber) {
            setCurrentStep(1)
            setReportNumber(report['Numer zgłoszenia'])
        }
    }, [report, reportNumber])

    return (
        <div className="report">
            <Steps numberOfSteps={8} currentStep={currentStep} />
            <Forms currentStep={currentStep} handleStep={handleStep} />
        </div>
    )
}

export default Report
