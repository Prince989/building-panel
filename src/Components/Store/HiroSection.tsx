import React from 'react'
import Button from '../Button'

export default function HiroSection() {
  return (
    <div dir='rtl' className='h-[479px] bg-[#D2C9C0] pr-[88px] pt-[107px] w-full relative'>
      <img src='/assets/dummy-2.png' className='absolute h-full left-0 bottom-0 z-[50]' />
      <h1 className='text-[48px] font-semibold'>
        اقساطی صاحبخانه شوید...
      </h1>
      <p className='mt-[20px]'>
        دات ملک بهترین مشاور خرید ، فروش و سرمایه گذاری  در حوزه املاک
      </p>
      <Button variant='contained' className='flex mt-[56px] font-medium px-[54px] gap-[12px] justify-center items-center text-[26px] py-[12px]'>
        <img src='/assets/call.svg' className='' />
        مشاوره
      </Button>
    </div>
  )
}
