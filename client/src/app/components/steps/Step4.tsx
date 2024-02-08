import { Button } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState, MouseEvent } from 'react'
import {useRouter} from "next/navigation"

const Step4 = () => {
  const [feesObj, setFeesObj] = useState<{[key:string]:number}>({})
  const [total, setTotal] = useState(0)

  const router = useRouter()

  useEffect(() => {
    fetchFees()
  },[])

  const fetchFees = async () => {
    const refreshToken = localStorage.getItem("refreshToken")
    
    const res = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/user/details/fees?refreshToken="+refreshToken)
    const data = await res.data
    console.log(data);    

    if(data.success){
      setFeesObj(data.fees)
      setTotal(data.total)
    }
  }

  async function getPaymentLink(event: MouseEvent<HTMLDivElement>): Promise<void> {
    const refreshToken = localStorage.getItem("refreshToken")
    const res = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/stripe/create-checkout-session",{
      refreshToken, amount:total
    })
    const data = await res.data
    console.log(data);

    if(data.success){
      router.push(data.paymentLink)
    }    
  }

  return (
    <>
        <p className='text-xl font-semibold'>Fee Payment</p>

        <div className='ml-2 mt-6'>
          <table className='border border-slate-600 my-5 '>
            <tbody>
              <tr className='border-b border-slate-600'>
                <th className='font-medium border-r px-4 py-3 text-center border-slate-600'>S.No</th>
                <th className='font-medium border-r px-4 py-3 text-center border-slate-600'>Item</th>
                <th className='font-medium border-r px-4 py-3 text-center border-slate-600'>Amount</th>
              </tr>
            </tbody>
            <tbody>
              {Object.keys(feesObj).map((item:string , index: number) => {
                return <tr className='border-b border-slate-600' key={index}>
                <td className='opacity-85 border-r px-4 py-3 text-center border-slate-600'>{index + 1}</td>
                <td className='opacity-85 border-r px-4 py-3 text-center border-slate-600'>{item}</td>
                <td className='opacity-85 border-r px-4 py-3 text-center border-slate-600'>{feesObj[item]}</td>
              </tr>
              })}
            </tbody>
            <tfoot>
              <tr>
                <td className='opacity-85 border-r px-4 py-3 text-center border-slate-600' ></td>
                <td className='opacity-85 border-r px-4 py-3 text-center border-slate-600'>Total: </td >
                <td className='opacity-85 border-r px-4 py-3 text-center border-slate-600' >{total}</td>
              </tr>
            </tfoot>
          </table>
          <div className='flex gap-x-3 items-center'>
            <span className='text-lg'>Click the button to complete fee payment: </span>
            <div onClick={getPaymentLink} >
              <Button variant="contained" color="primary" className='bg-blue-600 rounded-lg normal-case' size="medium">Pay Now</Button>
            </div>
          </div>

          <div className='mt-2 flex justify-between w-full md:w-36 lg:w-96'>
                <Button variant="contained" color="success" className='mt-5 bg-green-500 rounded-lg px-5' size="medium">
                    Back
                </Button>
            </div>
        </div>
    </>
  )
}

export default Step4