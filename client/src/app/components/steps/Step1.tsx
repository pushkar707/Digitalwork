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

                <div className='mb-5 flex items-center'>
                    <label htmlFor="" className='w-28 md:w-36 lg:w-44'>State: </label>
                    <div className='bg-slate-600 pr-1 rounded h-fit'>
                        <select className='text-slate-400 p-2 rounded bg-slate-600 outline-none w-full'>
                            <option className='text-white bg-slate-600' value={""}>Select your city</option>
                            <option className='text-white bg-slate-600' value={"10"}>Mumbai</option>
                            <option className='text-white bg-slate-600' value={"20"}>Kolkata</option>
                        </select>
                    </div>
                </div>

                <div className='mb-5 flex items-center'>
                    <label htmlFor="" className='w-28 md:w-36 lg:w-44'>Category: </label>
                    <div className='bg-slate-600 pr-1 rounded h-fit'>
                        <select className='text-slate-400 p-2 rounded bg-slate-600 outline-none'>
                            <option className='text-white bg-slate-600' value={""}>Select your city</option>
                            <option className='text-white bg-slate-600' value={"10"}>Mumbai</option>
                            <option className='text-white bg-slate-600' value={"20"}>Kolkata</option>
                        </select>
                    </div>
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
                    <label htmlFor="name" className='w-28 md:w-36 lg:w-44 inline-block'>DOB: </label>
                    <input type="date" placeholder='Father Name' className='text-slate-400 rounded px-3 py-1 bg-slate-600 w-full max-w-52' />
                </div>
                <div className='mb-5 flex items-center'>
                    <label htmlFor="" className='w-28 md:w-36 lg:w-44'>Blood Group: </label>
                    <div className='bg-slate-600 pr-1 rounded h-fit'>
                        <select className='text-slate-400 p-2 rounded bg-slate-600 outline-none'>
                            <option className='text-white bg-slate-600' value={""}>Select Blood Group</option>
                            <option className='text-white bg-slate-600' value={"10"}>Mumbai</option>
                            <option className='text-white bg-slate-600' value={"20"}>Kolkata</option>
                        </select>
                    </div>
                </div>

                <div className='mb-5 flex items-center'>
                    <label htmlFor="" className='w-28 md:w-36 lg:w-44'>Gender: </label>
                    <div className='bg-slate-600 pr-1 rounded h-fit'>
                        <select className='text-slate-400 p-2 rounded text-slate-400 bg-slate-600 outline-none'>
                            <option disabled className='text-white bg-slate-600' value={""}>Select your city</option>
                            <option className='text-white bg-slate-600' value={"10"}>Mumbai</option>
                            <option className='text-white bg-slate-600' value={"20"}>Kolkata</option>
                        </select>
                    </div>
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