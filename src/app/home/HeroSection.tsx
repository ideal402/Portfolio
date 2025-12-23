import React, { forwardRef, useRef, useImperativeHandle, useState, useEffect } from "react";
import {motion, useScroll, useTransform, useSpring} from "framer-motion"
import style from "./hero.module.css";

import { SlArrowDown } from "react-icons/sl";


interface HeroSectionProps {
  title?: string;
}


const HeroSection = forwardRef<HTMLDivElement, HeroSectionProps>(function HeroSection(props, forwardedRef) {
  const localRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState("");

  const myText = ["Back-End", "Front-End", "AIoT"]
  
  useEffect(() => {
    const typeWords = async () => {
      let temp = "";
      let idx = 0;

      while(1){
        const word = myText[idx];

        for(const char of word){
          temp += char;
          setText(temp);
    
          await new Promise((resolve) => setTimeout(resolve, 150));
        }
    
        await new Promise((resolve) => setTimeout(resolve, 1000));

        while(temp.length > 0){
          temp = temp.slice(0,-1);
          setText(temp);

          await new Promise((resolve) => setTimeout(resolve, 50));
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        idx = (idx+1)% myText.length;
      }
    };

    typeWords();

  },[])
  

  useImperativeHandle(forwardedRef, () => localRef.current as HTMLDivElement);

  const {scrollYProgress} = useScroll({
    target: localRef,
    offset: ["start start", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "-100vh"]);

  const smoothY = useSpring(y, {
    stiffness: 100,
    damping:30,
    restDelta: 0.001,
  })

  return (
    <div ref={localRef} className={style.mainContainer}>
      <div className={style.stickyArea}>

          <motion.div className={style.heroSection} style={{ y:smoothY, }}>
            <div className={style.textArea}>
              <div className={style.title}>
                <h1> Hi. I'm Sangbin, </h1>
                <h1 className={style.typeText}>{text}<span className={style.cursor}>|</span></h1>
                <h1> __________ developer </h1>
              </div>

              {/* <div className={style.subTitle}>
                <h3> 다양한 플렛폼의 데이터를 통합하여</h3>
                <h3> 정확한 인사이트를 전달합니다 </h3>
              </div> */}
            </div>
            <motion.div 
              className={style.icon}
              animate = {{ y: ["0px", "-10px"]}}
              transition={{
                duration: 0.7,
                repeat: Infinity,
                repeatType: "mirror",
                ease:"easeInOut"
              }}
              >
              <SlArrowDown />
            </motion.div>
        </motion.div>
      </div>
    </div>
  );
});

HeroSection.displayName = "HeroSection"; 

export default HeroSection;