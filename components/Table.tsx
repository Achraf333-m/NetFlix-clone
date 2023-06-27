import { Product } from '@stripe/firestore-stripe-payments'
import React from 'react'
import { BsCheckCircle } from 'react-icons/bs'
import { FaTimes } from 'react-icons/fa'

interface props {
    products: Product[],
    selectedPlan: Product | null,
}

function Table({products, selectedPlan}:props) {
  return (
    <table>
        <tbody className='flex justify-end flex-col divide-y divide-[gray]'>
            <tr className='tableRow  '>
                <td className='tableDataTitle'>Monthly Price</td>
                {products.map((product) => (
                    <td key={product.id} className={`tableDataFeature ${selectedPlan?.id === product.id ? 'text-[white]' : 'text-[gray]'}`}>${product.prices[0].unit_amount!/100}</td>
                ))}
            </tr>
            <tr className='tableRow'>
                <td className='tableDataTitle'>Video Quality</td>
                {products.map((product) => (
                    <td key={product.id} className={`tableDataFeature ${selectedPlan?.id === product.id ? 'text-[white]' : 'text-[gray]'}`}>{product.metadata.videoQuality}</td>
                ))}
            </tr>
            <tr className='tableRow'>
                <td className='tableDataTitle'>Resolution</td>
                {products.map((product) => (
                    <td key={product.id} className={`tableDataFeature ${selectedPlan?.id === product.id ? 'text-[white]' : 'text-[gray]'}`}>{product.metadata.resolution}</td>
                ))}
            </tr>
            <tr className='tableRow'>
                <td className='tableDataTitle'>Watch on TV, laptop, phone</td>
                {products.map((product) => (
                    <td key={product.id} className={`tableDataFeature text-2xl ${selectedPlan?.id === product.id ? 'text-[white]' : 'text-[gray]'}`}>{product.metadata.platforms === 'true' ? <BsCheckCircle  className='inline-block' /> : <FaTimes className='inline-block'/>}</td>
                ))}
            </tr>
        </tbody>
    </table>
  )
}

export default Table