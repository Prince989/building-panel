import { Modal } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Button from '../Button'
import ReactCodeInput from 'react-code-input'
import Input from '../Input'
import httpClient from '../../API'
import { useNavigate } from 'react-router'
import { useAuth } from '../../AuthContext'
import { IProject } from '../../types'

export default function VerificationCodeSMS(props: { phoneNumber: string, signup: boolean, project: IProject | undefined }) {

    const [code, setCode] = useState<string>("")
    const [mode, setMode] = useState<'phone' | 'verification'>('phone')
    const [open, setOpen] = useState<boolean>(true);
    const [phoneNumber, setPhoneNumber] = useState<string>("");

    const navigate = useNavigate();
    const user = useAuth();

    const handleClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        if(props.signup){
            setMode('verification');
        }
    },[props.signup])

    const sendCode = () => {
        httpClient.post("/api/send_code", {
            phoneNumber: phoneNumber
        }).then(res => {
            setMode('verification');
        })
    }

    const login = () => {
        user.loginAction({
            phoneNumber: props.phoneNumber || phoneNumber,
            verificationCode: code,
            callback: () => {
                const formData = new FormData();
                if (props.project) {
                    for (let [key, value] of Object.entries(props.project)) {
                        formData.append(key,value)
                    }

                    httpClient.post("/api/projects", formData).then(res => {
                        navigate('/dashboard')
                    })
                }
                else{
                    navigate('/dashboard')
                }
            }
        })
    }

    if (mode == 'phone')
        return (
            <Modal open={open} onClose={handleClose}>
                <div className='flex h-screen items-center justify-center' dir='rtl'>
                    <div className='min-w-[576px] text-center py-[44px] text-[20px] px-[24px] font-bold text-primary rounded-[16px] bg-white'>
                        <div className='text-[#737373] text-[14px]'>
                            کاربر گرامی اطلاعات خود را وارد کنید
                        </div>
                        <div className='w-full text-start mt-[32px]'>
                            <Input value={phoneNumber} onChange={(e) => setPhoneNumber(e.currentTarget.value)} label='شماره تماس خود  را وارد کنید' className='rounded-[8px] text-start' />
                        </div>
                        <Button onClick={sendCode} variant='contained' className='rounded-[8px] w-full px-[98px] mt-[36px]'>
                            تایید شماره تماس
                        </Button>
                    </div>
                </div>
            </Modal>
        )

    return (
        <Modal open={open} onClose={handleClose}>
            <div className='flex h-screen items-center justify-center' dir='rtl'>
                <div className='min-w-[576px] text-center py-[44px] text-[20px] px-[24px] font-bold text-primary rounded-[16px] bg-white'>
                    <div>
                        کاربر گرامی!
                    </div>
                    <div className='pb-[8px] border-[#E4E4E4] border-b'>
                        رمز 4 رقمی ارسال شده به شماره {props.phoneNumber} را وارد نمایید.
                    </div>
                    <div className='w-full'>
                        <ReactCodeInput
                            inputMode='numeric'
                            value={code}
                            style={{ direction: "ltr" }}
                            onChange={(e) => {
                                setCode(e.toString())
                            }} name='code' fields={4} />
                    </div>
                    <Button variant='contained' onClick={() => login()} className='rounded-[12px] px-[98px] mt-[36px]'>
                        {
                            props.signup ?
                                "تکمیل ثبت نام"
                                :
                                "ورود"
                        }
                    </Button>
                </div>
            </div>
        </Modal>
    )
}
