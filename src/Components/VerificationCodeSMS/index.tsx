import { CircularProgress, IconButton, Modal } from '@mui/material'
import React, { useEffect, useState, Dispatch } from 'react'
import Button from '../Button'
import ReactCodeInput from 'react-code-input'
import Input from '../Input'
import httpClient from '../../API'
import { useNavigate } from 'react-router'
import { useAuth } from '../../AuthContext'
import { IProject } from '../../types'
import axios from 'axios'
import { CloseRounded } from '@mui/icons-material'

export default function VerificationCodeSMS(props: { phoneNumber: string, signup: boolean, project: IProject | undefined, setWindowShow?: Dispatch<boolean> }) {

    const [code, setCode] = useState<string>("")
    const [mode, setMode] = useState<'phone' | 'verification'>('phone')
    const [open, setOpen] = useState<boolean>(true);
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [phoneLoading, setPhoneLoading] = useState<boolean>(false);

    const navigate = useNavigate();
    const user = useAuth();

    const handleClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        if (props.signup) {
            setMode('verification');
        }
    }, [props.signup])

    const sendCode = () => {
        setPhoneLoading(true);
        httpClient.post("/api/send_code", {
            phoneNumber: phoneNumber
        }).then(res => {
            setMode('verification');
        })
            .finally(() => setPhoneLoading(false))
    }

    const login = () => {
        setLoading(true);
        user.loginAction({
            phoneNumber: props.phoneNumber || phoneNumber,
            verificationCode: code,
            callback: (token: string) => {
                const formData = new FormData();
                if (props.project?.projectName) {
                    for (let [key, value] of Object.entries(props.project)) {
                        formData.append(key, value)
                    }

                    axios.post(process.env.REACT_APP_URL + "/api/projects", formData, {
                        headers: {
                            "Authorization": "Bearer " + token
                        }
                    }).then(res => {
                        navigate('/dashboard')
                    }).finally(() => setLoading(false))
                }
                else {
                    console.log(token);
                    setLoading(false)
                    navigate('/dashboard')
                }
            }
        })
    }

    if (mode == 'phone')
        return (
            <Modal open={open} onClose={handleClose}>
                <div className='flex h-screen items-center justify-center' dir='rtl'>
                    <div className='min-w-[576px] relative text-center py-[44px] text-[20px] px-[24px] font-bold text-primary rounded-[16px] bg-white'>
                        <div className='absolute right-2 top-2'>
                            <IconButton onClick={() => { if (props.setWindowShow) props.setWindowShow(false) }}>
                                <CloseRounded />
                            </IconButton>
                        </div>
                        <div className='text-[#737373] text-[14px]'>
                            کاربر گرامی اطلاعات خود را وارد کنید
                        </div>
                        <div className='w-full text-start mt-[32px]'>
                            <Input value={phoneNumber} onChange={(e) => setPhoneNumber(e.currentTarget.value)} label='شماره تماس خود  را وارد کنید' className='rounded-[8px] text-start' />
                        </div>
                        <Button onClick={sendCode} disabled={phoneLoading} variant='contained' className='rounded-[8px] w-full px-[98px] mt-[36px]'>
                            {
                                phoneLoading ?
                                    <CircularProgress size={"small"} sx={{ color: "white", width: "20px !important", height: "20px !important" }} />
                                    :
                                    "تایید شماره تماس"
                            }
                        </Button>
                    </div>
                </div>
            </Modal>
        )

    return (
        <Modal open={open} onClose={handleClose}>
            <div className='flex h-screen items-center justify-center' dir='rtl'>
                <div className='min-w-[576px] text-center relative py-[44px] text-[20px] px-[24px] font-bold text-primary rounded-[16px] bg-white'>
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
                    <Button disabled={loading} variant='contained' onClick={() => login()} className='rounded-[12px] px-[98px] mt-[36px]'>
                        {
                            loading ?
                                <CircularProgress size={"small"} sx={{ color: "white", width: "20px !important", height: "20px !important" }} />
                                :
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
