"use client"
import React, { FormEvent, useEffect, useMemo, useState } from 'react'
import testQuestions from './testQuestions';
import { getRandomElements } from '../utils/other';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation'
import axios from 'axios';

const Page = () => {

    const router = useRouter()

    const addTestAttempt = async () => {
        const refreshToken = localStorage.getItem("refreshToken")
        const res = await axios.put(process.env.NEXT_PUBLIC_API_URL + "/user/details/takeTest",{
            refreshToken               
        })
        const data = await res.data
        console.log(data);       

        if(!data.success)
            router.push("/dashboard")
    }
    useEffect(() => {
        addTestAttempt()
    },[])

    const [questions, setQuestions] = useState<any[]>([])

    useEffect(() => {
        setQuestions(getRandomElements(testQuestions,15))
    },[])
    
    const [currentQuestionNumber, setCurrentQuestionNumber] = useState<number>(0)
    const [score, setscore] = useState<number>(0)
    const [optionSelected, setoptionSelected] = useState<null | 0 | 1 | 2>(null)
    const [timer, settimer] = useState(30)
    const currentQuestion =  questions[currentQuestionNumber]

    const handleVisibilityChange = () => {
        if (document.hidden) {
          console.log('Tab switched or browser minimized');
          setCurrentQuestionNumber(prevState => prevState+1)
        }
    }; 

    const handleBeforeUnload = (event:any) => {
        const userConfirmed = window.confirm('Are you sure you want to leave?');
        if (!userConfirmed) {
            event.preventDefault();
        }
    };

    useEffect(() => {        
        window.addEventListener('beforeunload', handleBeforeUnload);             
        document.addEventListener('visibilitychange', handleVisibilityChange);
      
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        console.log(typeof(optionSelected));
        console.log(currentQuestion.answer);        
        
        if(currentQuestion.answer === optionSelected){
            setscore(prevState => prevState+1)
        }
        setCurrentQuestionNumber(prevState => prevState+1)
    }

    useEffect(() => {
        const interval = setInterval(() => {
            settimer(prevState => prevState-1)
        },1000)

        return () => {
            clearInterval(interval)
        }
    },[])

    useEffect(() => {
        if(timer == 0){
            setCurrentQuestionNumber(prevState => prevState +1)
        }
    },[timer])


    useEffect(() => {
        let testPassed: null | boolean = null
        if(score == 8){
            testPassed = true
        } else if(currentQuestionNumber == 15){  
            testPassed = false
        }
        if(testPassed !== null){
            const putTestResults = async () => {
                const refreshToken = localStorage.getItem("refreshToken")
                const res = await axios.put(process.env.NEXT_PUBLIC_API_URL + "/user/details/testResults",{
                    refreshToken,testPassed
                })
                const data = await res.data
                router.push("/dashboard")   
            }
            putTestResults()
        }

        settimer(30)
    },[currentQuestionNumber,score])

  return (
    <main className='max-w-sreen overflow-x-hidden h-screen bg-slate-800 text-white'>
        <div className='flex max-w-screen w-full flex-wrap'>
            <img src="https://learner-license-application.s3.ap-south-1.amazonaws.com/17073740689841.jpg" className='w-[156px] h-[180px] p-1 border-b border-r'  alt="" />
            <div className='flex-grow border-b border-r flex justify-center items-center gap-y-1 flex-col py-4 border-slate-400'>
                <p className='font-semibold text-xl'>Name</p>
                <p className='text-lg opacity-90'>Pushkar</p>
            </div>
            <div className='flex-grow border-b border-r flex justify-center items-center gap-y-1 flex-col py-4 border-slate-400'>
                <p className='font-semibold text-xl'>Question</p>
                <p className='text-lg opacity-90'>{currentQuestionNumber+1}/15</p>
            </div>
            <div className='flex-grow border-b border-r flex justify-center items-center gap-y-1 flex-col py-4 border-slate-400'>
                <p className='font-semibold text-xl'>Time Remaining</p>
                <p className='text-lg opacity-90'>{timer}s</p>
            </div>
            <div className='flex-grow border-b border-r flex justify-center items-center gap-y-1 flex-col py-4 border-slate-400'>
                <p className='font-semibold text-xl'>Score</p>
                <p className='text-lg opacity-90'>{score}</p>
            </div>
        </div>

        {currentQuestion && <form className='mt-12 px-8 md:px-12'onSubmit={handleSubmit} >

                <div className='flex gap-x-2 md:gap-x-5 items-center mb-5 ml-2 md:ml-4'>
                    <p className='text-xl font-semibold '>{currentQuestion.question}</p>
                    <img src={"/licenseTestImages/" + currentQuestion.image} width="70" alt="" />
                </div>
                <div className='text-lg flex flex-col gap-y-3 mb-5'>
                    {currentQuestion.options.map((option: string, index: number) => {
                        return <div key={index} className='flex items-center gap-x-3 border border-slate-700 rounded-xl px-7 md:px-9 py-6 md:py-8'>
                            {/* @ts-ignore */}
                            <input type="radio" id={index+'-option'} name='option' value={index} onChange={(e) => setoptionSelected(parseInt(e.target.value))} />
                            <label htmlFor={index+'-option'} className=''>{option}</label>
                        </div>
                    })}
                </div>
                <Button type='submit' variant="contained" color="primary" className='bg-blue-600 rounded-lg' size="large">Next</Button>
        </form> }
    </main>
  )
}

export default Page