import React, { useEffect, useState } from 'react'
import HiroSection from '../Components/Store/HiroSection'
import Header from '../Components/Header'
import { IProduct } from '../types'
import httpClient from '../API'


const ProductCard = ({ product }: { product: IProduct }) => {
  return (
    <a href={'/products/' + product.id}>
      <div className=' border border-[#E3E3E3] rounded-[16px] ' dir='rtl'>
        {
          product.images?.[0] ?
            <img src={(process.env.REACT_APP_URL + product.images[0]) || ("/assets/dummy-project.png")} className='w-full' />
            :
            <img src={("/assets/dummy-project.png")} className='w-full' />
        }
        <div className='flex text-primary font-medium justify-between mt-[16px] rounded-[16px] px-[17px]'>
          <div>
            {product.productName}
          </div>
          <div>
            {product.productPrice}
          </div>
        </div>
        <p className='text-[12px] px-[16px] pb-[14px]'>
          {product.productDesc}
        </p>
      </div>
    </a>
  )
}

export default function Store() {

  const [products, setProducts] = useState<IProduct[]>([])

  const getProducts = () => {
    httpClient.get('/api/product').then(res => {
      setProducts(res.data.data);
    })
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <div>
      <Header />
      <HiroSection />
      <div className='px-[133px] mt-[88px]' dir='rtl'>
        <h1 className='text-[32px] text-[#424242] font-semibold'>
          محصولات
        </h1>
        <div className='mt-[16px] grid grid-cols-4 gap-[20px]'>
          {
            products.map(p => (
              <ProductCard product={p} />
            ))
          }
        </div>
      </div>
    </div>
  )
}
