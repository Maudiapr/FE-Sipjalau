import laundry from '../../assets/laundry.jpg'

export const AuthLayout = (props) => {
    const {title, desc, children} = props
    return(
        <div className='flex justify-between h-screen w-screen'>
            <div className='w-1/2 relative'>
                <img src={laundry} alt="Image Laundry" className='w-full h-screen object-cover' />
                <div className='absolute inset-0 bg-blue-500/50'/>

                <div className='absolute inset-0 flex flex-col text-white justify-center items-center gap-2.5'>
                    <h1 className='text-5xl font-bold'>Happy Wash Laundry</h1>
                    <p>Solusi terbaik untuk membersihkan pakaianmu</p>
                </div>
            </div>

            <div className='flex flex-col w-1/2 justify-center items-center'>
                <div className='flex flex-col gap-10'>
                    <div className='flex flex-col justify-center items-start'>
                        <h1 className='font-bold text-4xl'>{title}</h1>
                        <p className='text-gray-400'>{desc}</p>
                    </div>

                    <div className='flex flex-col w-100 gap-4'>
                        {children}
                    </div>

                    <button className='bg-blue-900 text-white h-10 rounded-lg'>Login</button>
                </div>
            </div>
        </div>
    )
}