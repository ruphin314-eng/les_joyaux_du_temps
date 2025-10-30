import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

         <div>
            <img src={assets.logo} className='mb-5 w-32' alt="" />
            <p className='w-full md:w-2/3 text-gray-600'>
              Chez Les Joyaux du Temps, chaque bijou est une ode à l’élégance et à l’émotion.
              Nos créations allient raffinement intemporel et passion du détail, pour sublimer chaque instant de votre vie.
              Derrière chaque éclat se cache une histoire, un souvenir, une promesse d’amour.
              Parce que le vrai luxe, c’est celui qui traverse le temps et touche le cœur.
            </p>
        </div>

         <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li className="hover:text-gray-900 cursor-pointer transition-colors">Home</li>
                <li className="hover:text-gray-900 cursor-pointer transition-colors">About us</li>
                <li className="hover:text-gray-900 cursor-pointer transition-colors">Delivery</li>
                <li className="hover:text-gray-900 cursor-pointer transition-colors">Privacy policy</li>
            </ul>
         </div>

         <div>
            <p className='text-xl font-medium mb-5'>CONTACTEZ-NOUS</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>+237-670-439-247</li>
                <li>ruphiapash@gmail.com</li>
            </ul>
         </div>

      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2025@ Les_Joyaux_du_Temps.com - All Right Reserved</p>
      </div>
      
    </div>
  )
}

export default Footer
