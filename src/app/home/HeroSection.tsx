import {motion, useScroll, useTransform, useSpring} from "framer-motion"
import style from "./home.module.css";

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
      <motion.div
        style={{
          position: "fixed",
          color:"white",
          textAlign:"center",
          height:"100vh",
          width: "100%",
          y:smoothY,
          backgroundColor:"gray",
          zIndex:"1",
        }}
      />
    </div>
  );
};

HeroSection.displayName = "HeroSection"; 

export default HeroSection;