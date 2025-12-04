
import Footers from '../components/Footers'
import ContactForm from '../components/ContactForm'
import OurApproach from '../components/OurApproach'
import EssenceSection from '../components/EssenceSection'
import AboutHero from '../components/AboutHero'

const About = () => {
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