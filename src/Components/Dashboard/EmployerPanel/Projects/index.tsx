import React, { useState, Dispatch } from 'react'
import ProjectForm from '../../../Project/ProjectForm'
import { useForm } from 'react-hook-form'
import { Button, Modal } from '@mui/material'
import { IProject } from '../../../../types'
import httpClient from '../../../../API'

function ProjectCard({ project }: { project: IProject }) {

    return (
        <div className='border border-[#E3E3E3] w-[29%] rounded-[16px]  pb-[8px]'>
            <img src='/assets/dummy-project.png' className='w-[330px] h-[250px] object-cover' />
            <div className='px-[16px]'>
                <div className='flex mt-[6px] font-medium text-[16px] text-primary justify-between'>
                    <span>
                        {
                            project.projectPlace
                        }
                    </span>
                    <span>
                        {
                            project.projectName
                        }
                    </span>
                </div>
                <div className='mt-[6px] text-[#000000A3] text-[12px] text-end'>
                    {
                        project.projectDesc
                    }
                </div>
            </div>
        </div>
    )
}

function ProjectAdd({ setOpen }: { setOpen: Dispatch<boolean> }) {

    return (
        <div onClick={() => setOpen(true)} className='border cursor-pointer flex items-center justify-center h-[310px] border-[#E3E3E3] w-[29%] rounded-[16px] px-[16px] pb-[8px]'>
            <div className='flex items-center text-primary font-medium gap-x-[4.44px] flex-row-reverse'>
                <div className='flex text-white bg-primary rounded-full w-[20px] h-[20px] font-semibold leading-[15px] items-center justify-center'>
                    +
                </div>
                <div>
                    افزودن پروژه جدید
                </div>
            </div>
        </div>
    )
}

export default function Projects() {

    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm()

    const [open, setOpen] = useState<boolean>(false);
    const [projects, setProjects] = useState<IProject[]>([]);

    const handleClose = () => {
        setOpen(false)
    }

    React.useEffect(() => {
        getProjects();
    }, [])

    const getProjects = () => {
        httpClient.get("/api/projects").then(res => {
            setProjects(res.data.data)
        })
    }

    const submitProject = (data: any) => {
        const d: IProject = {
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
        }

        const formData = new FormData();
        for (let [key, value] of Object.entries(d)) {
            formData.append(key, value)
        }

        httpClient.post("/api/projects", formData).then(res => {
            getProjects();
        }).finally(() => {
            setOpen(false)
        })
    }


    return (
        <div className='p-[24px]'>
            <div className='flex flex-wrap w-full justify-center gap-x-[24px] gap-y-[25px]'>
                {
                    projects.map(p => (
                        <ProjectCard project={p} />
                    ))
                }
                <ProjectAdd setOpen={setOpen} />
            </div>

            <Modal open={open} onClose={handleClose}>
                <>
                    <form onSubmit={handleSubmit(submitProject)}>
                        <div className='flex h-screen items-center justify-center' dir='rtl'>
                            <div className='min-w-[576px] text-start py-[44px] px-[24px] font-bold text-primary rounded-[16px] bg-white'>
                                <ProjectForm register={register} />

                                <div className='flex mt-[20px] pb-[7px] w-full gap-[20px] justify-center'>
                                    <div className='w-1/2 flex justify-end'>
                                        <Button type='submit' className='px-[50px] py-[8px] shadow-none text-[20px]' variant='contained'>
                                            ثبت نهایی
                                        </Button>
                                    </div>
                                    <div className='w-1/2 flex justify-start'>
                                        <Button onClick={() => setOpen(false)} className='px-[50px] py-[8px] shadow-none border-primary border text-[20px]' variant='outlined'>
                                            لغو درخواست
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </>
            </Modal>
        </div>
    )
}
