import { bloodGroups, categories, states } from '@/app/dashboard/data'
import { Button } from '@mui/material'
import axios from 'axios'
import React, { FormEvent, useState } from 'react'

const Step1 = ({setActiveSelection}:{setActiveSelection:Function}) => {

    const [userBasicDetails, setUserBasicDetails] = useState({
        name:"",
        mobileNumber:"",
        fatherName:"",
        aadharnumber:"",
        dob:"",
        state:"",
        category:"",
        bloodGroup:"",
        gender:"",
        addressLine1:"",
        addressLine2:"",
        pincode:"",
    })

    async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault()

        const res = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/user/details/add",{
            refreshToken:localStorage.getItem("refreshToken"),
            ...userBasicDetails
        })
        const data = await res.data
        console.log(data);
        

        if(data.success)
            setActiveSelection(1)
    }


    function modidyUserDetails(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, key: string): void {
        setUserBasicDetails(prevState => {
            const newObj = {...prevState}
            // @ts-ignore
            newObj[key] = e.target.value
            return newObj
        })
    }

    return (
        <>
            <p className='text-xl font-semibold'>Provide You details</p>

            <form action="" className='mt-6 ml-2' onSubmit={handleSubmit}>

                <div className="mb-5 flex items-center">
                    <label htmlFor="name" className='w-28 md:w-36 lg:w-44 inline-block'>Name: </label>
                    <input type="text" value={userBasicDetails.name} onChange={(e) => modidyUserDetails(e,"name")} placeholder='Name' className='rounded px-3 py-1 bg-slate-600 w-full max-w-56' />
                </div>

                <div className="mb-5 flex items-center">
                    <label htmlFor="name" className='w-28 md:w-36 lg:w-44 inline-block'>Mobile Number: </label>
                    <input type="number" value={userBasicDetails.mobileNumber} onChange={(e) => modidyUserDetails(e,"mobileNumber")} placeholder='Mobile Number' className='rounded px-3 py-1 bg-slate-600 w-full max-w-56' />
                </div>

                <div className="mb-5 flex items-center">
                    <label htmlFor="name" className='w-28 md:w-36 lg:w-44 inline-block'>Father Name: </label>
                    <input type="text" value={userBasicDetails.fatherName} onChange={(e) => modidyUserDetails(e,"fatherName")} placeholder='Father Name' className='rounded px-3 py-1 bg-slate-600 w-full max-w-56' />
                </div>

                <div className="mb-5 flex items-center">
                    <label htmlFor="name" className='w-28 md:w-36 lg:w-44 inline-block'>Aadhar Number: </label>
                    <input type="text" value={userBasicDetails.aadharnumber} onChange={(e) => modidyUserDetails(e,"aadharnumber")} placeholder='Aadhar Number' className='rounded px-3 py-1 bg-slate-600 w-full max-w-56' />
                </div>

                <div className="mb-5 flex items-center">
                    <label htmlFor="name" className='w-28 md:w-36 lg:w-44 inline-block'>DOB: </label>
                    <input type="date" value={userBasicDetails.dob} onChange={(e) => modidyUserDetails(e,"dob")} placeholder='Father Name' className='text-slate-400 rounded px-3 py-1 bg-slate-600 w-full max-w-56' />
                </div>

                <div className='mb-5 flex items-center'>
                    <label htmlFor="" className='w-28 md:w-36 lg:w-44'>State: </label>
                    <div className='bg-slate-600 pr-1 rounded h-fit'>
                        <select onChange={(e) => modidyUserDetails(e,"state")} className='text-slate-400 p-2 rounded bg-slate-600 outline-none w-full'>
                            <option disabled selected className='text-white bg-slate-600' value={""}>Select your state</option>
                            {states.map((state,index) => {
                                return <option key={index} className='text-white bg-slate-600' value={state}>{state}</option>
                            })}
                        </select>
                    </div>
                </div>

                <div className='mb-5 flex items-center'>
                    <label htmlFor="" className='w-28 md:w-36 lg:w-44'>Category: </label>
                    <div className='bg-slate-600 pr-1 rounded h-fit'>
                        <select onChange={(e) => modidyUserDetails(e,"category")} className='text-slate-400 p-2 rounded bg-slate-600 outline-none'>
                            <option disabled selected className='text-white bg-slate-600' value={""}>Select your Category</option>
                            {categories.map((category,index) => {
                                return <option key={index} className='text-white bg-slate-600' value={category}>{category}</option>
                            })}
                            
                        </select>
                    </div>
                </div>

                <div className='mb-5 flex items-center'>
                    <label htmlFor="" className='w-28 md:w-36 lg:w-44'>Blood Group: </label>
                    <div className='bg-slate-600 pr-1 rounded h-fit'>
                        <select onChange={(e) => modidyUserDetails(e,"bloodGroup")} className='text-slate-400 p-2 pr-3 rounded bg-slate-600 outline-none'>
                            <option disabled selected className='text-white bg-slate-600' value={""}>Select Blood Group</option>
                            {bloodGroups.map((bloodGrp,index) => {
                                return <option key={index} className='text-white bg-slate-600' value={bloodGrp}>{bloodGrp}</option>
                            })}
                        </select>
                    </div>
                </div>

                <div className='mb-5 flex items-center'>
                    <p className='w-28 md:w-36 lg:w-44'>Gender: </p>
                    <div className='flex gap-x-6 opacity-85 ml-1'>
                        <div className='flex items-center gap-x-1'>
                            <input onChange={(e) => modidyUserDetails(e,"gender")} type="radio" id='`male_gender`' value={"male"} name='gender' />
                            <label htmlFor="`male_gender`">Male</label>
                        </div>

                        <div className='flex items-center gap-x-1'>
                            <input onChange={(e) => modidyUserDetails(e,"gender")}  type="radio" id='female_gender' value={"female"} name='gender' />
                            <label htmlFor="female_gender">Female</label>
                        </div>

                        <div className='flex items-center gap-x-1'>
                            <input onChange={(e) => modidyUserDetails(e,"gender")}  type="radio" id='others_gender' value={"others"} name='gender' />
                            <label htmlFor="others_gender">Others</label>
                        </div>
                    </div>
                </div>

                <div className="mb-5 flex items-center">
                    <label htmlFor="name" className='w-28 md:w-36 lg:w-44 inline-block'>Address Line 1: </label>
                    <input type='text' value={userBasicDetails.addressLine1} onChange={(e) => modidyUserDetails(e,"addressLine1")} placeholder='Address Line 1' className='rounded px-3 py-1 bg-slate-600 w-full max-w-56' />
                </div>

                <div className="mb-5 flex items-center">
                    <label htmlFor="name" className='w-28 md:w-36 lg:w-44 inline-block'>Address Line 2: </label>
                    <input type='text' value={userBasicDetails.addressLine2} onChange={(e) => modidyUserDetails(e,"addressLine2")} placeholder='Address Line 2' className='rounded px-3 py-1 bg-slate-600 w-full max-w-56' />
                </div>

                <div className="mb-2 flex items-center">
                    <label htmlFor="name" className='w-28 md:w-36 lg:w-44 inline-block'>Pincode: </label>
                    <input type='number' value={userBasicDetails.pincode} onChange={(e) => modidyUserDetails(e,"pincode")} placeholder='Pincode' className='rounded px-3 py-1 bg-slate-600 w-full max-w-56' />
                </div>

                <div className='flex justify-between w-full md:w-36 lg:w-96'>
                    <Button type='submit' variant="contained" color="success" className='mt-5 bg-green-500 rounded-lg px-5' size="medium">
                        Next
                    </Button>
                </div>
            </form>
        </>
    )
}

export default Step1