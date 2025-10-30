import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewLetterBox from '../components/NewLetterBox'

const Contact = () => {
  return (
    <div>
      {/* Title Section */}
      <div className='text-center text-2xl pt-10 border-t'>
         <Title text1={'CONTACT'} text2={'US'} />
      </div>

      {/* Contact Info Section */}
      <div className='my-10 flex flex-col md:flex-row gap-10'>
        {/* Image */}
        <img 
          className='w-full md:max-w-[480px] rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-500' 
          src={assets.contact_img} 
          alt="Contact Les Joyaux du Temps" 
        />

        {/* Contact Details */}
        <div className='flex flex-col justify-center items-start gap-6 bg-gray-50 p-6 rounded-lg shadow-md'>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-700'>
            Douala, Cameroun <br />
            Littoral, Bonamoussadi
          </p>
          <p className='text-gray-700 hover:text-pink-400 transition-colors'>
            Email: <a href="mailto:aapash6@gmail.com" className='underline'>contact@lesjoyauxdutemps.com</a>
          </p>
          <p className='text-gray-700 hover:text-green-500 transition-colors'>
            WhatsApp: <a 
                        href="https://wa.me/237670439247" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className='underline'
                      >
                      +237 6X XX XX XX
                    </a>
          </p>
          <p className='text-gray-700'>Heures d'ouverture: Lundi - Samedi, 9h - 18h</p>
        </div>
      </div>

      {/* Newsletter Subscription */}
      <NewLetterBox />
    </div>
  )
}

export default Contact
