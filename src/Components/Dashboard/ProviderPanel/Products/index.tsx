import { Dispatch, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../lib/store'
import httpClient from '../../../../API'
import { IProduct } from '../../../../types'
import { Button, Modal } from '@mui/material'
import { useForm } from 'react-hook-form'
import Input from '../../../Input'

function ProductAdd({ products, setOpen }: { products: IProduct[], setOpen: Dispatch<boolean> }) {

    return (
        <div dir='rtl' className='px-[75px] font-medium text-primary w-full'>
            <div className='border items-center border-[#E3E3E3] w-full rounded-[16px] px-[16px] pb-[8px]'>
                <div className='mx-[114px] mt-[41px] text-[18px] text-primary'>
                    محصولات شما
                </div>
                <div>
                    {
                        products.map(p =>
                            <div className='my-[12px] mx-[41px]'>
                                {p.productName}
                            </div>
                        )
                    }
                </div>
                <div onClick={() => setOpen(true)} className='flex mx-[40px] mt-[51px] mb-[35px] cursor-pointer items-center text-primary font-medium gap-x-[4.44px] flex-row'>
                    <div className='flex text-white bg-primary rounded-full w-[20px] h-[20px] font-semibold leading-[15px] items-center justify-center'>
                        +
                    </div>
                    <div>
                        افزودن محصول جدید
                    </div>
                </div>
            </div>
        </div>
    )
}

const AddProductModal = ({ open, setOpen, getProducts }: { open: boolean, setOpen: Dispatch<boolean>, getProducts: () => void }) => {

    const [file, setFile] = useState<File | null>(null);

    const handleImageUpload = (evt: any) => {
        const file = evt?.target?.files[0]
        if (file) {
            setFile(file);
        }
    }

    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm()

    const handleClose = () => {
        setOpen(false)
    }

    const submitProduct = (data: any) => {
        const d = data;

        const formData = new FormData();
        for (let [key, value] of Object.entries(d)) {
            const val = value as string
            formData.append(key, val?.toString())
        }
        formData.append('isActive', "true");

        if (file) {
            formData.append('images', file);
            formData.append('images', file);
        }

        httpClient.post("/api/product", formData).then(res => {
            getProducts();
        }).finally(() => {
            setOpen(false)
        })
    }

    return (
        <Modal open={open} onClose={handleClose}>
            <>
                <form onSubmit={handleSubmit(submitProduct)}>
                    <div className='flex h-screen items-center justify-center' dir='rtl'>
                        <div className='max-w-[693px] min-w-[550px] text-start py-[44px] px-[24px] font-bold text-primary rounded-[16px] bg-white'>
                            {/*                             <div className='text-primary mt-[16px] font-bold text-[20px]'>
                                افزودن عکس محصول
                            </div>
                            <input type="file" onChange={handleImageUpload} id="gallery-image" accept="image/png, image/jpeg, image/gif" className="hidden" />
                            <label htmlFor="gallery-image" className='flex p-5 cursor-pointer'>
                                <img src='/assets/image-picker.svg' />
                            </label>
 */}                            <div className='text-[20px] mb-[16px] font-semibold text-primary'>
                                مشخصات محصول
                            </div>
                            <div className='grid grid-cols-2 gap-[11px]'>
                                <Input rest={{ ...register("productName") }} label='نام محصول' />
                                <Input rest={{ ...register("productBrand") }} label='برند محصول' />
                                <Input rest={{ ...register("productDesc") }} label='توضیحات' />
                                <Input rest={{ ...register("productPrice") }} label='قیمت' />
                            </div>
                            <div className='flex mt-[20px] pb-[7px] w-full gap-[20px] justify-center'>
                                <div className='w-1/2 flex justify-end'>
                                    <Button type='submit' className='px-[50px] py-[8px] shadow-none rounded-[49px] text-[20px]' variant='contained'>
                                        ثبت نهایی
                                    </Button>
                                </div>
                                <div className='w-1/2 flex justify-start'>
                                    <Button onClick={() => setOpen(false)} className='px-[50px] py-[8px] shadow-none border-primary border rounded-[49px] text-[20px]' variant='outlined'>
                                        لغو درخواست
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </>
        </Modal>
    )
}

const ProductCard = ({ product }: { product: IProduct }) => {
    return (
        <div className=' border border-[#E3E3E3] rounded-[16px] ' dir='rtl'>
            <img src='/assets/dummy-project.png' className='w-full' />
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
    )
}

export default function Products() {

    const [open, setOpen] = useState<boolean>(false);

    const productAdd = useSelector((state: RootState) => state.ProviderSlice.addProduct)
    const productShow = useSelector((state: RootState) => state.ProviderSlice.showProducts);

    const [products, setProducts] = useState<IProduct[]>([])

    const getProducts = () => {
        httpClient.get('/api/product').then(res => {
            setProducts(res.data.data);
        })
    }

    useEffect(() => {
        getProducts();
    }, [])

    if (productAdd)
        return (
            <>
                <ProductAdd setOpen={setOpen} products={products} />
                <AddProductModal open={open} setOpen={setOpen} getProducts={getProducts} />
            </>
        )

    if (productShow)
        return (
            <div className='px-[20px] mb-[38px]'>
                <div className='text-primary font-semibold text-end text-[24px]'> 
                    محصولات شما
                </div>
                <div className='grid grid-cols-3 mt-[26px] gap-[24px]'>
                    {
                        products.map(p => (
                            <ProductCard product={p} />
                        ))
                    }
                </div>
            </div>
        )

    return <></>
}
