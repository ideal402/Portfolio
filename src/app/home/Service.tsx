import React from "react";
import style from "./service.module.css"

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
    }
];

function Service(){
    return(
        <div className={style.mainContainer}>
            <div className={style.topArea}>
                <div className={style.topLine}></div>
                <h3>Projects</h3>
            </div>
            
            {projectData.map((project) => (
                <div key={project.id} className={style.projectArea}>
                    <div className={style.projectheader}>
                        <div className={style.headerLine}></div>
                        <h1>{project.title}</h1>
                    </div>
                    <div className={style.projectMain}>
                        <div className={style.mainImege}>
                            <img 
                                style={{
                                    backgroundColor: project.color, 
                                    width: "400px", 
                                    height: "260px"
                                }}
                                alt={project.title}
                            />
                        </div>
                        <div className={style.mainText}>
                            <h1>{project.lines[0]}</h1>
                            <h1>{project.lines[1]}</h1>
                            <h1>{project.lines[2]}</h1>
                        </div>
                    </div>
                </div>
            ))}
            <div className={style.leftLine}/>
        </div>
    )
}

export default Service