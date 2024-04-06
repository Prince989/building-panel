import React from 'react'
import Header from '../Components/Header'
import { Provider } from 'react-redux'
import { store } from '../lib/store';
import Button from '../Components/Button';

function ContactorCard() {

    return (
        <div className='bg-[#FAF9F9] w-full mb-[32px] rounded-[16px] flex flex-row-reverse'>
            <img src='/assets/building.png' className='rounded-r-[16px] w-[194px] h-[211px] object-cover' />
            <div className='text-right text-[#01055B] mt-[24px] px-[24px] '>
                <h2 className='text-[21px] font-medium'>
                    شرکت پیمانکاری نوین سازه البرز
                </h2>
                <p className='mt-[16px] text-[14px]'>
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت .
                </p>
                <Button variant='contained' className='mr-auto block'>
                    نمایش مشخصات
                </Button>
            </div>
        </div>
    )
}

export default function Contactor() {
    return (

        <Provider store={store}>
            <Header />
            <div className='flex justify-center'>
                <div className="w-[1300px] h-36">
                    <ContactorCard />
                    <ContactorCard />
                    <ContactorCard />
                    <ContactorCard />
                </div>
            </div>
        </Provider>
    )
}
