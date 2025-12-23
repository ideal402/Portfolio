import React, { useState, forwardRef, useRef, useImperativeHandle, useEffect } from "react";
import {motion, useScroll, AnimatePresence} from "framer-motion"
import style from "./approach.module.css"

interface Skill {
  name: string;
  highlight: boolean;
}

interface SkillCategory {
  category: string;
  skills: Skill[];
}

const TEXT_CONTENTS = [
    {
        id: 1,
        title: [
            "안녕하세요,",
            "벡엔드 개발자 이상빈입니다."],
        lines: [
            "데이터의 생성부터 사용자 접점까지",
            "엔드 투 엔드 시스템을 설계합니다.",
            "AI와 IoT 디바이스를 유기적으로 결합하며,", 
            "사용자 경험을 중시하는 서비스를 구축합니다."
        ]
    },
    // {
    //     id: 2,
    //     lines: [
    //         "확장성을 중요하게 생각합니다",
    //         "MQTT를 활용하여 데이터 신뢰도를 높이고",
    //         "API를 통해 Board, Mobile"
    //     ]
    // },
];

const SKILLS_CATEGORIES : SkillCategory[] = [
  {
    category: "Advanced",
    skills: [
      { name: "C++", highlight: true },
      { name: "Java", highlight: true },
      { name: "Python", highlight: true }, 
      { name: "SpringBoot", highlight: false },
      { name: "Django", highlight: false },
    ]
  },
  {
    category: "Proficient",
    skills: [
      { name: "JavaScript", highlight: true },
      { name: "React", highlight: true },
      { name: "Next.js", highlight: false },
      { name: "Node.js", highlight: false },
      { name: "MongoDB", highlight: false },
      { name: "SQL", highlight: false },
      { name: "PostgreSQL", highlight: false },
    ]
  },
  {
    category: "Familiar",
    skills: [
      { name: "Git", highlight: false },
      { name: "GitHub", highlight: false },
      { name: "LabVIEW", highlight: false },
      { name: "Unity", highlight: false },
      { name: "figma", highlight: false },
      { name: "Jira", highlight: false },
    ]
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
            if (latest < 0.3) setActiveText(0); 
            else if (latest < 0.5) setActiveText(1);
            else if (latest < 0.7) setActiveText(2); 
            // else if (latest < 0.7) setActiveText(3); 
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
                staggerChildren: 0.5 
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
                        {activeText > 0 && activeText <= TEXT_CONTENTS.length && (
                        <motion.div
                            key={`text-section-${activeText}`} 
                            className={style.textArea}
                            variants={containerVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ duration: 0.5 }}
                        >
                            <motion.div
                                key="title"
                                variants={itemVariants} 
                                className={style.title}
                            >
                                {TEXT_CONTENTS[activeText - 1].title.map((item, index)=>(
                                    <h1 key={index} >{item}</h1>
                                ))}
                            </motion.div>
                            <motion.div 
                                key="line"
                                variants={itemVariants} 
                                className={style.subTitle}
                            >
                                {TEXT_CONTENTS[activeText - 1].lines.map((item, index)=>(
                                    <h1 key={index}>{item}</h1>
                                ))}
                            </motion.div> 
                        </motion.div>
                        )}
                        {/* {activeText === 1 && (
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
                        )} */}
                        {activeText === TEXT_CONTENTS.length+1 && (
                            <motion.div
                                key="skills"
                                className={style.skillsWrapper} 
                                variants={containerVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                            >
                                {SKILLS_CATEGORIES.map((categoryItem, index) => (
                                    <motion.div 
                                        key={index} 
                                        className={style.skillCategory} 
                                        variants={itemVariants}
                                    >
                                        <h2 className={style.categoryTitle}>{categoryItem.category}</h2>
                                        <p className={style.skillList}> 
                                            {categoryItem.skills.map((skill, sIndex) => (
                                                <React.Fragment key={sIndex}>
                                                    <span 
                                                        className={skill.highlight ? style.highlight : ""}
                                                    >
                                                        {skill.name}
                                                    </span>
                                                    {sIndex < categoryItem.skills.length - 1 && " · "}
                                                </React.Fragment>
                                            ))}
                                        </p>
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