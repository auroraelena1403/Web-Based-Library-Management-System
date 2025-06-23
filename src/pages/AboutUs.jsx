import React from 'react';
import { TbTruckDelivery } from "react-icons/tb";
import { GiBookshelf } from "react-icons/gi";
import { GiBookmark } from "react-icons/gi";
import stackedBooks from '../assets/stackedBooks.png'
import car from '../assets/car.png'
import bookFl from '../assets/bookFlowers.png'
import bookFantasy from '../assets/fantasyBook.png'
import {motion} from 'framer-motion'


const AboutUs = () => {

  return (
    <div>
      {/* despre noi */}
      <section id='about' className='relative overflow-hidden bg-green-950'>
        <div>
        <motion.div
            initial={{opacity:0,translateY:"-50%"}}
            whileInView={{opacity:1,translateY:0}}
            transition={{duration:2}} className='flex flex-col items-center gap-3 text-center mt-10 mb-10 md:mb-14'>
          <h2 className='font-serif text-yellow-500 text-2xl md:text-3xl xl:text-4xl'>Despre noi</h2>
          
        </motion.div>
        </div>
      
        <div className='container space-y-5 xl:space-y-0'>
          {/* item1 */}
          <div className='flex flex-col items-center lg:flex-row gap-5'>
            {/* imagine corespunzatoare abtUs */}
            <motion.div
            initial={{opacity:0,translateX:"-40%"}}
            whileInView={{opacity:1,translateX:0}}
            transition={{duration:2}}
            className='w-full lg:w-1/2'>
              <img src={stackedBooks} className='w-full sm:w-1/2 lg:w-2/3 xl:w-1/2 mx-auto'></img>
            </motion.div>
            {/* continut abtUs */}
            <motion.div 
            initial={{opacity:0,translateX:"40%"}}
            whileInView={{opacity:1,translateX:0}}
            transition={{duration:2}}
            className='w-full lg:w-1/2'>
              <div className='space-y-5'>
                <h3 className='text-xl md:text-2xl xl:text-3xl  text-white'>
                  Catalog constant  <span class="text-yellow-500">actualizat </span> 
                  
                </h3>
                <p className=' text-white mr-10'>
                  Catalogul nostru este actualizat constant pentru a-ți oferi cele mai noi și relevante produse. Indiferent că ești în căutarea unei cărți, a unui produs digital sau a unei oferte speciale, vei găsi mereu ceva nou în selecția noastră. Ne asigurăm că fiecare articol adăugat respectă standarde ridicate de calitate și utilitate, astfel încât experiența ta de navigare și achiziție să fie mereu una plăcută și eficientă.
                </p>
              </div>
            </motion.div>
          </div>
          {/* item2 */}
          <div className='flex flex-col items-center lg:flex-row gap-5'>
            
            {/* continut abtUs */}
            <motion.div
            initial={{opacity:0,translateX:"-60%"}}
            whileInView={{opacity:1,translateX:0}}
            transition={{duration:2}}
            className='w-full lg:w-1/2'>
              <div className='space-y-5'>
                <h3 className='text-xl md:text-2xl xl:text-3xl  text-white ml-10'>
                  Colectie in continua  <span class="text-yellow-500">crestere </span> 
                  pentru tine
                </h3>
                <p className=' text-white ml-10'>
                 Ne mândrim cu o colecție în continuă creștere, atent selectată și actualizată constant pentru tine. Indiferent dacă ești pasionat de literatură clasică sau cauți cele mai noi apariții, platforma noastră îți oferă mereu resurse diverse și de calitate, menite să îți îmbogățească cunoștințele și să îți stimuleze imaginația.


                </p>
              </div>
            </motion.div>
            {/* imagine corespunzatoare abtUs */}
            <motion.div 
            initial={{opacity:0,translateX:"60%"}}
            whileInView={{opacity:1,translateX:0}}
            transition={{duration:2}} className='w-full lg:w-1/2'>
              <img src={bookFl} className='w-full sm:w-2/3 lg:w-full xl:w-2/3 mx-auto'></img>
            </motion.div>
          </div>
          {/* item3 */}
          <div className='flex flex-col items-center lg:flex-row gap-5'>
            {/* imagine corespunzatoare abtUs */}
            <motion.div
            initial={{opacity:0,translateX:"-60%"}}
            whileInView={{opacity:1,translateX:0}}
            transition={{duration:2}} 
            className='w-full lg:w-1/2'>
              <img src={car} className='w-full sm:w-2/3 lg:w-full xl:w-1/3 mx-auto'></img>
            </motion.div>
            {/* continut abtUs */}
            <motion.div 
            initial={{opacity:0,translateX:"60%"}}
            whileInView={{opacity:1,translateX:0}}
            transition={{duration:2}} className='w-full lg:w-1/2'>
              <div className='space-y-5'>
                <h3 className='text-xl md:text-2xl xl:text-3xl  text-white'>
                 Livrare la  <span class="text-yellow-500">domiciuliu </span>
                </h3>
                <p className=' text-white mr-10'>
                  Oferim serviciul de livrare rapidă și sigură la domiciliu, pentru ca tu să te bucuri de produsele preferate fără efort și fără a ieși din confortul casei tale. Ne asigurăm că fiecare comandă ajunge prompt și în condiții impecabile, punând mereu satisfacția ta pe primul loc.
                </p>
              </div>
            </motion.div>
          </div>
          {/* item4 */}
          <div className='flex flex-col items-center lg:flex-row gap-5'>
            
            {/* continut abtUs */}
            <motion.div
            initial={{opacity:0,translateX:"-60%"}}
            whileInView={{opacity:1,translateX:0}}
            transition={{duration:2}} className='w-full lg:w-1/2'>
              <div className='space-y-5'>
                <h3 className='text-xl md:text-2xl xl:text-3xl  text-white ml-10'>
                  Lasa-te cuprins de   <span class="text-yellow-500">magia </span> cartilor
                  
                </h3>
                <p className=' text-white ml-10'>
                  Explorează universuri fascinante și descoperă povești care te vor captiva de la prima pagină. O colecție diversă și inspiratoare te așteaptă să o răsfoiești și să te bucuri de experiențe de neuitat.
                </p>
              </div>
            </motion.div>
            {/* imagine corespunzatoare abtUs */}
            <motion.div 
            initial={{opacity:0,translateX:"60%"}}
            whileInView={{opacity:1,translateX:0}}
            transition={{duration:2}} className='w-full lg:w-1/2'>
              <img src={bookFantasy} className='w-full sm:w-2/3 lg:w-full xl:w-2/3 mx-auto'></img>
            </motion.div>
          </div>
        </div>
      </section>
      {/* servicii */}
      <div className='bg-white text-green-500 py-20 px-10'>
        <div className='container w-full'>
          {/* card 1 */}
          <div className='border border-green-900 p-5 mt-6 cursor-pointer rounded-md hover:shadow-2xl hover:-translate-y-1 duration-300'>
            <div className='flex items-center gap-5'>
              <TbTruckDelivery className='text-3xl md:text-4xl xl:text-5xl' />
              <p className='md:text-lg font-bold'>
                Livrare la domiciuliu
              </p>
            </div>
            <p className=''>
              Ne asigurăm că produsele tale favorite ajung rapid și în siguranță direct la ușa ta, pentru ca tu să te bucuri de o experiență comodă, fără bătăi de cap.
            </p>
          </div>
          {/* card 2 */}
          <div className='border border-green-900 p-5 mt-6 cursor-pointer rounded-md hover:shadow-2xl hover:-translate-y-1 duration-300'>
            <div className='flex items-center gap-5'>
              <GiBookshelf className='text-3xl md:text-4xl xl:text-5xl' />
              <p className='md:text-lg font-bold'>
                Catalog actualizat
              </p>
            </div>
            <p className=''>
              Descoperă în fiecare zi noutăți și titluri atent selectate, pentru o colecție mereu proaspătă, adaptată gusturilor și nevoilor tale.


            </p>
          </div>
          {/* card 3 */}
          <div className='border border-green-900 p-5 mt-6 cursor-pointer rounded-md hover:shadow-2xl hover:-translate-y-1 duration-300'>
            <div className='flex items-center gap-5'>
              <GiBookmark className='text-3xl md:text-4xl xl:text-5xl' />
              <p className='md:text-lg font-bold'>
                Rezervari online
              </p>
            </div>
            <p className=''>
              Rezervă cărțile dorite în câțiva pași simpli, direct de pe platformă, și pregătește-te să le savurezi când dorești, fără griji.
            </p>
          </div>
        </div>
      </div>
      {/* contact */}
      <div className='bg-green-950'>
        <div>
          contact
        </div>

      </div>
    </div>
  )
}

export default AboutUs
