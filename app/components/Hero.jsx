import Image from 'next/image'

const Hero = () => {
    return (
        <>
            <Image alt="pull y santi intro image" src="./img_intro_bnw2.JPG" priority fill={true} style={{ objectFit: "cover", zIndex: 0 }} unoptimized/>
            <h1 className='font-sans'>pull & santi</h1>
            <div className='intro-line'></div>
            <p className='fecha font-sans'>Te invitamos a <br/> nuestro casamiento <br/> 28.10.2023</p>
        </>
    )
}

export default Hero