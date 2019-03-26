import React from 'react'
import StepOne from './steps/StepOne'
import StepTwo from './steps/StepTwo'
import StepThree from './steps/StepThree'
import StepFour from './steps/StepFour'

const steps =
    [
      {name: 'StepOne', component: <StepOne />},
      {name: 'StepTwo', component: <StepTwo />},
      {name: 'StepThree', component: <StepThree />},
      {name: 'StepFour', component: <StepFour />}
    ]

export { steps }
