import React, { useState } from 'react';

const Regalo = () => {
const [showMore, setShowMore] = useState(false);

    return (
        <>
        <h2 className='text-2xl md:text-3xl self-center py-3 font-semibold'>Luna de Miel</h2>
        <p className='text-1xl md:text-2xl self-center py-3'>Si nos querés hacer un regalo podés colaborar con nuestra Luna de Miel :)</p>
        <button className="btn text-1xl md:text-2xl w-40 self-center" onClick={() => setShowMore(!showMore)}>
            {showMore ? "Ver datos -" : "Ver datos + "}
        </button>

        {showMore && 
            <div className="text-1xl md:text-2xl self-center">
                <ul>
                    <li>Titular: MARIA PAULA PEYRET</li>
                    <li>Banco: Santander</li>
                    <li>CBU: 0720793088000035796318</li>
                    <li>Alias: paulapeyret</li>
                </ul>
                <p>Gracias!</p>
            </div>}
        </>
    )
}

export default Regalo