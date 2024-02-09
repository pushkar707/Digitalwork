import { Button } from '@mui/material'
import axios from 'axios'
import React from 'react'

const Step6 = () => {
  const refreshToken = localStorage.getItem("refreshToken")
  return (
    <>
        <p className='text-xl font-semibold'>Download License</p>
        <div className='flex items-center gap-x-3 mt-8 '>
            <p className='font-medium'>Click the button to download your pdf: </p>
            <a href={process.env.NEXT_PUBLIC_API_URL + "/user/details/license_pdf?refreshToken="+refreshToken} download={"generated-pdf.pdf"} >
                <Button variant="contained" color="primary" className='bg-blue-600 rounded-lg normal-case' size="medium">Download</Button>
            </a>
        </div>
    </>
  )
}

export default Step6