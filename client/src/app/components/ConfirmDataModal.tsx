import { Button } from '@mui/material'
import axios from 'axios'
import React, { FormEvent, MouseEvent } from 'react'

const ConfirmDataModal = ({setActiveSelection, setshowModal, user, aadharInput, profileImageInput, signatureInput} : {setActiveSelection:Function ,setshowModal:Function, user:{[key:string]:any}, aadharInput:File, profileImageInput:File, signatureInput:File}) => {
  
    async function handleSubmit(e: MouseEvent<any>): Promise<void> {
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

        const add_keys_res = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/user/details/add",{
            refreshToken: localStorage.getItem("refreshToken"),
            ...keys
        })
        const add_keys_data = await add_keys_res.data
        console.log(add_keys_data);

        if(add_keys_data.success)
            setActiveSelection(3)        
    }
  
    return (
    <main className='w-screen max-w-screen fixed top-0 left-0 py-[5vh] h-screen bg-black bg-opacity-40 z-10'>
        <div className='relative h-[90vh] max-w-[90vw] overflow-y-scroll scroll-container mx-auto px-8 py-5 w-fit border bg-slate-200 rounded-xl text-black'>
            <button onClick={() => setshowModal(false)} className='absolute top-1 right-0 text-xl font-medium hover:bg-slate-600 hover:text-white transition-all px-3 py-1 rounded-full' >X</button>
            <p className='text-center font-medium text-[17px] mb-4'>Please confirm the data, you will not be able to change it later</p>

            <hr className='h-0.5 bg-slate-300 mb-5' />

            <div className='flex flex-col gap-y-2 mb-5'>
                <div className='flex gap-x-1' ><p className='font-semibold w-32 sm:w-40 md:w-52'>Name:</p> {user.name}</div>
                <div className='flex gap-x-1' ><p className='font-semibold w-32 sm:w-40 md:w-52'>Mobile Number: </p> {user.mobileNumber}</div>
                <div className='flex gap-x-1' ><p className='font-semibold w-32 sm:w-40 md:w-52'>Aadhar Number:</p> {user.aadharnumber}</div>
                <div className='flex gap-x-1' ><p className='font-semibold w-32 sm:w-40 md:w-52'>Date of Birth:</p> {user.dob}</div>
                <div className='flex gap-x-1' ><p className='font-semibold w-32 sm:w-40 md:w-52'>State:</p> {user.state}</div>
                <div className='flex gap-x-1' ><p className='font-semibold w-32 sm:w-40 md:w-52'>Category:</p> {user.category}</div>
                <div className='flex gap-x-1' ><p className='font-semibold w-32 sm:w-40 md:w-52'>Blood Group:</p> {user.bloodGroup}</div>
                <div className='flex gap-x-1' ><p className='font-semibold w-32 sm:w-40 md:w-52'>Gender: </p> {user.gender}</div>
                <div className='flex gap-x-1' ><p className='font-semibold w-32 sm:w-40 md:w-52'>Address:</p> {user.addressLine1}, {user.addressLine2}, {user.pincode}</div>
                <div className='flex gap-x-1' ><p className='font-semibold w-32 sm:w-40 md:w-52'>License Categories:</p> {user.licenseCategories.map((item: string) =>  <>{item} </>)} </div>
                <div className='flex gap-x-1' ><p className='font-semibold w-32 sm:w-40 md:w-52'>Commerical Use: </p> {user.isCommercialLicense === true ? "Yes" : "No"} </div>
                <div className='flex gap-x-1' ><p className='font-semibold w-32 sm:w-40 md:w-52'>Donating Organs: </p> {user.isDonatingOrgans === true ? "Yes" : "No"} </div>
            </div>
            
            <hr className='h-0.5 bg-slate-300 mb-4' />

            <div className='mt-4'>
                <p className='text-xl font-bold text-center'>Documents</p>

                <div className='flex flex-wrap gap-7  mt-5'>
                    <div className='w-fit'>
                        <img src={URL.createObjectURL(aadharInput)} className='w-80 h-52 mb-2'  alt="" />
                        <p className='text-center font-medium'>Aadhar Card</p>
                    </div>

                    <div className='w-fit'>
                        <img src={URL.createObjectURL(profileImageInput)} className='w-56 h-52 mb-2'  alt="" />
                        <p className='text-center font-medium'>Your Photo</p>
                    </div>

                    <div className='w-fit'>
                        <img src={URL.createObjectURL(signatureInput)} className='w-56 h-20 mb-2'  alt="" />
                        <p className='text-center font-medium'>Your Sign</p>
                    </div>
                </div>
            </div>

            <div onClick={handleSubmit} >
                <Button type='button' variant="contained" color="primary" className='mt-5 bg-blue-600 rounded-lg px-5 block mx-auto' size="medium">
                    Continue
                </Button>
            </div>
        </div>
    </main>
  )
}

export default ConfirmDataModal