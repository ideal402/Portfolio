import {motion, useScroll, useTransform, useSpring} from "framer-motion"
import style from "./home.module.css";

import { SlArrowDown } from "react-icons/sl";


function HeroSection() {
  const {scrollYProgress} = useScroll();

  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "-100vh"]);

  const smoothY = useSpring(y, {
    stiffness: 50,
    damping:15,
    restDelta: 0.003,
  })


  return (
    <div className={style.mainContainer}>
      <motion.div className={style.background} style={{ y:smoothY, }}>
        <div className={style.textArea}>
          <div className={style.title}>
            <h1> firstline </h1>
            <h1> secondline </h1>
          </div>
          <div className={style.subTitle}>
            <h3> firstline </h3>
            <h3> secondline </h3>
          </div>
        </div>
        <motion.div 
          className={style.icon}
          animate = {{ y: ["0px", "5px"]}}
          transition={{
            duration: 0.3,
            repeat: Infinity,
            repeatType: "mirror",
          }}
          >
          <SlArrowDown />
        </motion.div>
      </motion.div>
    </div>
  );
};

HeroSection.displayName = "HeroSection"; 

export default HeroSection;