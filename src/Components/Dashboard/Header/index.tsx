import { IconButton } from '@mui/material'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { Dispatch } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setResponsiveMenuShow } from '../../../lib/features/global';
import { RootState } from '../../../lib/store';
import ProfileAvatar from '../../ProfileAvatar';

export default function Header() {

    const dispatch = useDispatch();

    const menuShow = useSelector((state: RootState) => state.GlobalSlice.responsiveMenuShow);

    const toggleMenu = () => {
        dispatch(setResponsiveMenuShow(!menuShow));
    }

    return (
        <div className='bg-white gap-[171px] text-[#000000A3] flex flex-row-reverse justify-start h-24 w-full lg:px-10 sm:px-4 xs:px-4 py-3'>
            <div className='flex items-center gap-[40px] flex-row-reverse'>
                <span className='font-semibold text-[16px]'>
                    صفحه اصلی
                </span>
                <a href='/projects'>
                    <span className='font-semibold text-[16px]'>
                        پروژه ها
                    </span>
                </a>
                <a href='/store'>
                    <span className='font-semibold text-[16px]'>
                        فروشگاه
                    </span>
                </a>
                <a href='/suppliers'>
                    <span className='font-semibold text-[16px]'>
                        پیمانکاران
                    </span>
                </a>
                <a href='/contactors'>
                    <span className='font-semibold text-[16px]'>
                        تامین کنندگان
                    </span>
                </a>
                <a href='/dashboard'>
                    <span className='font-semibold text-[16px]'>
                        پنل کاربری
                    </span>
                </a>
            </div>
        </div>
    )
}
