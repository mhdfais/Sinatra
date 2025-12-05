
import Footers from '../components/Footers'
import ContactForm from '../components/ContactForm'
import OurApproach from '../components/OurApproach'
import EssenceSection from '../components/EssenceSection'
import AboutHero from '../components/AboutHero'
import Lenis from 'lenis'
import { useEffect } from 'react'

const About = () => {
  useEffect(() => {
        // 1. Initialize Lenis
        const lenis = new Lenis({
            duration: 1.2, // How long the scroll animation lasts (default is 1.2)
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing function
            direction: 'vertical', // 'vertical' or 'horizontal'
            gestureDirection: 'vertical', // 'vertical' or 'horizontal'
            smoothTouch: false, // Set to true for smooth scrolling on touch devices
            touchMultiplier: 2, // Speed multiplier for touch scrolling
        });

        // 2. Define the animation frame loop
        function raf(time) {
            lenis.raf(time); // Update Lenis with the current time
            requestAnimationFrame(raf); // Loop the function
        }
        
        // 3. Start the loop
        requestAnimationFrame(raf);
        
        // 4. Cleanup function
        return () => {
            lenis.destroy(); // Properly clean up Lenis when the component unmounts
        };
    }, [])
  return (
   <>
    {/* <div className='relative'> */}
        <AboutHero />
        {/* Essence must start BELOW Hero */}
        {/* <div className="relative z-0"> */}
          <EssenceSection />
        {/* </div> */}
      {/* </div> */}
   <OurApproach/>
   <ContactForm/>
   <Footers/>
   </>
  )
}

export default About