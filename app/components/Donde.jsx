import Image from 'next/image'

const Donde = () => {
    return (
        <><h2 className='text-2xl md:text-3xl self-center py-3 font-semibold'>Donde & Cuando?</h2>
            <div className='grid md:grid-cols-2 md:gap-2 grid-cols-1 donde-cuando'>
                <div>
                    <Image alt="ceremonia image" src="./ceremonia.png" style={{ zIndex: 0 }} unoptimized width='70' height='70' className='mt-0 mb-0 mr-auto ml-auto py-2 h-24' />
                    <p className='text-1xl md:text-2xl pt-5'>Ceremonia</p>
                    <p className='md:h-20'>El 28 de Octubre a las 16:00 hs en la Iglesia San Roque, Enrique Discepolo 999, Open Door</p>
                    <a className='inline-block w-40 rounded-sm bg-[#3e6f5a] text-white px-5 py-1 m-3.5' href="https://maps.app.goo.gl/UHTDnEL7QLos4KNt8" target="_blank" rel="noopener noreferrer">
                        Ver mapa
                    </a>
                </div>
                <div>
                    <Image alt="fiesta image" src="./fiesta3.png" style={{ zIndex: 0 }} unoptimized width='70' height='70' className='mt-0 mb-0 mr-auto ml-auto py-4 h-24' />
                    <p className='text-1xl md:text-2xl pt-5'>Fiesta</p>
                    <p className='md:h-20'>Después de la ceremonia los esperamos a celebrar con nosotros en La Aguada Polo, en la RP192, KM 10.5, Open Door</p>
                    <a className='inline-block w-40 rounded-sm bg-[#3e6f5a] text-white px-5 py-1 m-3.5' href="https://maps.app.goo.gl/Ehstu6sJ3TEAagDcA" target="_blank" rel="noopener noreferrer">
                        Ver mapa
                    </a>
                </div>
            </div>
        </>
    )
}

export default Donde