import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  fullWidth? : boolean
  rest? : any
}

export default function Input(props: InputProps) {

  const {rest} = props;

  const className = "rounded-[49px] px-[18px] py-[14px] focus:outline-none " + (!props.value ? "border-[#00000033] border placeholder:text-[#00000033] bg-transparent " : "bg-primary text-white ") + props.className;

  return (
    <div className={'flex flex-col ' + (props.fullWidth ? "w-full" : "")} dir='rtl'>
      <label className='font-medium text-[16px] text-[#1C1C1C]'>
        {props.label}
      </label>
      <input {...props} {...rest} placeholder={props.label} className={className} />
    </div>
  )
}
