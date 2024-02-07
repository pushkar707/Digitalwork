"use client"
import axios from 'axios'
import React,{useState,useEffect, ChangeEvent} from 'react'
import {useRouter} from "next/navigation"
import Person2Icon from '@mui/icons-material/Person2';
import Step1 from '../components/steps/Step1';
import Step2 from '../components/steps/Step2';
import Step3 from '../components/steps/Step3';
import Step4 from '../components/steps/Step4';


const Page = () => {
  const router = useRouter()

  const [user, setUser] = useState({})
  const [activeSelection, setActiveSelection] = useState<number>(1)

  useEffect(() => {
    const verifyToken = async() => {
      const refreshToken = localStorage.getItem("refreshToken")
      if(!refreshToken)
        return router.push("/")
      const res = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/auth/verify?refreshToken="+refreshToken)
      const data = await res.data
      console.log(data);
      
      if(data.success){
        return setUser(data.user)
      }  
      return router.push("/")
    }
    verifyToken()

    const selectTags = document.querySelectorAll("select")
    selectTags?.forEach((tag: any) => {
      console.log(tag);
      
      tag.addEventListener("change",(e:ChangeEvent<HTMLInputElement>) => {
        e.currentTarget.classList.remove("text-slate-400")
        e.currentTarget.classList.add("text-white")
      }) 
    });

    document.querySelector("input[type='date']")?.addEventListener("change",(e:any) =>{
      e.currentTarget.classList.remove("text-slate-400")
      e.currentTarget.classList.add("text-white")
    })
  },[])

  const leftMenu= [
    {heading: "Your details", subHeading:"Fill your basic details"},
    {heading: "License Info", subHeading:"License Specifications"},
    {heading: "Add Documents", subHeading:"Upload your documents"},
    {heading: "Fee Payment", subHeading:"Pay License fees"},
    {heading: "Your details", subHeading:"Fill your basic details"},
    {heading: "Your details", subHeading:"Fill your basic details"},
  ]
  return (
    <main className='min-h-screen max-w-screen overflow-hidden bg-slate-800 py-12 px-8 xl:px-12 text-white'>
      <p className='text-3xl mb-2 font-medium'>You are very close to start driving!!</p>
      <p className='opacity-50'>You will obtain you license once you complete these steps</p>

      <div className='mt-8'>
        <hr className='opacity-20 border-none h-[0.5px] bg-white w-full'/>
        <div className='flex max-h-[70vh] '>
          <div className='h-fit xl:pl-5 pr-10 pt-8 flex flex-col gap-y-10 relative z-[1] border-r border-r-slate-600'>
            <hr className='absolute top-20 right-[23.5%] lg:right-[21%] z-[-1] opacity-20 border-none w-[0.5px] bg-white h-[80%]' />
            <div className='absolute z-20 top-[50px] -right-1.5 flex flex-col gap-y-[4.75rem]'>
              {Array.from({length:6}).map((_,index)=>{
                return <div className='border flex justify-center items-center p-[1px] bg-slate-800 rounded-full border-slate-600'>
                <div className={`p-[5px] rounded-full ${activeSelection > index ? "bg-slate-200" : activeSelection === index ? "bg-green-500" : "bg-transparent"}`}></div>
              </div>
              })}
            </div>
            {leftMenu.map((menuItem,index) => {
              return <div className='flex gap-x-4 items-center'>
              <div className='w-40 lg:w-44'>
                <p className='text-lg font-medium'>{menuItem.heading}</p>
                <p className='opacity-50 text-sm'>{menuItem.subHeading}</p>
              </div>
              <div className={`${activeSelection === index ? "bg-green-500" : "bg-slate-500"} rounded-full p-3 w-fit`}>
                <Person2Icon />
              </div>
            </div>
            })}
          </div>
          <div className='flex-grow pl-7 lg:pl-14 pt-10 pr-5 overflow-y-scroll scroll-container'>
            <p className='opacity-50 text-sm mb-2'>Step {activeSelection+1} of 6</p>
            {activeSelection === 0 ? <Step1 setActiveSelection={setActiveSelection} />:
            activeSelection === 1? <Step2 setActiveSelection={setActiveSelection} /> :
            activeSelection === 2 ? <Step3/> :
            activeSelection === 3 ? <Step4/> : "" }
            
          </div>
        </div>
      </div>

    </main>
  )
}

export default Page