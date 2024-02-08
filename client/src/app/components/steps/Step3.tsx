import { Button } from '@mui/material'
import React, { FormEvent, useState } from 'react'
import FileInput from '../FileInput'
import axios from 'axios'

const Step3 = ({setActiveSelection}:{setActiveSelection: Function}) => {

    const [aadharInput, setAadharInput] = useState<File | null>(null)
    const [profileImageInput, setProfileImageInput] = useState<File | null>(null)
    const [signatureInput, setSignatureInput] = useState<File | null>(null)
    
    async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault()
        if(aadharInput === null || profileImageInput === null || signatureInput === null)
            return

        const keys: any = {aadharImageKey:"",profileImageKey:"",signatureImageKey:""}
        const fileKeys = ['aadharImageKey',"profileImageKey","signatureImageKey"]
        const files = [aadharInput, profileImageInput, signatureInput]

        const uploadpromise =  files.map(async (file: File, index:number) => {
            const res = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/user/details/image_upload_link?key="+file?.name)
            const data = await res.data            
    
            // Error handling pending
            if(data.success){
                await axios.put(data.signedUrl, file, {
                    headers: {
                      'Content-Type': file.type,
                    },
                })
                keys[fileKeys[index]] = data.key
            }
        })
        await Promise.all(uploadpromise)
        console.log(keys);
        if(keys.length){
            const add_keys_res = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/user/details/add",{
                refreshToken: localStorage.getItem("refreshToken"),
                ...keys
            })
            const add_keys_data = await add_keys_res.data
            console.log(add_keys_data);
    
            if(add_keys_data.success)
                setActiveSelection(3)
        }
        
    }
    

  return (
    <>
        <p className='text-xl font-semibold'>Upload Documents</p>

        <form action="" className='mt-5 ml-2' onSubmit={handleSubmit}>

            <div className=' flex flex-col gap-y-8 mt-9'>
                <FileInput fileFor='Aadhar Card' maxImageHeight={"192"} maxImageWidth={"320"} setInputFileFunction={setAadharInput} />
                <FileInput fileFor='Your Photo' maxImageHeight={"284"} maxImageWidth={"225"} setInputFileFunction={setProfileImageInput} />
                <FileInput fileFor='Signature' maxImageHeight={"100"} maxImageWidth={"225"} setInputFileFunction={setSignatureInput} />
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