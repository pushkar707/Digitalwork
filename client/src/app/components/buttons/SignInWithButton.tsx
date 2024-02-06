import React, { MouseEventHandler } from 'react'
import parse from "html-react-parser"

const SignInWithButton = ({iconSvg,text,onClick}:{iconSvg:string,text:string,onClick:MouseEventHandler}) => {
  return (
    <button onClick={onClick} className='flex gap-x-3 border border-slate-300 w-full justify-between p-2 px-3 rounded-3xl'>
      {parse(iconSvg)}
      <span className='ml-[10%] font-semibold lg:ml-[23%] flex-grow text-left'>{text}</span>
    </button>
  )
}

export default SignInWithButton