import React from 'react'
import { Tilt } from 'react-tilt'
import { motion } from 'framer-motion'
import { styles } from '../style'
import {services} from '../constants'
import {fadeIn , textVariant} from '../utils/motion'
import { SectionWrapper } from '../hoc'
import { Link } from 'react-router-dom'

const ServiceCard = ({index,title,icon}) => {
  return (
    <Tilt className='xs:w-[250px] w-full'>
      <motion.div
        variants={fadeIn("right",'spring',0.5*index,0.75)}
        className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
      >
        <Link to={`/${index}`} >
        <div
          options={{
            max: 45,
            scale: 1,
            speed: 450
          }}
          className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'
        >
          <img src={icon} alt={title} style={{
            objectFit: 'cover'
            
          }} className='w-16 h-16 object-contain'/>
          <h3 className='text-center font-bold text-white text-[20px]'>{title}</h3>
        </div>
        </Link>
      </motion.div>
    </Tilt>
  )
}


const About = () => {
  return (
    <>
       <div
        className='mt-20 flex flex-wrap gap-10'
      >
        {services.map((service,index) => (
          <ServiceCard key={service.title} index={index} {...service}/>
        ))}
      </div>
    </>    
  )
}

export default SectionWrapper(About,'about');