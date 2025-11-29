'use client';

import React, { forwardRef, useRef, useImperativeHandle } from "react";
import { motion } from "framer-motion";
import style from "./career.module.css";
import ProjectItem, { Project } from "../../components/ProjectItem"; // Project 타입 import

// Career 데이터 타입 정의
interface CareerData {
    id: number;
    company: string;
    role: string;
    period: string;
    works: string[];
    projects: Project[];
}

const CAREER_DATA: CareerData[] = [
    {
        id: 1,
        company: "현대 지아이티",
        role: "PM | 전장사업팀 | 매니저",
        period: "2025. 04 ~ 2025. 10",
        works: [
            "UDS 프로토콜 및 CAN 통신 로그 분석",
            "신규 서비스 기획안 작성",
            "프로젝트 일정/진행도 관리 및 진행"
        ],
        projects: [ 
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
            {
                id: "p2", 
                title: "진단기 앱 UI/UX 개선",
                info: {
                    goal: "사용자 편의성 증대를 위한 인터페이스 개편",
                    result: "현장 엔지니어 만족도 30% 증가",
                    term: "2개월"
                },
                details: [
                    "현장 사용자 인터뷰를 통한 페인포인트 도출",
                    "Figma를 활용한 프로토타입 제작 및 A/B 테스트 진행"
                ]
            }
        ]
    },
    {
        id: 2,
        company: "IBK 기업은행",
        role: "디지털추진팀 | 청년인턴",
        period: "2025. 01 ~ 2025. 02",
        works: [ 
            "UDS 프로토콜 및 CAN 통신 로그 분석",
            "신규 서비스 기획안 작성",
            "프로젝트 일정/진행도 관리 및 진행"
        ],
        projects:[],
    },
    {
        id: 3,
        company: "KIST(한국과학기술연구원)",
        role: "학생인턴 | 바이오닉스연구팀",
        period: "2023. 09 ~ 2024. 02",
        works: [
            "UDS 프로토콜 및 CAN 통신 로그 분석",
            "신규 서비스 기획안 작성",
            "프로젝트 일정/진행도 관리 및 진행"
        ],
        projects: [ 
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
            {
                id: "p2", 
                title: "진단기 앱 UI/UX 개선",
                info: {
                    goal: "사용자 편의성 증대를 위한 인터페이스 개편",
                    result: "현장 엔지니어 만족도 30% 증가",
                    term: "2개월"
                },
                details: [
                    "현장 사용자 인터뷰를 통한 페인포인트 도출",
                    "Figma를 활용한 프로토타입 제작 및 A/B 테스트 진행"
                ]
            }
        ]
    },
];

interface CareerProps {}

const Career = forwardRef<HTMLDivElement, CareerProps>(function Career(props, forwardedRef) {
    const localRef = useRef<HTMLDivElement>(null);    
    
    useImperativeHandle(forwardedRef, () => localRef.current as HTMLDivElement);
    
    return(
        <>
            <motion.div 
                ref={localRef}
                className={style.mainContainer}
                initial={{opacity:0}}
                whileInView={{opacity: 1}}
                viewport={{
                    once:false,
                    margin: "0px 0px -100% 0px",
                }}
                transition={{duration: 0.5}}
            >
                <h1 className={style.pageName}>Career</h1>

               {CAREER_DATA.map((career) => (
                    <div key={career.id} className={style.careerBox}>
                        
                        <div className={style.careerHeader}>
                            <h1>{career.company}</h1>
                        </div>

                        <div className={style.careerBody}>
                            <div className={style.careerInfo}>
                                <h3 className={style.job}>{career.role}</h3>
                                <h3 className={style.duration}>{career.period}</h3>
                            </div>
                            <div className={style.careerWork}>
                                <ul className={style.list}>
                                    {career.works.map((work, index) => (
                                        <li key={index}>{work}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {career.projects.map((project) => (
                            <ProjectItem key={project.id} project={project} />
                        ))}
                    </div>
                ))}
            </motion.div>
        </>
    )
});

export default Career;