import { Button } from '@mui/material'
import React from 'react'

const Step4 = () => {
  return (
    <>
        <p className='text-xl font-semibold'>Upload Documents</p>

        <div className='ml-2 mt-6'>
          <p className='mb-4 text-lg'>Click the button below to complete fee payment</p>
          <a href="#">
            <Button variant="contained" color="primary" className='bg-blue-600 rounded-lg' size="medium">Declation Form</Button>
          </a>
        </div>
    </>
  )
}

export default Step4