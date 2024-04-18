import { InventoryRounded, PersonRounded } from "@mui/icons-material";
import { useState } from "react";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { useSelector } from "react-redux";
import { RootState } from "../../../lib/store";
import ProfileAvatar from "../../ProfileAvatar";
import { useAuth } from "../../../AuthContext";
import ProviderMenu from "./Provider";

interface IListItem {
    children: any
    icon: any
    handleClick: () => void
    selected?: boolean
}

export function ListItem({ children, handleClick, icon, selected = false }: IListItem) {

    return (
        <li
            onClick={handleClick}
            className={"flex text-[#000000A3] justify-end font-medium transition-color rounded-r-[30px] p-[11px] cursor-pointer ease-in duration-300 gap-3 items-center "
                + (selected ? "bg-white" : "")}>
            <span>
                {children}
            </span>
            <span className={"lg:text-[17px] sm:text-[20px] xs:text-[20px]  transition-color ease-in duration-300 " + (selected ? "!text-primary" : "")}>
                {icon}
            </span>
        </li>
    )
}

export default function DashboardMenu() {

    const responsiveShowMenu = useSelector((state: RootState) => state.GlobalSlice.responsiveMenuShow);

    const [selectedTab, setSelectedTab] = useState<number>(0);

    const handleClick = (num: number) => {
        setSelectedTab(num)
    }

    const auth = useAuth();

    return (
        <div className={'lg:w-3/12 pt-[43px] relative z-50 lg:static sm:fixed xs:fixed sm:w-4/12 xs:w-1/2 min-h-screen transition-all duration-300 ease-out bg-[#EFEFEF] lg:translate-x-0 sm:-translate-x-full xs:-translate-x-full ' + (responsiveShowMenu ? " sm:!translate-x-0 xs:!translate-x-0" : "")} >
            <ProfileAvatar />
            {
                auth.user?.roleId == 3 ?
                    <ProviderMenu selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
                    :
                    auth.user?.roleId == 1 || auth.user?.roleId == 2 ?
                        <ul className="mt-[28px] pr-[70px]">
                            <ListItem handleClick={() => handleClick(0)} selected={selectedTab == 0} icon={<img src='/assets/pie-chart.svg' className="w-[24px] h-[24px]" />}>
                                پروژه ها
                            </ListItem>
                            <ListItem handleClick={() => handleClick(0)} selected={selectedTab == 1} icon={<img src='/assets/pie-chart.svg' className="w-[24px] h-[24px]" />}>
                                افزودن پروژه
                            </ListItem>
                        </ul>
                        :
                        ""
            }
            <button onClick={() => auth.logOut()} className="absolute text-[#000000A3] flex gap-x-[10px] right-1/2 translate-x-1/2 bottom-[28px]">
                <span>
                    خروج از حساب
                </span>
                <img src='/assets/logout.svg' className="w-[24px] h-[24px] object-contain" />
            </button>
        </div>
    )
}
