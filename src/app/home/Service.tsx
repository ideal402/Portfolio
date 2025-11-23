import React, { forwardRef, useRef, useImperativeHandle } from "react";
import style from "./service.module.css"
import {motion, useScroll, useTransform} from "framer-motion"

const projectData = [
    {
        id: 1,
        title: "Web Development", // 헤더 제목
        color: "red", // 이미지 대용 색상 (나중에 image src로 변경 가능)
        lines: ["Frontend Logic", "React & Next.js", "Interactive UI"] // 3줄 텍스트
    },
    {
        id: 2,
        title: "App Design",
        color: "blue",
        lines: ["User Experience", "Figma & Adobe XD", "Mobile First"]
    },
    {
        id: 3,
        title: "Backend API",
        color: "green",
        lines: ["Node.js & Express", "Database Design", "API Integration"]
    },
];


const Service = forwardRef (function Service(props, forwardedRef) {
    const localRef = useRef(null);    
    useImperativeHandle(forwardedRef, () => localRef.current);
    
    const {scrollYProgress} = useScroll({
        target: localRef,
        offset: ["start 80%", "end 80%"],
    })
    const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
    
    const projectCount = projectData.length;
    const gapCount = projectCount > 0 ? projectCount - 1 : 0;
    const lineHeight = `calc(${gapCount} * 80vh + 10vh + 90px)`;

    const textVariants = {
        initial: { opacity: 0, y: 20 }, 
        animate: { opacity: 1, y: 0 },   
    };

    const imageVariants = {
        initial:{opacity:0, x:-20},
        animate: { opacity: 1, x: 0 },   
    }

    const lineVariants = {
        initial: { width: "0px" }, 
        animate: {  width: "50px"},
    }

    const topLineVariants = {
        initial: { width: "0px" }, 
        animate: {  width: "100px"},
    }


    return(
        <div className={style.mainContainer}>
            <div className={style.topArea}>
                <motion.div 
                    variants={topLineVariants}
                    initial = "initial"
                    whileInView="animate"
                    viewport={{ margin: "100% 0px -20% 0px" }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    style={{marginTop:"10px"}}
                    className={style.headerLineOvercoat}
                />
                <div className={style.topLine}></div>
                <h3>Projects</h3>
            </div>
            
            {projectData.map((project) => (
                <div key={project.id} className={style.projectArea}>
                    <div className={style.projectheader}>
                        <motion.div 
                            variants={lineVariants}
                            initial = "initial"
                            whileInView="animate"
                            viewport={{ margin: "100% 0px -20% 0px" }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className={style.headerLineOvercoat}
                        />
                        <div className={style.headerLine} />
                        <motion.h1
                            variants={textVariants}
                            initial="initial"
                            whileInView="animate"
                            viewport={{once: true, amount: 0.5}}
                            
                            transition={{ duration: 0.5 }}
                        >
                            {project.title}
                        </motion.h1>
                    </div>
                    <div className={style.projectMain}>
                        <motion.div 
                            className={style.mainImege}
                            variants={imageVariants}
                            initial="initial"
                            whileInView="animate"
                            viewport={{once: true, amount: 0.5}}
                            transition={{ duration: 0.5 }}
                        >
                            <img 
                                style={{
                                    backgroundColor: project.color, 
                                    width: "80%", 
                                    height: "auto",
                                }}
                                alt={project.title}
                            />
                        </motion.div>
                        <motion.div
                            className={style.mainText}
                            variants={textVariants}
                            initial="initial"
                            whileInView="animate"
                            viewport={{once: true, amount: 0.5}}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <h1>{project.lines[0]}</h1>
                            <h1>{project.lines[1]}</h1>
                            <h1>{project.lines[2]}</h1>
                        </motion.div>
                    </div>
                </div>
            ))}
            <div
                ref={localRef}
                className={style.leftLine}
                style={{height:lineHeight}}
            >
                <motion.div 
                    className={style.overcoat}
                    style={{
                        height: height,
                    }}
                />
            </div>
        </div>
    )
});

export default Service