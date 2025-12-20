import React, { useState, forwardRef, useRef, useImperativeHandle, useEffect } from "react";
import {motion, useScroll, AnimatePresence} from "framer-motion"
import style from "./approach.module.css"


const TEXT_CONTENTS = [
    {
    id: 1,
    lines: [
      "하드웨어(IoT) 환경부터 웹 인터페이스까지",
      "데이터의 전체 흐름을 설계하는 백엔드 개발자입니다.</br>", 
      "스마트 팩토리 및 모니터링 시스템을 주력으로", 
      "다양한 플랫폼의 데이터를 통합하고 최적화하며", 
      "안정적인 통신 설계와 직관적인 UI/UX로 사용자에게", 
      "신뢰받는 서비스를 구현합니다."
    ]
  },
  {
    id: 2,
    lines: [
      "데이터는 정확하게 처리되고 가치 있게 쓰여야 비로소 의미를 가집니다.", 
      "저는 오차 없는 수집과 목적에 맞는 효율적인 가공 및 저장을 개발의 최우선 순위로 둡니다.",
      "단순한 숫자의 나열을 넘어 사용자에게 명확한 인사이트를 \n제공하는 시스템을 지향합니다."
    ]
  },
];

const SKILLS_CATEGORIES = [
  {
    category: "Advanced",
    skills: ["LabVIEW", "Python", "Django", "PostgreSQL", "SQL"]
  },
  {
    category: "Proficient",
    skills: ["React", "Next.js", "Node.js", "MongoDB", "JavaScript"]
  },
  {
    category: "Familiar",
    skills: ["C++", "Java", "Git", "Docker"]
  }
];


const Approach = forwardRef (function Approach(props, forwardedRef) {
    const localRef = useRef(null);    
    useImperativeHandle(forwardedRef, () => localRef.current);
    
    const [activeText, setActiveText] = useState(0);

    const {scrollYProgress} = useScroll({
        target: localRef,
        offset: ["start start", "end end"],
    })

    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (latest) => {
            if (latest < 0.20) setActiveText(0); 
            else if (latest < 0.3) setActiveText(1);
            else if (latest < 0.5) setActiveText(2); 
            else if (latest < 0.7) setActiveText(3); 
            else setActiveText(0);
        });
        return () => unsubscribe();
    }, [scrollYProgress]); 
    
    const containerVariants = {
        initial: { opacity: 0, y: 30 },
        animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            staggerChildren: 0.2 
        }
        },
        exit: { opacity: 0, y: -30, transition: { duration: 0.4 } }
    };

    const itemVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };
    
    const photoVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        exit: { opacity: 0, y: -30, transition: { duration: 0.4 } }
    };


    return(
        <div ref={localRef} className={style.mainContainer}>
            <div className={style.stickyContainer}> 
                <div className={style.contentArea}> 
                    
                    <AnimatePresence mode="wait">
                        {activeText > 0 && activeText < 3 && (
                        <motion.div
                            key={`text-section-${activeText}`} 
                            className={style.textArea}
                            variants={containerVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ duration: 0.5 }}
                        >
                            {TEXT_CONTENTS[activeText - 1].lines.map((line, index) => (
                              <motion.h1 
                                key={index} 
                                dangerouslySetInnerHTML={{ __html: line }} />
                            ))}
                        </motion.div>
                        )}
                        {activeText === 1 && (
                            <div 
                                className={style.profilePhotoBox}
                            >
                                <motion.img
                                    key="profilePhoto"
                                    variants={photoVariants}
                                    initial = "initial"
                                    animate = "animate"
                                    exit = "exit"
                                    src={"/profile.jpg"}
                                    className={style.profilePhoto}
                                />
                            </div>
                        )}
                        {activeText === 3 && (
                            <motion.div
                                key="skills"
                                className={style.skillsWrapper} 
                                variants={containerVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                            >
                                {SKILLS_CATEGORIES.map((item, index) => (
                                    <motion.div 
                                        key={index} 
                                        className={style.skillCategory} 
                                        variants={itemVariants}
                                    >
                                        <h2 className={style.categoryTitle}>{item.category}</h2>
                                        <p className={style.skillList}> {item.skills.join(" · ")}</p>
                                    </motion.div>
                                ))}
                            </motion.div>
                            )}
                    </AnimatePresence>

                    <AnimatePresence>
                        {activeText !== 0 && (
                            <motion.div 
                                className={style.progressbarArea}
                                initial={{ opacity: 0, y: 20 }}  
                                animate={{ opacity: 1, y: 0 }}   
                                exit={{opacity: 0, y: -20 }}
                                transition={{ duration: 0.3, delay: 0.2 }}
                            >

                                <AnimatePresence mode="wait">
                                <motion.h3
                                    key = {activeText}
                                    variants={itemVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                >
                                    {activeText} 
                                </motion.h3>
                                </AnimatePresence>
                                
                                <h3 className={style.progressNum}>/ {TEXT_CONTENTS.length + 1}</h3>

                                <div className={style.barArea}>
                                    <motion.div
                                    className={style.progressbar}
                                    animate={{ scaleX: activeText / (TEXT_CONTENTS.length + 1) }}
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                    />
                                    <div className={style.progressbarBackground}/>     
                                </div>
                                       

                            </motion.div>
                        )}
                    </AnimatePresence>
                   
                </div>
            </div>
        </div>
    )
});

export default Approach;