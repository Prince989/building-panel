import { IconButton } from '@mui/material'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { Dispatch } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setResponsiveMenuShow } from '../../lib/features/global';
import { RootState } from '../../lib/store';
import ProfileAvatar from '../ProfileAvatar';

export default function Header() {

    const dispatch = useDispatch();

    const menuShow = useSelector((state: RootState) => state.GlobalSlice.responsiveMenuShow);

    const toggleMenu = () => {
        dispatch(setResponsiveMenuShow(!menuShow));
    }

    return (
        <div className='bg-white gap-[171px] text-[#000000A3] flex flex-row-reverse justify-start h-24 w-full lg:px-10 sm:px-4 xs:px-4 py-3'>
            <a href="/" className='focus:outline-none'>
                <img src="/logo.svg" className='w-14 h-14 object-contain' />
            </a>
            <div className='flex items-center gap-[40px] flex-row-reverse'>
                <span className='font-semibold text-[16px]'>
                    صفحه اصلی
                </span>
                <span className='font-semibold text-[16px]'>
                    پروژه ها
                </span>
                <span className='font-semibold text-[16px]'>
                    پیمانکاران
                </span>
                <span className='font-semibold text-[16px]'>
                    تامین کنندگان
                </span>
                <span className='font-semibold text-[16px]'>
                    پنل کاربری
                </span>
            </div>
        </div>
    )
}
