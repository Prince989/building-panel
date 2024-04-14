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
import { useForm } from 'react-hook-form'
import httpClient from '../API'
import { IProject } from '../types'


const DatePickerInput = (props: { label: string, setValue: any }) => {

    return (
        <div className={'flex flex-col w-full'} dir='rtl'>
            <label className='font-medium text-[16px] text-[#1C1C1C]'>
                {props.label}
            </label>
            <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
                <DatePicker
                    onChange={(e) => props.setValue("birthDate", e?.toISOString())}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "49px",
                            width: "100%"
                        }
                    }} />
            </LocalizationProvider>
        </div>
    )
}

export default function SignUp() {

    const [openWindow, setOpenWindow] = useState<boolean>(false)
    const [file, setFile] = useState<File | null>(null);
    const navigate = useNavigate();

    const [project, setProject] = useState<IProject>();

    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm()


    const onSubmit = (data: any) => {

        const formData = new FormData();
        console.log(data);
        for (let [key, value] of Object.entries(data)) {
            // @ts-ignore
            formData.append(key, value?.toString())
        }

        setProject({
            projectName: data.projectName,
            projectNumber: data.projectNumber,
            projectLicense: data.projectLicense,
            projectPlace: data.projectPlace,
            projectTime: data.projectTime,
            supervisorEngineer: data.supervisorEngineer,
            engineeringSystemNumber: data.engineeringSystemNumber,
            postalCode: data.postalCode,
            floorsCount: "0",
            projectDesc: "Lorem Ipsum",
            projectLandSizeSpec: "20",
            residentalUnitCount: "54",
            businessUnitCount: "22",
            isActive : true,
            projectStart : "5465464",
            projectEnd : "3131366"
        })

        formData.append("roleId", "1");

        if (file)
            formData.append("image", file)
        httpClient.post("/api/sign_up", formData).then(res => {
            console.log(res.data);
            sendCode(data.phoneNumber);
        })
    }

    const sendCode = (phoneNumber: string) => {
        httpClient.post("/api/send_code", { phoneNumber: phoneNumber }).then(res => {
            setOpenWindow(true);
        })
    }

    const handleImageUpload = (evt: any) => {
        const file = evt?.target?.files[0]
        if (file) {
            setFile(file);
        }
    }

    return (
        <div>
            <Header />
            <div className='px-[70px]'>
                <div className='flex border-b border-[#E0E0E0] pb-[7px] w-full'>
                    <div className='w-1/2 flex justify-center border-r border-[#00000033]'>
                        <Button onClick={() => navigate('/auth/login')} className='px-[113px] py-[4px] shadow-none border-primary border text-[28px]' variant='outlined'>
                            ورود
                        </Button>
                    </div>
                    <div className='w-1/2 flex justify-center'>
                        <Button onClick={() => setOpenWindow(true)} className='px-[113px] py-[4px] shadow-none text-[28px]' variant='contained'>
                            ثبت نام
                        </Button>
                    </div>
                </div>
                <div className='mt-[48px] flex justify-between flex-row-reverse gap-[11px]'>
                    <Input label='نام و نام خانوادگی' rest={{ ...register("name", { maxLength: 30 }) }} fullWidth />
                    <Input label='ایمیل' rest={{ ...register("email", { maxLength: 30 }) }} fullWidth />
                    <Input label='شماره تماس' rest={{ ...register("phoneNumber", { maxLength: 30 }) }} fullWidth />
                    <DatePickerInput setValue={setValue} label='تاریخ تولد' />
                </div>
                {/*                 <div className='mt-[46px] font-medium text-end'>
                    نوع حساب کاربری خود را مشخص کنید
                </div>
                <div className='flex gap-[34px] justify-end mt-[12px]'>
                    <input type='radio' />
                    <input type='radio' />
                    <input type='radio' />
                    <input type='radio' />
                </div> */}
                <div className='p-[32px] mb-[44px] pb-[109px] w-full rounded-[14px] mt-[32px]' dir='rtl' style={{ boxShadow: "0px 15px 50px -5px #00000026" }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='text-primary'>
                            {
                                watch("name")
                            }&nbsp;
                            عزیز!
                        </div>
                        <div className='font-medium'>
                            حساب کاربری شما به عنوان <span className='text-primary'>
                                کارفرما
                            </span>&nbsp;
                            در حال شکل گیری میباشد، لطفا اطلاعات زیر را تکمیل نمایید .
                        </div>
                        <div className='mt-[40px] flex justify-between gap-[11px]'>
                            <Input rest={{ ...register("nationalId", { maxLength: 30 }) }} label='شماره ملی' fullWidth />
                            <Input rest={{ ...register("shenasNameId", { maxLength: 30 }) }} label='شماره شناسنامه' fullWidth />
                            <Input rest={{ ...register("shansNameSeries", { maxLength: 30 }) }} label='سریال شناسنامه' fullWidth />
                            <Input rest={{ ...register("shansNameRegister", { maxLength: 30 }) }} label='محل صدور شناسنامه' fullWidth />
                        </div>
                        <div className='mt-[24px] flex justify-between gap-[11px]'>
                            <Input rest={{ ...register("brithPlace", { maxLength: 30 }) }} label='محل تولد' fullWidth />
                            <Input rest={{ ...register("livingCity", { maxLength: 30 }) }} label='محل سکونت' fullWidth />
                            <Input rest={{ ...register("occupation", { maxLength: 30 }) }} label='شغل' fullWidth />
                            <Input rest={{ ...register("education", { maxLength: 30 }) }} label='تحصیلات' fullWidth />
                        </div>
                        <div className='flex border-b w-full pb-[24px] gap-[8px] mt-[24px]'>
                            <div className='ml-[6px]'>
                                جنسیت:
                            </div>
                            <input type='radio' value="female" {...register("gender", { maxLength: 30 })} name="gender" />
                            <label>
                                خانم
                            </label>
                            <input type='radio' value="male" {...register("gender", { maxLength: 30 })} name="gender" />
                            <label>
                                آقا
                            </label>
                        </div>
                        <div className='text-primary mt-[16px] font-bold text-[20px]'>
                            افزودن عکس پروفایل
                        </div>
                        <input type="file" onChange={handleImageUpload} id="gallery-image" accept="image/png, image/jpeg, image/gif" className="hidden" />
                        <label htmlFor="gallery-image" className='flex p-5 cursor-pointer'>
                            <img src='/assets/image-picker.svg' />
                        </label>

                        <ProjectForm register={register} />

                        <div className='mt-[88px]'>
                            <div className='text-primary font-bold text-center'>
                                کاربر گرامی در صورت اطمینان از صحت اطلاعات، ثبت نهایی را انجام و کد ارسال شده را وارد کنید
                            </div>
                            <div className='flex mt-[20px] pb-[7px] w-full gap-[20px] justify-center'>
                                <div className='w-1/2 flex justify-end'>
                                    <Button type='submit' className='px-[50px] py-[8px] shadow-none text-[20px]' variant='contained'>
                                        ثبت نهایی
                                    </Button>
                                </div>
                                <div className='w-1/2 flex justify-start'>
                                    <Button className='px-[50px] py-[8px] shadow-none border-primary border text-[20px]' variant='outlined'>
                                        لغو درخواست
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            {
                openWindow &&
                <VerificationCodeSMS phoneNumber={watch("phoneNumber")} signup={true} project={project} />
            }
        </div>
    )
}
