import React, { useState } from 'react'
import { Provider } from 'react-redux'
import { store } from '../lib/store'
import Header from '../Components/Header'
import Button from '../Components/Button'
import httpClient from '../API'
import { IProject } from '../types'

function ProjectCard({project} : {project : IProject}) {

    return (
        <div className='bg-[#FAF9F9] p-[24px] rounded-[16px] w-[30%] font-medium border border-[#E1E0E0]'>
            <div className='flex items-center justify-between'>
                <img src='/assets/building.png' className='w-[132px] h-[120px] object-cover rounded-[6px]' style={{ boxShadow: "0px 4px 4px 0px #00000040" }} />
                <div className='text-primary font-medium text-[18px]'>
                    {
                        project.projectName
                    }
                </div>
            </div>
            <div className='mt-[20px] text-primary text-end text-[12px]'>
                متراژ زمین: {project.projectLandSizeSpec}
            </div>
            <div className='flex justify-between'>
                <Button variant='contained' className='bg-[#01055B]'>
                    نمایش کامل پروژه
                </Button>
                <div className='text-primary text-[12px]'>
                    مهندس ناظر پروژه  : {project.supervisorEngineer}
                </div>
            </div>
        </div>
    )
}

export default function Projects() {
    
    const [projects, setProjects] = useState<IProject[]>([]);
    
    React.useEffect(() => {
        httpClient.get("/api/projects").then(res => {
            setProjects(res.data.data)
        })
    },[])
    
    return (
        <Provider store={store}>
            <Header />
            <div className='flex justify-center gap-x-[20px] gap-y-[20px] flex-wrap'>
                {
                    projects.map(p => (
                        <ProjectCard project={p} />
                    ))
                }
            </div>
        </Provider>
    )
}
