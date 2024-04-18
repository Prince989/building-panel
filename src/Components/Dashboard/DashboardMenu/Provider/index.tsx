import {Dispatch} from 'react'
import { ListItem } from '..'
import { useDispatch } from 'react-redux'
import { setAddProducts, setShowProducts } from '../../../../lib/features/provider';

export default function ProviderMenu({
    selectedTab,
    setSelectedTab
} : {
    selectedTab : number,
    setSelectedTab : Dispatch<number>
}) {

    const dispatch = useDispatch();

    const handleClick = (num: number) => {
        setSelectedTab(num)
        if(num == 0){
            dispatch(setAddProducts(false));
            dispatch(setShowProducts(true));
        }
        else if(num == 1){
            dispatch(setAddProducts(true));
            dispatch(setShowProducts(false));
        }
    }

    return (
        <div>
            <ul className="mt-[28px] pr-[70px]">
                <ListItem handleClick={() => handleClick(0)} selected={selectedTab == 0} icon={<img src='/assets/pie-chart.svg' className="w-[24px] h-[24px]" />}>
                    محصولات
                </ListItem>
                <ListItem handleClick={() => handleClick(1)} selected={selectedTab == 1} icon={<img src='/assets/pie-chart.svg' className="w-[24px] h-[24px]" />}>
                    افزودن محصول
                </ListItem>
            </ul>
        </div>
    )
}
