import { Button } from '@mui/material'
import React from 'react'

const Step6 = () => {
  return (
    <>
        <p className='text-xl font-semibold'>Download License</p>
        <div className='flex items-center gap-x-3 mt-8 '>
            <p className='font-medium'>Click the button to download your pdf: </p>
            <div onClick={() => alert("PDF Design is still pending. Thankyou for understanding")} >
                <Button variant="contained" color="primary" className='bg-blue-600 rounded-lg normal-case' size="medium">Download</Button>
            </div>
        </div>
    </>
  )
}

export default Step6