import { Avatar, ListItemIcon, Menu, MenuItem } from '@mui/material'
import React from 'react'
import { useAuth } from '../../AuthContext'
import { IUser } from '../../types';
import httpClient from '../../API';

export default function ProfileAvatar() {

    const [user, setUser] = React.useState<IUser>();

    React.useEffect(() => {
        httpClient.get("/api/user/profile").then(res => {
            setUser(res.data.data);
        })
    }, [])

    return (
        <div className='flex items-center gap-[16px] justify-center'>
            <div className='text-end'>
                <h1 className="text-primary font-bold">
                    {
                        user?.name
                    }
                </h1>
                <h2 className='text-[#000000A3] text-[14px]'>
                    کارفرما
                </h2>
            </div>

            <Avatar alt="Admin" src={user?.image}>
                {
                    user?.name.slice(0, 1)
                }
            </Avatar>
        </div>
    )
}
