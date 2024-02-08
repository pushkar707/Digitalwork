import React, { FormEvent, useState } from 'react'

const FileInput = ({fileFor, setInputFileFunction, maxImageHeight, maxImageWidth}:{fileFor:string, setInputFileFunction:Function , maxImageHeight:string, maxImageWidth:string}) => {
    const [imageUrl, setImageUrl] = useState('')

    const handleImage = (e:FormEvent<HTMLInputElement>) => {
        if(!e.currentTarget.files || !e.currentTarget.files.length)
            return        
        const url = URL.createObjectURL(e.currentTarget.files[0])
        setInputFileFunction(e.currentTarget.files[0])       
        setImageUrl(url)
    }

    return <>
        {imageUrl.length ? <div className='flex gap-x-3 relative w-fit'>
        <img src={imageUrl} width={maxImageWidth} height={maxImageHeight} alt="" />
        <p onClick={() => {setImageUrl(""); setInputFileFunction(null)}} className='hover:bg-slate-400 hover:text-black transition absolute top-1 right-1 rounded-full px-3 py-1 cursor-pointer bg-slate-500 text-lg'>X</p>
    </div> : 

    <div className='flex items-center gap-x-4'>
        <label htmlFor={fileFor+'file-input'} className='cursor-pointer bg-slate-500 px-3 py-1 rounded-lg text-3xl w-fit'>+</label>
        <input onInput={handleImage} type="file" id={fileFor+'file-input'} className='hidden' accept='image/*' />
        <p className='font-medium text-lg text-slate-100'>Add {fileFor}</p>
    </div>}
    </>
}

export default FileInput