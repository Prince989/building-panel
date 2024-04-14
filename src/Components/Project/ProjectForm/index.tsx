import React, {Dispatch} from 'react'
import Input from '../../Input'
import { IProject } from '../../../types'

export default function ProjectForm({register} : {register : any}) {

    return (
        <div>
            <div className='text-primary font-bold text-[20px]'>
                مشخصات پروژه
            </div>
            <div className='mt-[40px] flex justify-between gap-[11px]'>
                <Input rest={{...register("projectName", { maxLength: 30 })}}  label='نام پروژه' fullWidth />
                <Input rest={{...register("projectNumber", { maxLength: 30 })}}  label='شماره پروژه' fullWidth />
                <Input rest={{...register("projectLicense", { maxLength: 30 })}}  label='شماره جواز' fullWidth />
                <Input rest={{...register("projectPlace", { maxLength: 30 })}}  label='محل پروژه' fullWidth />
            </div>
            <div className='mt-[24px] flex justify-between gap-[11px]'>
                <Input rest={{...register("projectTime", { maxLength: 30 })}}  label='مدت انجام پروژه' fullWidth />
                <Input rest={{...register("supervisorEngineer", { maxLength: 30 })}}  label='مهندس ناظر پروژه' fullWidth />
                <Input rest={{...register("engineeringSystemNumber", { maxLength: 30 })}}  label='شماره نظام مهندسی' fullWidth />
                <Input rest={{...register("postalCode", { maxLength: 30 })}}  label='کدپستی' fullWidth />
            </div>
        </div>
    )
}
