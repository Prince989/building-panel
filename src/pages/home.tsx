import React from 'react'
import Header from '../Components/Header'

export default function HomePage() {

    if (window.innerWidth < 1000)
        return (
            <div className='text-center text-2xl font-semibold'>
                لطفا از طریق کامپیوتر وارد شوید
            </div>
        )

    return (
        <div>
            <Header />
        </div>
    )
}
