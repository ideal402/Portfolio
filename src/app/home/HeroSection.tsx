import React, { forwardRef, useRef, useImperativeHandle } from "react";
import {motion, useScroll, useTransform, useSpring} from "framer-motion"
import style from "./hero.module.css";

import { SlArrowDown } from "react-icons/sl";


interface HeroSectionProps {
  title?: string;
}


const text = ["안녀하세요", "이상빈입니다"]
const subText = ["여기에 자기소개를 적어주세요", "저는 어떤걸 추구하는 개발자입니다."]


const HeroSection = forwardRef<HTMLDivElement, HeroSectionProps>(function HeroSection(props, forwardedRef) {
  const localRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(forwardedRef, () => localRef.current as HTMLDivElement);

  const {scrollYProgress} = useScroll({
    target: localRef,
    offset: ["start start", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "-100vh"]);

  const smoothY = useSpring(y, {
    stiffness: 60,
    damping:15,
    restDelta: 0.003,
  })

  return (
    <div ref={localRef} className={style.mainContainer}>
      <div className={style.stickyArea}>
          <motion.div className={style.heroSection} style={{ y:smoothY, }}>
            <div className={style.textArea}>
              <div className={style.title}>
                <h1> 데이터의 흐름을 잇는 </h1>
                <h1> 개발자 이상빈입니다 </h1>
              </div>
              <div className={style.subTitle}>
                <h3> 다양한 플렛폼의 데이터를 통합하여</h3>
                <h3> 정확한 인사이트를 전달합니다 </h3>
              </div>
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