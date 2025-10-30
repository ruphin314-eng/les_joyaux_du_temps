import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets';
import NewLetterBox from '../components/NewLetterBox';

const About = () => {
  return (
    <div>

      {/* Section Title */}
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1="À" text2="PROPOS" />
      </div>

      {/* About Info */}
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img 
          className='w-full md:max-w-[450px] rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-500'
          src={assets.about_img} 
          alt="Les Joyaux du Temps - Bijoux" 
        />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
           <p>Chez Les Joyaux du Temps, nous croyons que chaque instant mérite d’être sublimé. Notre mission est de proposer des créations élégantes, modernes et intemporelles qui révèlent la beauté unique de chacun. Chaque article que nous sélectionnons incarne un savoir-faire raffiné, une passion sincère et une touche d’émotion qui traversent le temps.</p>
           <p>Plus qu’une boutique, Les Joyaux du Temps est un univers où l’élégance rencontre l’authenticité. Nous mettons tout notre cœur à offrir des produits de qualité, soigneusement choisis pour inspirer, émerveiller et accompagner vos plus beaux moments. Parce que le vrai luxe, c’est de donner du sens à chaque détail.</p>
           <b className='text-gray-800'>Our Mission</b>
           <p>Notre mission est de sublimer le quotidien à travers des créations qui allient élégance, authenticité et émotion. Chez Les Joyaux du Temps, chaque pièce est pensée pour raconter une histoire, celle de la beauté intemporelle et du raffinement. Nous croyons que chaque détail compte, car c’est dans les petites choses que naît la véritable magie du style.</p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className='text-4xl py-4 text-center'>
         <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>
       
      <div className='flex flex-col md:flex-row text-sm mb-20 gap-6'>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 transform hover:scale-105 transition-transform duration-500'>
            <b>Quality Assurance</b>
            <p className='text-gray-600'>Nous nous engageons à vous offrir uniquement des produits de la plus haute qualité. Chaque bijou est minutieusement vérifié et fabriqué selon des standards rigoureux afin de garantir durabilité, éclat et finition parfaite. Avec Les Joyaux du Temps, la qualité n’est jamais compromise.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 transform hover:scale-105 transition-transform duration-500'>
            <b>Convenience</b>
            <p className='text-gray-600'>Nous rendons votre expérience d’achat simple et agréable. Avec une navigation fluide, des options de paiement sécurisées et une livraison rapide, vous pouvez acquérir vos bijoux préférés en quelques clics, sans effort et en toute tranquillité.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 transform hover:scale-105 transition-transform duration-500'>
            <b>Exceptional Customer Service</b>
            <p className='text-gray-600'>Nous plaçons nos clients au cœur de tout ce que nous faisons. Notre équipe dévouée est toujours prête à répondre à vos questions, résoudre vos problèmes et vous accompagner tout au long de votre expérience d’achat, afin que chaque interaction soit agréable et mémorable.</p>
          </div>
      </div>

      {/* Newsletter */}
      <NewLetterBox />

    </div>
  )
}

export default About
