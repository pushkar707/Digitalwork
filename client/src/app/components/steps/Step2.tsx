import { Button } from '@mui/material'
import axios from 'axios'
import React, { FormEvent, useEffect, useState } from 'react'

const Step2 = ({setActiveSelection, user}:{setActiveSelection:Function, user:{[key:string]:any} | null}) => {

    const [licenseCategoriesSelected, setlicenseCategoriesSelected] = useState<string[]>([])
    const [isCommercialLicense, setisCommercialLicense] = useState(false)
    const [isDonatingOrgans, setisDonatingOrgans] = useState(false)

    useEffect(() => {
        if(user){
            setlicenseCategoriesSelected(user.licenseCategories)
            setisCommercialLicense(user.isCommercialLicense)
            setisDonatingOrgans(user.isDonatingOrgans)
        }
    },[user])

    async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault()

        const res = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/user/details/add",{
            refreshToken:localStorage.getItem("refreshToken"),
            licenseCategories:licenseCategoriesSelected,
            selfDeclationFilled:false,
            isCommercialLicense,
            isDonatingOrgans            
        })
        const data = await res.data
        if(data.success)
            setActiveSelection(2)
    }

    const handleCheckboxChange = (value:string) => {
        if (licenseCategoriesSelected.includes(value)) {
          // If the checkbox is already selected, remove it from the array
          setlicenseCategoriesSelected(licenseCategoriesSelected.filter((item) => item !== value));
        } else {
          // If the checkbox is not selected, add it to the array
          setlicenseCategoriesSelected([...licenseCategoriesSelected, value]);
        }
    };

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
                                        <input onChange={() => handleCheckboxChange(value)} type="checkbox" checked={licenseCategoriesSelected.includes(value) ? true : false} id={value} name='licenseCategory'/>
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
                        <input onChange={(e) => setisCommercialLicense(JSON.parse(e.target.value))} checked={isCommercialLicense == true ? true : false} type="radio" id='yes_commercial' value={"true"} name='isCommercialLicense' />
                        <label htmlFor="yes_commercial">Yes</label>
                    </div>

                    <div className='flex items-center gap-x-1'>
                        <input onChange={(e) => setisCommercialLicense(JSON.parse(e.target.value))} checked={isCommercialLicense == true ? true : false} type="radio" id='no_commercial' value={"false"} name='isCommercialLicense' />
                        <label htmlFor="no_commercial">No</label>
                    </div>
                </div>
            </div>

            <div className="mb-4">
                <p className=' text-lg mb-1'>Are you willing to donate your organs in case of accidental death? </p>
                <div className='flex gap-x-6 opacity-85 ml-1'>
                    <div className='flex items-center gap-x-1'>
                        <input onChange={(e) => setisDonatingOrgans(JSON.parse(e.target.value))} checked={isDonatingOrgans == true ? true : false} type="radio" id='yes_organs' value={"true"} name='organsDonation' />
                        <label htmlFor="yes_organs">Yes</label>
                    </div>

                    <div className='flex items-center gap-x-1'>
                        <input onChange={(e) => setisDonatingOrgans(JSON.parse(e.target.value))} checked={isDonatingOrgans == false ? true : false} type="radio" id='no_organs' value={"false"} name='organsDonation' />
                        <label htmlFor="no_organs">No</label>
                    </div>
                </div>
            </div>

            <div className='-mt-4 flex justify-between w-full md:w-36 lg:w-96'>
                <div onClick={() => setActiveSelection(0)} >
                    <Button variant="contained" color="success" className='mt-5 bg-green-500 rounded-lg px-5' size="medium">
                        Back
                    </Button>
                </div>
                <Button type='submit' variant="contained" color="success" className='mt-5 bg-green-500 rounded-lg px-5' size="medium">
                    Next
                </Button>
            </div>
        </form>

    </>
  )
}

export default Step2