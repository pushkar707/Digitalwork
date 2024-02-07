import { bloodGroups, categories, states } from '@/app/dashboard/data'
import { Button } from '@mui/material'
import React, { FormEvent } from 'react'

const Step1 = ({setActiveSelection}:{setActiveSelection:Function}) => {
    async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault()
        setActiveSelection(1)
    }

    return (
        <>
            <p className='text-xl font-semibold'>Provide You details</p>

            <form action="" className='mt-6 ml-2' onSubmit={handleSubmit}>

                <div className="mb-5 flex items-center">
                    <label htmlFor="name" className='w-28 md:w-36 lg:w-44 inline-block'>Name: </label>
                    <input type="text" placeholder='Name' className='rounded px-3 py-1 bg-slate-600 w-full max-w-56' />
                </div>

                <div className="mb-5 flex items-center">
                    <label htmlFor="name" className='w-28 md:w-36 lg:w-44 inline-block'>Mobile Number: </label>
                    <input type="number" placeholder='Mobile Number' className='rounded px-3 py-1 bg-slate-600 w-full max-w-52' />
                </div>

                <div className="mb-5 flex items-center">
                    <label htmlFor="name" className='w-28 md:w-36 lg:w-44 inline-block'>Father Name: </label>
                    <input type="text" placeholder='Father Name' className='rounded px-3 py-1 bg-slate-600 w-full max-w-52' />
                </div>

                <div className="mb-5 flex items-center">
                    <label htmlFor="name" className='w-28 md:w-36 lg:w-44 inline-block'>Aadhar Number: </label>
                    <input type="text" placeholder='Aadhar Number' className='rounded px-3 py-1 bg-slate-600 w-full max-w-52' />
                </div>

                <div className="mb-5 flex items-center">
                    <label htmlFor="name" className='w-28 md:w-36 lg:w-44 inline-block'>DOB: </label>
                    <input type="date" placeholder='Father Name' className='text-slate-400 rounded px-3 py-1 bg-slate-600 w-full max-w-52' />
                </div>

                <div className='mb-5 flex items-center'>
                    <label htmlFor="" className='w-28 md:w-36 lg:w-44'>State: </label>
                    <div className='bg-slate-600 pr-1 rounded h-fit'>
                        <select className='text-slate-400 p-2 rounded bg-slate-600 outline-none w-full'>
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
                        <select className='text-slate-400 p-2 rounded bg-slate-600 outline-none'>
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
                        <select className='text-slate-400 p-2 pr-3 rounded bg-slate-600 outline-none'>
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
                            <input type="radio" id='`male_gender`' value={"male"} name='gender' />
                            <label htmlFor="`male_gender`">Male</label>
                        </div>

                        <div className='flex items-center gap-x-1'>
                            <input type="radio" id='female_gender' value={"female"} name='gender' />
                            <label htmlFor="female_gender">Female</label>
                        </div>

                        <div className='flex items-center gap-x-1'>
                            <input type="radio" id='others_gender' value={"others"} name='gender' />
                            <label htmlFor="others_gender">Others</label>
                        </div>
                    </div>
                    {/* <div className='bg-slate-600 pr-1 rounded h-fit'>
                        <select className='text-slate-400 p-2 rounded bg-slate-600 outline-none'>
                            <option disabled className='text-white bg-slate-600' value={""}>Select your city</option>
                            <option className='text-white bg-slate-600' value={"10"}>Mumbai</option>
                            <option className='text-white bg-slate-600' value={"20"}>Kolkata</option>
                        </select>
                    </div> */}
                </div>

                <div className="mb-5 flex items-center">
                    <label htmlFor="name" className='w-28 md:w-36 lg:w-44 inline-block'>Address Line 1: </label>
                    <input type='text' placeholder='Address Line 1' className='rounded px-3 py-1 bg-slate-600 w-full max-w-52' />
                </div>

                <div className="mb-5 flex items-center">
                    <label htmlFor="name" className='w-28 md:w-36 lg:w-44 inline-block'>Address Line 2: </label>
                    <input type='text' placeholder='Address Line 2' className='rounded px-3 py-1 bg-slate-600 w-full max-w-52' />
                </div>

                <div className="mb-2 flex items-center">
                    <label htmlFor="name" className='w-28 md:w-36 lg:w-44 inline-block'>Pincode: </label>
                    <input type='number' placeholder='Pincode' className='rounded px-3 py-1 bg-slate-600 w-full max-w-52' />
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