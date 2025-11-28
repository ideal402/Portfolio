import React, { forwardRef, useRef, useImperativeHandle } from "react";
import style from "./service.module.css"
import {motion, useScroll, useTransform} from "framer-motion"

interface DetailItem {
    subTitle: string;
    items: string[];
}

interface MediaItem {
    type: 'video' | 'image';
    src: string;
    label?: string; // 하단 서브 이미지/영상에만 사용되는 라벨
}

interface ProjectItem {
    id: number;
    title: string;
    color: string;
    mainMedia: {
        type: 'video' | 'image';
        src: string;
    };
    metaInfo: string[];
    techStack: string;
    details: DetailItem[];
    subImages?: MediaItem[];
}

// 2. 유튜브 URL 변환 함수 (타입 명시)
const getYouTubeEmbedUrl = (url: string): string => {
    if (!url) return "";
    if (url.includes("/embed/")) return url;
    
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
        ? `https://www.youtube.com/embed/${match[2]}`
        : url;
};

// 3. 데이터 (ProjectItem 타입 적용)
const projectData: ProjectItem[] = [
    {
        id: 1,
        title: "MoviLink : 차량 실시간 모니터링 및 원격 제어 플랫폼",
        color: "#333",
        mainMedia: {
            type: "image",
            src: "/proj1_main.png",
        },
        metaInfo: [
            "Readme: https://github.com/ideal402/Hyundai-embedded-project",
            "기간 : 25.03.18 ~ 25.03.27",
            "개발인원 : 4명",
            "역할 : PM / 데이터 처리 서버 및 통신 기능 개발"
        ],
        techStack: "React / Node.js / C++",
        details: [
            {
                subTitle: "주요기능",
                items: [
                    "웹을 통해 차량을 원격으로 제어할 수 있습니다.",
                    "차량의 상태를 실시간으로 모니터링 할 수 있습니다.",
                ]
            }
        ],
        subImages: [
            { 
                type: "image",
                label: "시스템 아키텍쳐", 
                src: "/proj1_sys.png" 
            },
            { 
                type: "image",
                label: "시스템 아키택쳐", 
                src: "/proj1_sys2.png" 
            },
            { 
                type: "video",
                label: "시연영상", 
                src: "https://www.youtube.com/watch?v=pVm2xc3CM5Q&feature=youtu.be" 
            }
        ]
    },
];


const Service = forwardRef<HTMLDivElement, {}>((props, forwardedRef) => {
    const localRef = useRef<HTMLDivElement>(null);
    
    useImperativeHandle(forwardedRef, () => localRef.current as HTMLDivElement);

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

    const subImageVariants = {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };


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
                            initial="initial"
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
                            viewport={{ once: true, amount: 0.5 }}
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
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className={style.imagePlaceholder}>
                                {/* 메인 미디어 분기 처리 */}
                                {project.mainMedia.type === 'video' ? (
                                    <iframe
                                        src={getYouTubeEmbedUrl(project.mainMedia.src)}
                                        title={`video-${project.title}`}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        style={{ width: '100%', height: '100%', display: 'block' }}
                                    />
                                ) : (
                                    <img 
                                        src={project.mainMedia.src} 
                                        alt={project.title} 
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                    />
                                )}
                            </div>
                        </motion.div>
                        <motion.div
                            className={style.mainText}
                            variants={textVariants}
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true, amount: 0.5 }}
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
                    
                    <div className={style.projectSub}>
                        {project.subImages?.map((subItem, idx) => (
                            <motion.div 
                                key={idx}
                                initial="initial"
                                whileInView="animate"
                                viewport={{ once: true, amount: 0.2 }}
                                variants={subImageVariants}
                            >
                                <div className={style.subTxet}>
                                    {subItem.label}
                                </div>
                                <div className={style.subImege}>
                                    {subItem.type === 'video' ? (
                                         <div style={{ position:'relative', width:'100%', paddingTop:'56.25%' }}> 
                                            <iframe
                                                src={getYouTubeEmbedUrl(subItem.src)}
                                                title={subItem.label || "sub-video"}
                                                style={{ position:'absolute', top:0, left:0, width: '100%', height: '100%' }}
                                                frameBorder="0"
                                                allowFullScreen
                                            />
                                        </div>
                                    ) : (
                                        <img 
                                            src={subItem.src} 
                                            alt={subItem.label || "sub-image"} 
                                            style={{ width: '100%', height: 'auto', display:'block' }} 
                                        />
                                    )}
                                </div>
                            </motion.div>
                        ))}
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