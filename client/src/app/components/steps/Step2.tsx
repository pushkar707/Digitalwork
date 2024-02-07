import { Button } from '@mui/material'
import React, { FormEvent } from 'react'

const Step2 = () => {
    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        throw new Error('Function not implemented.')
    }

    const licenseCategories = [
        {value:"MCWOG",label:"MCWOG (Motorcycle Without Gear)"},
        {value:"MCWG",label:"MCWG (Motorcycle With Gear)"},
        {value:"LMV",label:"LMV (Light Motor Vehicle)"},
        {value:"MGV",label:"MGV (Medium Goods Vehicle)"},
        {value:"HMV",label:"HMV (Heavy Motor Vehicle)"},
    ]

  return (
    <>
        <p className='text-xl font-semibold'>Your License Specifications</p>

        <form action="" className='mt-5 ml-2' onSubmit={handleSubmit}>
            <div className="mb-4 flex items-center">
                <div>
                    <p className='mb-3 font-medium text-lg'>Choose Your License Categories: </p>
                    <div className='ml-2 opacity-85'>
                        {licenseCategories.map(category => {
                            const {value,label} = category
                            return <div className='flex items-center gap-x-3'>
                                        <input type="checkbox" id={value} name='licenseCategory'/>
                                        <label htmlFor={value}>{label}</label>
                                    </div>
                        })}                        
                    </div>                    
                </div>
            </div>

            <div className="mb-2 flex gap-x-2 items-center">
                <p className=' text-lg'>Click below to fill the self declaration form: </p>
                <Button variant="contained" color="primary" className='bg-blue-600 rounded-lg' size="medium">Declation Form</Button>
            </div>

            <div className="mb-4">
                <p className=' text-lg mb-1'>Is this a commercial License? </p>
                <div className='flex gap-x-6 opacity-85 ml-1'>
                    <div className='flex items-center gap-x-1'>
                        <input type="radio" id='yes_commercial' value={1} name='isCommercialLicense' />
                        <label htmlFor="yes_commercial">Yes</label>
                    </div>

                    <div className='flex items-center gap-x-1'>
                        <input type="radio" id='no_commercial' value={0} name='isCommercialLicense' />
                        <label htmlFor="no_commercial">No</label>
                    </div>
                </div>
            </div>

            <div className="mb-4">
                <p className=' text-lg mb-1'>Are you willing to donate your organs in case of accidental death? </p>
                <div className='flex gap-x-6 opacity-85 ml-1'>
                    <div className='flex items-center gap-x-1'>
                        <input type="radio" id='yes_organs' value={1} name='organsDonation' />
                        <label htmlFor="yes_organs">Yes</label>
                    </div>

                    <div className='flex items-center gap-x-1'>
                        <input type="radio" id='no_organs' value={0} name='organsDonation' />
                        <label htmlFor="no_organs">No</label>
                    </div>
                </div>
            </div>

            <div className='-mt-4 flex justify-between w-full md:w-36 lg:w-96'>
                <Button variant="contained" color="success" className='mt-5 bg-green-500 rounded-lg px-5' size="medium">
                    Back
                </Button>
                <Button type='submit' variant="contained" color="success" className='mt-5 bg-green-500 rounded-lg px-5' size="medium">
                    Next
                </Button>
            </div>
        </form>

    </>
  )
}

export default Step2