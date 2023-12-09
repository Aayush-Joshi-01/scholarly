import { motion } from "framer-motion";
import { styles } from "../style";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigateTo = useNavigate();
  const [isMobile,setIsMobile] = useState(false);
  useEffect(()=>{
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    setIsMobile(mediaQuery.matches);
    const handleMediaQueryChange = () => {
      setIsMobile(event.matches);
    }
    mediaQuery.addEventListener('change',handleMediaQueryChange);
    return () => {
      mediaQuery.removeEventListener('change',handleMediaQueryChange);
    }
  },[]);
  
  const x = (<div className="absolute xs:bottom-10 w-full bottom-30 flex justify-center items-center">
  <a href="#about">
    <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2" style={{
      transform: 'translateY(-140px)'
    }}>
      <motion.div
        animate={{
          y : [0,24,0],
        }}
        transition = {{
          duration: 1,
          repeat: Infinity,
          repeatType: 'loop'
        }}
        className='w-3 h-3 rounded-full bg-secondary'
      />
    </div>
  </a>
</div>);

  return (
    <section className="relative w-full h-screen mx-auto">
      <div
        className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row gap-5 items-center`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-secondary" />
          <div className="w-1 sm:h-60 h-60 violet-gradient" />
        </div>
        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Welcome to <span className="text-secondary">Scholarly.</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
          Your Gateway to Tailored Scholarships. Explore, Customize, Succeed. Discover the Perfect Scholarship Match Based on Your Needs. Scholarly Is Where Your Educational Journey Begins with Precision and Ease.
          </p>
          <div className="flex justify-center items-center pt-10">
          <button onClick={() => {
            navigateTo('/viewAll')
          }} className="bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl hover:bg-secondary hover:text-black-100">View All</button>
          </div>
        </div>
      </div>
      <br/>
      <br/>
    </section>
  );
};

export default Hero;
