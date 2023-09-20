import Image from 'next/image'

const Hero = () => {
    return (
        <>
            <Image alt="pull y santi intro image" src="./foto-portada-2.jpg" priority fill={true} style={{ objectFit: "cover", zIndex: 0 }} unoptimized/>
            <h1>Pull <Image className='inline-block' alt="y image" src="./logo__footer.svg" unoptimized width='50' height='50'/> Santi</h1>
            {/* <p className='fecha'>28.10.2023</p> */}
            <Image className='fecha' alt="bouquet image" src="./bouquet.png" unoptimized width='100' height='100'/>
            <div className="scroll-down"></div>
        </>
    )
}

export default Hero