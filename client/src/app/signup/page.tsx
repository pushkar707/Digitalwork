"use client"
import { Checkbox, FormControlLabel, Button, capitalize } from '@mui/material';
import SignInWithButton from '../components/buttons/SignInWithButton';
import { githubSignIn, googleSignIn } from '../utils/firebaseConfig';
import { FormEvent, useState } from 'react';
import axios from 'axios';

export default function Home() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()
    if(!email.length || !password.length || !confirmPassword.length || !process.env.NEXT_PUBLIC_API_URL)
      return

    if(password != confirmPassword)
      return

    const res = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/register",{
      email,password,isFirebaseAuth:false
    })
    const data = await res.data
    console.log(data);
    
    if(data.success){
      localStorage.setItem("refreshToken",data.refreshToken)
      window.location.href = "/dashboard"
    }   
  }

  return (
    <main className=" flex min-h-screen flex-col w-screen items-center justify-center px-10 py-10 md:py-20 bg-slate-800">
      <div className="rounded overflow-hidden w-full h-full md:w-4/5 xl:w-2/3 flex flex-grow">
        <div className="hidden md:flex bg-slate-400 text-black px-5 xl:px-10 justify-center gap-4 lg:gap-5 flex-col max-w-[45%]">
          <p className="text-2xl lg:text-3xl font-bold">Learner's Licensing System</p>
          <hr className="h-2 rounded-xl border-none bg-slate-800 w-2/5" />
          <p className="xl:text-lg">Please sign up to create your learner's license.</p>
        </div>

        <div className="bg-white flex-grow flex justify-center flex-col px-5 xl:px-10">
          <div className='flex gap-y-3 flex-col'>
            <SignInWithButton onClick={githubSignIn} iconSvg='<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 30 30">
                                          <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
                                      </svg>' 
              text='Sign Up with Github' /> 
            <SignInWithButton onClick={googleSignIn} iconSvg='<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
                                          <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                        </svg>' 
              text='Sign Up with Google' /> 

          </div>
          <div>
            <div className='flex items-center my-3'>
              <hr className='flex-grow border-slate-400' /><span className='mx-1'>or</span><hr className='flex-grow border-slate-400' />
            </div>
          </div>
          <form className="gap-y-3 flex flex-col" onSubmit={handleSubmit}>
            {/* <input type="text" placeholder="Name" className="border text-sm xl:text-base border-slate-300 px-3 py-2 w-full" /> */}
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" className="border text-sm xl:text-base border-slate-300 px-3 py-2 w-full" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="border text-sm xl:text-base border-slate-300 px-3 py-2 w-full" />
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" className="border text-sm xl:text-base border-slate-300 px-3 py-2 w-full" />
            <FormControlLabel
              control={<Checkbox id="keep_signed_in" color="primary" />}
              label="Remember me"
              className='-my-1'
            />
            <Button type='submit' variant="contained" color="primary" className='bg-blue-600' fullWidth size="large">
              Sign Up
            </Button>
          </form>
          <p className='text-center mt-5' >Already a user? <a href="/" className='font-bold'>Sign in.</a></p>
        </div>
      </div>
    </main>
  );
}
