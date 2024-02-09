import { Button } from '@mui/material'
import React, { FormEvent, useState, MouseEvent } from 'react'
import FileInput from '../FileInput'
import axios from 'axios'
import ConfirmDataModal from '../ConfirmDataModal'

const Step3 = ({setActiveSelection,user}:{setActiveSelection: Function,user:{[key:string]:any} | null}) => {

    const [aadharInput, setAadharInput] = useState<File | null>(null)
    const [profileImageInput, setProfileImageInput] = useState<File | null>(null)
    const [signatureInput, setSignatureInput] = useState<File | null>(null)
    const [showModal, setshowModal] = useState(true)

  return (
    <>
        {showModal && user && aadharInput && profileImageInput && signatureInput ? <ConfirmDataModal setActiveSelection={setActiveSelection} setshowModal={setshowModal} user={user} aadharInput={aadharInput} profileImageInput={profileImageInput} signatureInput={signatureInput} /> : "" }
        <p className='text-xl font-semibold'>Upload Documents</p>

        <div className='mt-5 ml-2'>

            <div className=' flex flex-col gap-y-8 mt-9'>
                <FileInput fileFor='Aadhar Card' maxImageHeight={"192"} maxImageWidth={"320"} setInputFileFunction={setAadharInput} />
                <FileInput fileFor='Your Photo' maxImageHeight={"284"} maxImageWidth={"225"} setInputFileFunction={setProfileImageInput} />
                <FileInput fileFor='Signature' maxImageHeight={"100"} maxImageWidth={"225"} setInputFileFunction={setSignatureInput} />
            </div>

            <div className='mt-6 flex justify-between w-full md:w-36 lg:w-96'>
                <div onClick={() => setActiveSelection(1)} >
                    <Button variant="contained" color="success" className='mt-5 bg-green-500 rounded-lg px-5' size="medium">
                        Back
                    </Button>
                </div>
                <div onClick={() => setshowModal(true)} >
                    <Button type='button' variant="contained" color="success" className='mt-5 bg-green-500 rounded-lg px-5' size="medium">
                        Next
                    </Button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Step3