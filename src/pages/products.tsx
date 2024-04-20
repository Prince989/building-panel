import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';

import React, { useState } from 'react'
import { useParams } from 'react-router'
import httpClient from '../API';
import { IProduct } from '../types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Header from '../Components/Header';


const MultiTab = ({ product }: { product: IProduct }) => {

    const [selected, setSelected] = useState<number>(0)

    return (
        <div className='mt-[192px]'>
            <div className='grid grid-cols-2'>
                <button onClick={() => setSelected(0)} className={"pb-2 " + (selected == 0 ? "text-primary border-b-2 border-primary" : "text-[#212121] border-b-2 border-[#EEEEEE]")}>
                    نظرات
                </button>
                <button onClick={() => setSelected(1)} className={"pb-2 " + (selected == 1 ? "text-primary border-b-2 border-primary" : "text-[#212121] border-b-2 border-[#EEEEEE]")}>
                    مشخصات
                </button>
            </div>
            <div className='text-[#616161] text-right'>
                <div className='grid grid-cols-2 gap-[48px]'>
                    <div className="border-b  py-[15px]">
                        برند:
                        {product.productBrand}
                    </div>
                    <div className="border-b  py-[15px]">
                        نام:
                        {product.productName}
                    </div>
                </div>
                <div dir='rtl' className='py-[16px]'>
                    توضیحات:
                    <br />
                    {product.productDesc}
                </div>
            </div>
        </div>
    )
}

export default function Products() {

    const { id } = useParams();
    const [product, setProduct] = React.useState<IProduct>();

    const getProducts = () => {
        httpClient.get('/api/product').then(res => {
            setProduct(res.data.data.filter((p: IProduct) => p.id.toString() == id)?.[0]);
        })
    }

    React.useEffect(() => {
        if (id) {
            getProducts();
        }
    }, [id])

    if (!product)
        return <></>

    return (
        <>
            <Header />
            <div className='px-[70px] py-[100px] gap-[78px] grid grid-cols-2'>
                <div className='text-primary font-medium'>
                    <div className='flex font-semibold justify-between'>
                        <div className=''>
                            قیمت:
                            {product.productPrice}
                            &nbsp;تومان
                        </div>
                        <div className=''>
                            {product.productName}
                        </div>
                    </div>
                    <MultiTab product={product} />
                </div>
                <div className='relative p-10 w-full rounded-[16px] h-[483px] bg-[#F5F5F5]'>
                    <Swiper
                        slidesPerView={1}
                        loop
                        autoplay
                        // navigation
                        pagination
                        modules={[Navigation, Pagination]}
                    >
                        {
                            product?.images && product?.images.map(i => (
                                <SwiperSlide>
                                    <div className='flex items-center justify-center'>
                                        <img src={process.env.REACT_APP_URL + i} className='rounded-[16px]' />
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
            </div>
        </>
    )
}
