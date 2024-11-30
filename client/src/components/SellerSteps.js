import React from 'react'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useSelector } from 'react-redux';

const SellerSteps = () => {
  const {user} = useSelector((state) => state.auth)
    
const steps = [
    'Approval',
    'Choose plan',
    'payment verification',
  ];
  return (
    <div className='w-full max-w-xl'>
      <Stepper className='w-full p-4 bg-emerald-50 rounded-md' activeStep={user ? user.step : 0} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  )
}

export default SellerSteps






