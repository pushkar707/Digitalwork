import { Button } from '@mui/material'
import React, { FormEvent, useState } from 'react'
import FileInput from '../FileInput'

const Step3 = () => {
    function handleSubmit(E: FormEvent<HTMLFormElement>): void {
        throw new Error('Function not implemented.')
    }

    const [aadharInput, setAadharInput] = useState<File | null>(null)

  return (
    <>
        <p className='text-xl font-semibold'>Upload Documents</p>

        <form action="" className='mt-5 ml-2' onSubmit={handleSubmit}>

            <div className=' flex flex-col gap-y-8 mt-9'>
                <FileInput fileFor='Aadhar Card' maxImageHeight={"192"} maxImageWidth={"320"} setInputFileFunction={setAadharInput} />
                <FileInput fileFor='Your Photo' maxImageHeight={"284"} maxImageWidth={"225"} setInputFileFunction={setAadharInput} />
                <FileInput fileFor='Signature' maxImageHeight={"100"} maxImageWidth={"225"} setInputFileFunction={setAadharInput} />
            </div>

            <div className='mt-6 flex justify-between w-full md:w-36 lg:w-96'>
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

export default Step3