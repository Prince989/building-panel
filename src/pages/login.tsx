import React, { useState } from 'react'
import Header from '../Components/Header'
import Button from '../Components/Button'
import Input from '../Components/Input'
import ProjectForm from '../Components/Project/ProjectForm'
import VerificationCodeSMS from '../Components/VerificationCodeSMS'
import { AdapterDateFnsJalali } from '@mui/x-date-pickers/AdapterDateFnsJalali';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ThemeProvider } from '@mui/material'
import { useNavigate } from 'react-router'

export default function Login() {

    const [openWindow, setOpenWindow] = useState<boolean>(false)

    const navigate = useNavigate();

    return (
        <div>
            <Header />
            <div className='px-[70px]'>
                <div className='flex border-b border-[#E0E0E0] pb-[7px] w-full'>
                    <div className='w-1/2 flex justify-center border-r border-[#00000033]'>
                        <Button onClick={() => setOpenWindow(true)} className='px-[113px] py-[4px] shadow-none border-primary border text-[28px]' variant='outlined'>
                            ورود
                        </Button>
                    </div>
                    <div className='w-1/2 flex justify-center'>
                        <Button onClick={() => navigate('/auth/sign-up')} className='px-[113px] py-[4px] shadow-none text-[28px]' variant='contained'>
                            ثبت نام
                        </Button>
                    </div>
                </div>
            </div>
            {
                openWindow &&
                <VerificationCodeSMS phoneNumber='' signup={false} project={undefined} setWindowShow={setOpenWindow} />
            }
        </div>
    )
}
