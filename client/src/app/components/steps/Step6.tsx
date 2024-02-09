import { Button } from '@mui/material'
import axios from 'axios'
import React from 'react'

const Step6 = () => {

  const getLicensePDF = async () => {
    const refreshToken = localStorage.getItem("refreshToken")
    const res = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/user/details/licensePDF?refreshToken="+refreshToken)
    const data = await res.data
    console.log(data);    
  }
  return (
    <>
        <p className='text-xl font-semibold'>Download License</p>
        <div className='flex items-center gap-x-3 mt-8 '>
            <p className='font-medium'>Click the button to download your pdf: </p>
            <div onClick={getLicensePDF} >
                <Button variant="contained" color="primary" className='bg-blue-600 rounded-lg normal-case' size="medium">Download</Button>
            </div>
        </div>
    </>
  )
}

export default Step6