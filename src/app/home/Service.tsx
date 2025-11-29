import React, { forwardRef, useRef, useImperativeHandle } from "react";
import style from "./service.module.css"
import {motion, useScroll, useTransform} from "framer-motion"
import ProjectItem, { Project as Issue } from "../../components/ProjectItem"; // Project 타입 import

interface DetailItem {
    subTitle: string;
    items: string[];
}

interface MediaItem {
    type: 'video' | 'image';
    src: string;
    label?: string; 
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
    links?: {
        readme?: string;
        website?: string;
    };
    issue?:Issue[];
}


const getYouTubeEmbedUrl = (url: string): string => {
    if (!url) return "";
    if (url.includes("/embed/")) return url;
    
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
        ? `https://www.youtube.com/embed/${match[2]}`
        : url;
};


const HorizontalGallery = ({ items }: { items: MediaItem[] }) => {
    const targetRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"],
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-57%"]);

    return (
        <div ref={targetRef} className={style.horizontalSection}>
            <div className={style.stickyWrapper}>
                <motion.div style={{ x }} className={style.cardContainer}>
                    {items.map((item, index) => (
                        <div key={index} className={style.horizontalCard}>
                            <div className={style.hCardHeader}>
                                <span className={style.hCardLabel}>{item.label}</span>
                                <span className={style.hCardIndex}>0{index + 1}</span>
                            </div>
                            <div className={style.hCardBody}>
                                {item.type === 'video' ? (
                                    <iframe
                                        src={getYouTubeEmbedUrl(item.src)}
                                        title={item.label}
                                        style={{ width: '100%', height: '100%', border: 'none' }}
                                        allowFullScreen
                                    />
                                ) : (
                                    <img src={item.src} alt={item.label} />
                                )}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};
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
        links: {
            readme: "https://github.com/ideal402/Hyundai-embedded-project",
            website: "https://movilink.netlify.app" 
        },
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
        ],
        issue: [ 
            {
                id: "p1",
                title: "검사장비 AI 예지보전 설계",
                info: { 
                    goal: "검사장비 이상을 선제적으로 탐지하는 AI 기술 개발",
                    result: "현대모비스 PoC 단계 협의 진행",
                    term: "4개월"
                },
                details: [ 
                    "검사데이터 1만 3천건 분석 -> 가용한 데이터 선별, 활용할 AI 모델 선정",
                    "데이터 수집, 분석 파이프라인 설계 및 초기 시스템 개발"
                ]
            },
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

    const cardVariants = {
        initial: { opacity: 0, y: 50 },
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
                            {project.links && (
                                <div className={style.linkBtnArea}>
                                    {project.links.readme && (
                                        <a 
                                            href={project.links.readme} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className={`${style.visitBtn} ${style.githubBtn}`}
                                        >
                                            README
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{marginLeft: '8px'}}>
                                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405 1.02 0 2.04.135 3 .405 2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                                            </svg>
                                        </a>
                                    )}
                                    {project.links.website && (
                                        <a 
                                            href={project.links.website} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className={style.visitBtn}
                                        >
                                            Visit Web
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginLeft: '8px'}}>
                                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                                <polyline points="15 3 21 3 21 9"></polyline>
                                                <line x1="10" y1="14" x2="21" y2="3"></line>
                                            </svg>
                                        </a>
                                    )}
                                </div>
                            )}
                            
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
                    {project.issue?.map((project) => (
                        <div className={style.projectIssue}>
                            <ProjectItem key={project.id} project={project} />
                        </div>
                    ))}
                    {project.subImages && project.subImages.length > 0 && (
                        <div className={style.projectSub}>
                            <HorizontalGallery items={project.subImages} />
                        </div>
                    )}
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