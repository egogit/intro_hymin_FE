import axios from "axios";
import React from "react";
import {useState, useEffect} from "react";
import name from "../assets/name.png";

const styles={
    cvContainer:{
        display:'flex',
        paddingBottom: '20px',
    },
    cvTitle:{
        color: '#003b6c',
        borderTop: '2px solid #003b6c',
        borderBottom: '2px solid #003b6c'
    },
    termContainer:{
        width: 100,
    },
    cvElementContainer:{
        flexDirection: 'column'
    },
}

function CVContent(props){

    const [userInfo, setUserInfo] = useState([]);
    const [userExp, setUserExp] = useState([]);
    const [userEducation, setUserEducation] = useState([]);
    const [userCertificate, setUserCertificate] = useState([]);
    const [userProject, setUserProject] = useState([]);
    const [userExtraActivity, setUserExtraActivity] = useState([]);

    const baseURL ="http://localhost:8080/api/user"

    useEffect(() => {
        axios.get(baseURL+"/info").then((res) => {
            setUserInfo([res.data[0]["intro"]]);
        }).catch((err) =>{
            console.log(err);
        })
    },[])

    useEffect(() => {
        axios.get(baseURL+"/experience").then((res) => {
            setUserExp([]);
            res.data.map((exp)=>{
                setUserExp( (userExp) =>
                    [...userExp, [exp["id"], exp["type"], exp["name"],
                        exp["location"], exp["term"],exp['content']]])
            })
        }).catch((err) =>{
            console.log(err);
        })
    },[])

    useEffect(() => {
        axios.get(baseURL+"/education").then((res) => {
            setUserEducation([]);
            res.data.map((exp)=>{
                setUserEducation( (userEducation) =>
                    [...userEducation, [exp["id"], exp["major"], exp["type"],
                        exp["degree"], exp["school"],exp['GPA'],exp['relatedSubject']
                    , exp['term']]])
            })
        }).catch((err) =>{
            console.log(err);
        })
    },[])

    useEffect(() => {
        axios.get(baseURL+"/certificate").then((res) => {
            setUserCertificate([]);
            res.data.map((exp)=>{
                setUserCertificate( (userCertificate) =>
                    [...userCertificate, [exp["id"], exp["name"], exp["organization"], exp["date"]]]
                )
            })
        }).catch((err) =>{
            console.log(err);
        })
    },[])

    useEffect(() => {
        axios.get(baseURL+"/project").then((res) => {
            setUserProject([]);
            res.data.map((project)=>{
                setUserProject( (userProject) =>
                    [...userProject, [project["id"], project["name"], project["stack"], project["content"],
                    project["contribution"],project["term"]]]
                )
            })
        }).catch((err) =>{
            console.log(err);
        })
    },[])

    useEffect(() => {
        axios.get(baseURL+"/extracurriculum").then((res) => {
            setUserExtraActivity([]);
            res.data.map((activity)=>{
                setUserExtraActivity( (userExtraActivity) =>
                    [...userExtraActivity, [activity["id"], activity["name"],
                        activity["content"], activity["term"]]]
                )
            })
        }).catch((err) =>{
            console.log(err);
        })
    },[])

    // TODO: refactor duplicated things & insert other data & ui

    return (
        <div>
            <img src={name} alt="Hyunmin Ahn<br>BE Developer"/>
            <div>
                {userInfo[0]}
            </div>
            <div>
                <div>
                    <h3 style={styles.cvTitle}>Experience</h3>
                </div>
                <div style={styles.cvElementContainer}>
                    {

                        userExp.map((exp) => {
                            return(
                                <div key={exp[0]} style={styles.cvContainer}>
                                    <div style={styles.termContainer}>
                                        {exp[4]}
                                    </div>
                                    <div>
                                        <div><b>{exp[3]} ({exp[2]}, {exp[1]})</b></div>
                                        {exp[5]}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div>
                <div>
                    <h3 style={styles.cvTitle}>Education</h3>
                </div>
                <div style={styles.cvElementContainer}>
                    {
                        userEducation.map((education) => {
                            return(
                                <div key={education[0]} style={styles.cvContainer}>
                                    <div style={styles.termContainer}>
                                        {education[7]}
                                    </div>
                                    <div>
                                        <div><b>{education[1]}, {education[3]}</b> </div>
                                        <div><i>{education[4]}</i></div>
                                        <div><b>GPA: </b>{education[5]}</div>
                                        <div><b>Related coursework:</b>{education[6]}</div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div>
                <div>
                    <h3 style={styles.cvTitle}>Certificate</h3>
                </div>
                <div style={styles.cvElementContainer}>
                    {
                        userCertificate.map((certificate) => {
                            return(
                                <div key={certificate[0]} style={styles.cvContainer}>
                                    <div style={styles.termContainer}>
                                        {certificate[3]}
                                    </div>
                                    <div>
                                        <div><b>{certificate[1]}</b></div>
                                        <div>{certificate[2]}</div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div>
                <div>
                    <h3 style={styles.cvTitle}>Projects</h3>
                </div>
                <div style={styles.cvElementContainer}>
                    {
                        userProject.map((project) => {
                            return(
                                <div key={project[0]} style={styles.cvContainer}>
                                    <div style={styles.termContainer}>
                                        {project[5]}
                                    </div>
                                    <div>
                                        <div><b>{project[1]}</b></div>
                                        <div><b>Stack:</b> {project[2]}</div>
                                        <div><b>Content:</b> {project[3]}</div>
                                        <div><b>Contribution:</b> {project[4]}%</div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div>
                <div>
                    <h3 style={styles.cvTitle}>Extra Activity</h3>
                </div>
                <div style={styles.cvElementContainer}>
                    {
                        userExtraActivity.map((activity) => {
                            return(
                                <div key={activity[0]} style={styles.cvContainer}>
                                    <div style={styles.termContainer}>
                                        {activity[3]}
                                    </div>
                                    <div>
                                        <div><b>{activity[1]}</b></div>
                                        <div>{activity[2]}</div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default CVContent;