import Image from 'next/image'

const Donde = () => {
    return (
        <div className='grid grid-cols-2 gap-2 donde-cuando'>
        <div>
          <Image alt="ceremonia image" src="./ceremonia.png" style={{ zIndex: 0 }} unoptimized width='70' height='70' className='mt-0 mb-0 mr-auto ml-auto py-2'/>
          <p>La ceremonia religiosa se celebrara a las 16hrs en La Iglesia San Roque, Enrique Discepolo 999, Open Door</p>
          <a className='block rounded-lg bg-pink-900 text-white px-3 py-1 m-3.5' href="https://maps.app.goo.gl/UHTDnEL7QLos4KNt8" target="_blank" rel="noopener noreferrer">
            Ver mapa
          </a>
        </div>
        <div>
          <Image alt="fiesta image" src="./fiesta.png" style={{ zIndex: 0 }} unoptimized width='60' height='70' className='mt-0 mb-0 mr-auto ml-auto py-4'/>
          <p>Los esperamos a celebrar con nosotros a las 17hrs en La Aguada Polo, en la ruta 7, Open Door</p>
          <a className='block rounded-lg bg-pink-900 text-white px-3 py-1 m-3.5' href="https://maps.app.goo.gl/Ehstu6sJ3TEAagDcA" target="_blank" rel="noopener noreferrer">
            Ver mapa
          </a>
        </div>
      </div>
    )
}

export default Donde