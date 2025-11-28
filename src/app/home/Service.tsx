import React, { forwardRef, useRef, useImperativeHandle } from "react";
import style from "./service.module.css"
import {motion, useScroll, useTransform} from "framer-motion"

const projectData = [
    {
        id: 1,
        title: "MoviLink : 차량 실시간 모니터링 및 원격 제어 플랫폼",
        color: "#333", 
        metaInfo: [
            "url : ~~",
            "기간 : 25.03.18 ~ 25.03.27",
            "개발인원 : 4명",
            "역할 : PM / 데이터 처리 서버 및 통신 기능 개발"
        ],
        techStack: "React / Node.js / C++",
        details: [
            {
                subTitle: "ESP32 모듈 제작",
                items: [
                    "UART 통신을 통해 기기 본체와 데이터 송수신",
                    "WebSocket을 통한 서버와 양방향 통신 구현"
                ]
            },
            {
                subTitle: "백엔드 서버 구축",
                items: [
                    "수집한 데이터 실시간 시각화 및 DB 저장",
                    "DB 저장 로직을 비동기 백그라운드 작업으로 전환하여 데이터 처리와 저장 로직 분리 \n-> 병목현상 개선 및 반응성 개선",
                    "차량 제어 API 개발"
                ]
            },
            {
                subTitle: "프론트엔드 개발",
                items: [
                    "문 열림, 주행 여부 등 차량 상태 시각화",
                    "실시간 센서 데이터 시각화"
                ]
            }
        ]
    },
        {
        id: 2,
        title: "MoviLink : 차량 실시간 모니터링 및 원격 제어 플랫폼",
        color: "#333", // 실제 이미지 경로가 있다면 img src로 대체
        // 1. 상단 메타 정보 (회색 텍스트)
        metaInfo: [
            "url : ~~",
            "기간 : 25.03.18 ~ 25.03.27",
            "개발인원 : 4명",
            "역할 : PM / 데이터 처리 서버 및 통신 기능 개발"
        ],
        // 2. 기술 스택 (노란색 강조)
        techStack: "React / Node.js / C++",
        // 3. 하단 상세 내용 (소제목 + 리스트)
        details: [
            {
                subTitle: "ESP32 모듈 제작",
                items: [
                    "UART 통신을 통해 기기 본체와 데이터 송수신",
                    "WebSocket을 통한 서버와 양방향 통신 구현"
                ]
            },
            {
                subTitle: "백엔드 서버 구축",
                items: [
                    "수집한 데이터 실시간 시각화 및 DB 저장",
                    "DB 저장 로직을 비동기 백그라운드 작업으로 전환하여 데이터 처리와 저장 로직 분리 -> 병목현상 개선 및 반응성 개선",
                    "차량 제어 API 개발"
                ]
            },
            {
                subTitle: "프론트엔드 개발",
                items: [
                    "문 열림, 주행 여부 등 차량 상태 시각화",
                    "실시간 센서 데이터 시각화"
                ]
            }
        ]
    },
        {
        id: 3,
        title: "MoviLink : 차량 실시간 모니터링 및 원격 제어 플랫폼",
        color: "#333", // 실제 이미지 경로가 있다면 img src로 대체
        // 1. 상단 메타 정보 (회색 텍스트)
        metaInfo: [
            "url : ~~",
            "기간 : 25.03.18 ~ 25.03.27",
            "개발인원 : 4명",
            "역할 : PM / 데이터 처리 서버 및 통신 기능 개발"
        ],
        // 2. 기술 스택 (노란색 강조)
        techStack: "React / Node.js / C++",
        // 3. 하단 상세 내용 (소제목 + 리스트)
        details: [
            {
                subTitle: "ESP32 모듈 제작",
                items: [
                    "UART 통신을 통해 기기 본체와 데이터 송수신",
                    "WebSocket을 통한 서버와 양방향 통신 구현"
                ]
            },
            {
                subTitle: "백엔드 서버 구축",
                items: [
                    "수집한 데이터 실시간 시각화 및 DB 저장",
                    "DB 저장 로직을 비동기 백그라운드 작업으로 전환하여 데이터 처리와 저장 로직 분리 -> 병목현상 개선 및 반응성 개선",
                    "차량 제어 API 개발"
                ]
            },
            {
                subTitle: "프론트엔드 개발",
                items: [
                    "문 열림, 주행 여부 등 차량 상태 시각화",
                    "실시간 센서 데이터 시각화"
                ]
            }
        ]
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
                <h4>Projects</h4>
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
                            viewport={{once: true, amount: 0.2}}
                            transition={{ duration: 0.5 }}
                        >
                            <div className={style.imagePlaceholder}>
                                <span style={{color: '#fff'}}>이미지</span>
                                {/* <img src={project.image} alt={project.title} /> */}
                            </div>
                        </motion.div>
                        <motion.div
                            className={style.mainText}
                            variants={textVariants}
                            initial="initial"
                            whileInView="animate"
                            viewport={{once: true, amount: 0.5}}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <div className={style.metaInfo}>
                                {project.metaInfo.map((line, index) => (
                                    <p key={index}>{line}</p>
                                ))}
                            </div>

                            <div className={style.techStack}>
                                <span className={style.techLabel}>사용 기술 : </span>
                                <span className={style.techValue}>{project.techStack}</span>
                            </div>

                            <div className={style.detailSections}>
                                {project.details.map((section, idx) => (
                                    <div key={idx} className={style.detailBlock}>
                                        <h4>{section.subTitle}</h4>
                                        <ul>
                                            {section.items.map((item, i) => (
                                                <li key={i}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
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