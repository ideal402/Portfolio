import React, { forwardRef, useRef, useImperativeHandle } from "react";
import {motion } from "framer-motion";
import style from "./career.module.css";

const CAREER_DATA = [
    {
        id: 1,
        company: "현대 지아이티",
        role: "PM | 전장사업팀 | 매니저",
        period: "2025. 04 ~ 2025. 10",
        works: [ // 주요 업무 리스트
            "UDS 프로토콜 및 CAN 통신 로그 분석",
            "신규 서비스 기획안 작성",
            "프로젝트 일정/진행도 관리 및 진행"
        ],
        projects: [ // 프로젝트 리스트 (여러 개 가능)
            {
                id: "p1",
                title: "검사장비 AI 예지보전 설계",
                info: { // 프로젝트 개요
                    goal: "검사장비 이상을 선제적으로 탐지하는 AI 기술 개발",
                    result: "현대모비스 PoC 단계 협의 진행",
                    term: "4개월"
                },
                details: [ // 상세 사항
                    "검사데이터 1만 3천건 분석 -> 가용한 데이터 선별, 활용할 AI 모델 선정",
                    "데이터 수집, 분석 파이프라인 설계 및 초기 시스템 개발"
                ]
            },
            {
                id: "p2", // 두 번째 프로젝트 예시
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
        company: "현대 지아이티",
        role: "PM | 전장사업팀 | 매니저",
        period: "2025. 04 ~ 2025. 10",
        works: [ // 주요 업무 리스트
            "UDS 프로토콜 및 CAN 통신 로그 분석",
            "신규 서비스 기획안 작성",
            "프로젝트 일정/진행도 관리 및 진행"
        ],
        projects: [ // 프로젝트 리스트 (여러 개 가능)
            {
                id: "p1",
                title: "검사장비 AI 예지보전 설계",
                info: { // 프로젝트 개요
                    goal: "검사장비 이상을 선제적으로 탐지하는 AI 기술 개발",
                    result: "현대모비스 PoC 단계 협의 진행",
                    term: "4개월"
                },
                details: [ // 상세 사항
                    "검사데이터 1만 3천건 분석 -> 가용한 데이터 선별, 활용할 AI 모델 선정",
                    "데이터 수집, 분석 파이프라인 설계 및 초기 시스템 개발"
                ]
            },
            {
                id: "p2", // 두 번째 프로젝트 예시
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


const Career = forwardRef (function Career(props, forwardedRef) {
    const localRef = useRef(null);    
    useImperativeHandle(forwardedRef, () => localRef.current);
    
    return(
        <>
            <motion.div 
                ref={localRef}
                className={style.mainContainer}
                initial = {{opacity:0}}
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

                        {/* 3. 프로젝트 리스트 (여러 개일 경우 아래로 쌓임) */}
                        {career.projects.map((project) => (
                            <div key={project.id} className={style.projectBox}>
                                <div className={style.projectName}>{project.title}</div>
                                
                                <div className={style.projectInfo}>
                                    {project.info.goal && <div>목표: {project.info.goal}</div>}
                                    {project.info.result && <div>결과: {project.info.result}</div>}
                                    {project.info.term && <div>소요 기간: {project.info.term}</div>}
                                </div>

                                <div className={style.projectDetail}>
                                    <div style={{ marginTop: "10px", marginBottom:"5px" }}>상세사항:</div>
                                    <ul className={style.list}>
                                        {project.details.map((detail, idx) => (
                                            <li key={idx}>{detail}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </motion.div>
        </>
    )
});

export default Career