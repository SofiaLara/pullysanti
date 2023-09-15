

const Donde = () => {
    return (
        <div className='grid grid-cols-2 gap-2 donde-cuando'>
        <div>
          <h3 className='text-1xl py-3'>Ceremonia</h3>
          <p>La ceremonia religiosa se celebrara a las 16hrs en La Iglesia San Roque, Enrique Discepolo 999, Open Door</p>
          <a className='inline-block rounded-lg bg-slate-500 text-white px-3 py-1 m-3.5' href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer">
            Mapa
          </a>
        </div>
        <div>
          <h3 className='text-1xl py-3'>Fiesta</h3>
          <p>Los esperamos a celebrar con nosotros a las 17hrs en La Aguada Polo, en la ruta 7, Open Door</p>
          <a className='inline-block rounded-lg bg-slate-500 text-white px-3 py-1 m-3.5' href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer">
            Mapa
          </a>
        </div>
      </div>
    )
}

export default Donde