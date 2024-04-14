import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant: "contained" | "outlined",
    children: any
}

export default function Button(props: ButtonProps) {
    const temp = props.variant == "contained" ? " bg-primary text-white" : " border-primary text-primary"
    const className = "p-[16px] text-[12px] shadow-lg rounded-[45px] " +  props.className + temp;

    return (
        <button {...props} className={className}>
            {props.children}
        </button>
    )

}
