import axios from "axios";
import React from "react";
import {useState, useEffect} from "react";
import name from "../assets/name.png";

import UserInfo from "./UserInfo";
import UserExp from "./UserExp";
import UserEducation from "./UserEducation";
import UserCertificate from "./UserCertificate";

const styles={
    cvContentContainer:{
        width: "800px",
    },
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
    inputContainer: {
        width: "80%",
        height: 32,
        fontSize: 15,
        border: 0,
        borderRadius: 15,
        outline: "none",
        paddingLeft: 10,
        backgroundColor: "rgb(233, 233, 233)",
    }
}

function CVContent(props){

    const [isLogin, setIsLogin] = useState(false);

    const [userProject, setUserProject] = useState([]);
    const [userExtraActivity, setUserExtraActivity] = useState([]);


    const [userProjectCurrent, setUserProjectCurrent] = useState({"id":"","name":"","stack":"","content":"","contribution":"","startDate":"","endDate":""});
    const [userExtraActivityCurrent, setUserExtraActivityCurrent] = useState({"id":"","name":"","content":""});

    const [showProject, setShowProjectUpdate] = useState(false);
    const [showExtraActivity, setShowExtraActivityUpdate] = useState(false);

    const sessionURL ="http://localhost:8080/api/auth";
    const baseURL ="http://localhost:8080/api/user"

    useEffect(() => {
        axios.get(sessionURL+'/checkSession').then((res) => {
            let result = res.data.status === 'success';
            setIsLogin(result);
        }).catch((err) => {
            alert("오류가 발생하였습니다.")
        })
    },[isLogin])

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
    },[showProject])

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
    },[showExtraActivity])

    return (
        <div style={styles.cvContentContainer}>
            <img src={name} alt="Hyunmin Ahn<br>BE Developer"/>
            <UserInfo islogin={isLogin} />
            <UserExp islogin={isLogin} />
            <UserEducation islogin={isLogin}/>
            <UserCertificate islogin={isLogin}/>
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