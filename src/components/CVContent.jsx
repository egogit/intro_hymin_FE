import axios from "axios";
import React from "react";
import {useState, useEffect} from "react";
import name from "../assets/name.png";

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

    const [userInfo, setUserInfo] = useState([]);
    const [userExp, setUserExp] = useState([]);
    const [userEducation, setUserEducation] = useState([]);
    const [userCertificate, setUserCertificate] = useState([]);
    const [userProject, setUserProject] = useState([]);
    const [userExtraActivity, setUserExtraActivity] = useState([]);


    const [userInfoCurrent, setUserInfoCurrent] = useState({"id": 1, "intro": null})
    const [userExpCurrent, setUserExpCurrent] = useState({"id":"","type":"","name":"","location":"","startDate":"","endDate":"","content":""});
    const [userEducationCurrent, setUserEducationCurrent] = useState({"id":"","major":"","type":"","degree":"","school":"","GPA":"","relatedSubject":"","startDate":"","endDate":""});
    const [userCertificateCurrent, setUserCertificateCurrent] = useState({"id":"","name":"","organization":"","acqDate":""});
    const [userProjectCurrent, setUserProjectCurrent] = useState({"id":"","name":"","stack":"","content":"","contribution":"","startDate":"","endDate":""});
    const [userExtraActivityCurrent, setUserExtraActivityCurrent] = useState({"id":"","name":"","content":""});

    const [showInfoUpdate, setShowInfoUpdate] = useState(false);
    const [showExpUpdate, setShowExpUpdate] = useState(false);
    const [showEducation, setShowEducationUpdate] = useState(false);
    const [showCertificate, setShowCertificateUpdate] = useState(false);
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
    })

    useEffect(() => {
        axios.get(baseURL+"/info").then((res) => {
            setUserInfo([res.data[0]["intro"]]);
        }).catch((err) =>{
            console.log(err);
        })
    },[showInfoUpdate])

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
    },[showExpUpdate])

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
    },[showEducation])

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
    },[showCertificate])

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

    const toggleInfoUpdateForm = () => {
        setShowInfoUpdate(prevState => !prevState);
    }

    const toggleExpUpdateForm = () => {
        setShowExpUpdate(prevState => !prevState);
    }

    const updateUserInfo = () => {
        axios.post(baseURL+"/info/update",{
            id: userInfoCurrent.id,
            intro: userInfoCurrent.intro
        }).then((res) => {
            console.log(res)
        }).catch((err) =>{
            console.log(err);
        })
    }

    const updateUserExp = () => {
        axios.post(baseURL+"/experience/update",{
            id: userExpCurrent.id,
            type: userExpCurrent.type,
            name: userExpCurrent.name,
            location: userExpCurrent.location,
            content: userExpCurrent.content,
            startDate: userExpCurrent.startDate,
            endDate: userExpCurrent.endDate,
        }).then((res) => {
            console.log(res)
        }).catch((err) =>{
            console.log(err);
        })
    }

    return (
        <div style={styles.cvContentContainer}>
            <img src={name} alt="Hyunmin Ahn<br>BE Developer"/>
            <div>
                {userInfo[0]}
                {
                    isLogin && showInfoUpdate ? (
                        <form>
                            Intro:
                            <input style={styles.inputContainer} type="text" value={userInfoCurrent.intro || userInfo[0]} onChange={
                                (e) =>
                                {
                                    setUserInfoCurrent({"id": 1, "intro": e.target.value})
                                }}
                            /><br />
                            <button onClick={updateUserInfo}>Update</button>
                        </form>
                    ) : (
                        <div>
                            <button onClick={toggleInfoUpdateForm}>Update</button>
                        </div>
                    )
                }
            </div>
            <div>
                <div>
                    <h3 style={styles.cvTitle}>Experience</h3>
                </div>
                <div style={styles.cvElementContainer}>
                    {

                        userExp.map((exp) => {
                            return(
                                <div key={exp[0]}>
                                    <div style={styles.cvContainer}>
                                        <div style={styles.termContainer}>
                                            {exp[4]}
                                        </div>
                                        <div>
                                            <div><b>{exp[3]} ({exp[2]}, {exp[1]})</b></div>
                                            {exp[5]}
                                        </div>
                                    </div>
                                    {
                                        isLogin && showExpUpdate ? (
                                            <form>
                                                <input style={styles.inputContainer} type="hidden" value={exp[0]} onChange={
                                                    (e) =>
                                                    {
                                                        setUserExpCurrent(prevState => {prevState.id = e.target.value;})
                                                    }}
                                                readOnly={true}/><br />
                                                Position:
                                                <input style={styles.inputContainer} type="text" value={userExpCurrent.name || exp[2]} onChange={
                                                    (e) =>
                                                    {
                                                        setUserExpCurrent(prevState => {prevState.name = e.target.value})
                                                    }}
                                                /><br />
                                                Location:
                                                <input style={styles.inputContainer} type="text" value={userExpCurrent.location || exp[3]} onChange={
                                                    (e) =>
                                                    {
                                                        setUserExpCurrent(prevState => {prevState.location = e.target.value})
                                                    }}
                                                /><br />
                                                Type:
                                                <input style={styles.inputContainer} type="text" value={userExpCurrent.type || exp[1]} onChange={
                                                    (e) =>
                                                    {
                                                        setUserExpCurrent(prevState => {prevState.type = e.target.value})
                                                    }}
                                                /><br />
                                                Content:
                                                <input style={styles.inputContainer} type="text" value={userExpCurrent.content || exp[5]} onChange={
                                                    (e) =>
                                                    {
                                                        setUserExpCurrent(prevState => {prevState.content = e.target.value})
                                                    }}
                                                /><br />
                                                StartDate:
                                                <input style={styles.inputContainer} type="text" value={userExpCurrent.startDate || exp[4].substring(0,8)} onChange={
                                                    (e) =>
                                                    {
                                                        setUserExpCurrent(prevState => {prevState.startDate = e.target.value})
                                                    }}
                                                /><br />
                                                EndDate:
                                                <input style={styles.inputContainer} type="text" value={userExpCurrent.endDate || exp[4].substring(10)} onChange={
                                                    (e) =>
                                                    {
                                                        setUserExpCurrent(prevState => {prevState.endDate = e.target.value})
                                                    }}
                                                /><br />
                                                <button onClick={updateUserExp}>Update</button>
                                            </form>
                                        ) : (
                                            <div>
                                                <button onClick={toggleExpUpdateForm}>Update</button>
                                            </div>
                                        )
                                    }
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