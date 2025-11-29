'use client';

import React from 'react';

export interface ProjectInfo {
    goal?: string;
    result?: string;
    term?: string;
}

export interface Project {
    id: string;
    title: string;
    info: ProjectInfo;
    details: string[];
}

interface ProjectItemProps {
    project: Project;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ project }) => {
    return (
        <div className="projectBox">
            <div className="projectName">{project.title}</div>
            
            <div className="projectInfo">
                {project.info.goal && <div>목표: {project.info.goal}</div>}
                {project.info.result && <div>결과: {project.info.result}</div>}
                {project.info.term && <div>소요 기간: {project.info.term}</div>}
            </div>

            <div className="projectDetail">
                <div style={{ marginTop: "10px", marginBottom:"5px" }}>상세사항:</div>
                <ul className="list">
                    {project.details.map((detail, idx) => (
                        <li key={idx}>{detail}</li>
                    ))}
                </ul>
            </div>

            <style jsx>{`
                .projectBox {
                    border: 1px solid #333; 
                    border-radius: 12px;    
                    padding: 24px;
                    background-color: #1F1F1F; 
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }

                .projectName {
                    font-size: 1.3rem;
                    font-weight: 700;
                    margin-bottom: 4px;
                    color: #fff;
                }

                .projectInfo {
                    font-size: 0.95rem;
                    color: #ccc;
                    line-height: 1.6;
                }

                .list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }

                .list li {
                    position: relative;
                    padding-left: 20px;
                    margin-bottom: 8px;
                    line-height: 1.5;
                    font-size: 1rem;
                    color: #eee;
                }

                .list li::before {
                    content: "•";
                    color: #F28705; 
                    position: absolute;
                    left: 0;
                    font-weight: bold;
                }

                .projectDetail {
                    color: #fff;
                }
            `}</style>
        </div>
    );
};

export default ProjectItem;