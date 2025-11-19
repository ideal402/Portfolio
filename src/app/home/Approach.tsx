import React, { useState, forwardRef, useRef, useImperativeHandle, useEffect } from "react";
import {motion, useScroll, AnimatePresence} from "framer-motion"
import style from "./approach.module.css"


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
            if (latest < 0.40) { 
                setActiveText(0); 
            } else if (latest < 0.60) {
                setActiveText(1);
            } else if (latest < 0.80) {
                setActiveText(2); 
            } else {
                setActiveText(3); 
            }
        });
        return () => unsubscribe();
    }, [scrollYProgress]); 
    
    const textVariants = {
        initial: { opacity: 0, y: 20 }, 
        animate: { opacity: 1, y: 0 },   
        exit: { opacity: 0, y: -20 },  
    };
    const numberVariants = {
        initial: { opacity: 0, y: -5 }, 
        animate: { opacity: 1, y: 0 },   
        exit: { opacity: 0, y: -5 },  
    };

    return(
        <div ref={localRef} className={style.mainContainer}>
            <div className={style.stickyContainer}> 
                <div className={style.contentArea}> 
                    <AnimatePresence mode="wait">

                    {activeText === 1 && (
                    <motion.div
                        key="text1"
                        className={style.textArea}
                        variants={textVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.5 }}
                    >
                        <h1>첫번째 텍스트</h1>
                        <h1>첫번째 텍스트</h1>
                        <h1>첫번째 텍스트</h1>
                    </motion.div>
                    )}
                    {activeText === 2 && (
                    <motion.div
                        key="text2"
                        className={style.textArea}
                        variants={textVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.5 }}
                    >
                        <h1>두번째 텍스트 2</h1>
                        <h1>두번째 텍스트 2</h1>
                        <h1>두번째 텍스트 2</h1>
                    </motion.div>
                    )}
                    {activeText === 3 && (
                    <motion.div
                        key="text3"
                        className={style.textArea}
                        variants={textVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.5 }}
                    >
                        <h1>세번쨰 텍스트 3</h1>
                        <h1>세번쨰 텍스트 3</h1>
                        <h1>세번쨰 텍스트 3</h1>
                    </motion.div>
                    )}

                    </AnimatePresence>
                    {activeText !== 0 && (
                    <motion.div 
                            className={style.progressbarArea}
                            initial={{ opacity: 0, y: 20 }}  
                            animate={{ opacity: 1, y: 0 }}   
                            transition={{ duration: 0.3, delay: 0.2 }}
                        >
                        <AnimatePresence mode="wait">
                            <motion.h2
                                key = {activeText}
                                variants={numberVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                                {activeText} 
                            </motion.h2>
                        </AnimatePresence>
                        <h2>/ 3</h2>
                            <motion.div
                                className={style.progressbar}
                                animate={{ scaleX: activeText/3 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            />
                        <div className={style.progressbarBackground}/>
                    </motion.div>
                    )}
                </div>
            </div>
        </div>
    )
});

export default Approach;