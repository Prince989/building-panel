import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant: "contained" | "outlined",
    children: any
}

export default function Button(props: ButtonProps) {
    const temp = props.variant == "contained" ? " bg-[#01055B] text-white" : " border-[#01055B] text-[#01055B]"
    const className = "p-[16px] text-[12px] shadow-lg rounded-[45px] " +  props.className + temp;

    return (
        <button {...props} className={className}>
            {props.children}
        </button>
    )

}
