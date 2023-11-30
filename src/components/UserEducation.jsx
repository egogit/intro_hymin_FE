import axios from "axios";
import React from "react";
import {useState, useEffect} from "react";
import InputContainer from "../ui/InputContainer";
import CVTitle from "../ui/CVTitle";
import PlusButton from "./PlusButton";
import {useAuth} from "./AuthContext";

const styles={
    cvContainer:{
        display:'flex',
        paddingBottom: '20px',
    },
    cvElementContainer:{
        flexDirection: 'column'
    },
}
function UserEducation(props) {

    const [userEducation, setUserEducation] = useState([]);
    const [id, setId] = useState("");
    const [major, setMajor] = useState("");
    const [degree, setDegree] = useState("");
    const [school, setSchool] = useState("");
    const [GPA, setGPA] = useState(0.0);
    const [relatedSubject, setRelatedSubject] = useState("");
    const [showEducationUpdate, setShowEducationUpdate] = useState(false);
    const [selectedEducation, setSelectedEducation] = useState(null);
    const [isFormVisible, setIsFormVisible]=useState(false);
    const [isAddFormVisible, setIsAddFormVisible]=useState(false);
    const [deletedEduId, setDeletedEduId] = useState(null);

    const {isAuthenticated} = useAuth();

    const baseURL = "http://localhost:8080/api/user"

    useEffect(() => {
        axios.get(baseURL + "/education").then((res) => {
            setUserEducation([]);
            res.data.map((edu) => {
                setUserEducation((userEducation) =>
                    [...userEducation, [edu["id"], edu["major"],
                        edu["degree"], edu["school"], edu['GPA'], edu['relatedSubject']
                        ]])
            })
        }).catch((err) => {
            console.log(err);
        })
    }, [showEducationUpdate, selectedEducation, isAddFormVisible,deletedEduId])

    const toggleEducationUpdateForm = (edu, e) => {
        e.preventDefault()
        setShowEducationUpdate(prevState => !prevState);
        setId(edu[0]);
        setMajor(edu[1]);
        setDegree(edu[2]);
        setSchool(edu[3]);
        setGPA(edu[4]);
        setRelatedSubject(edu[5]);
        setSelectedEducation(edu[0]);
        setIsFormVisible(true);
        setIsAddFormVisible(false);
    }

    const updateUserEducation = (e) => {
        e.preventDefault();
        axios.post(baseURL + "/education", {
            id: id,
            major: major,
            degree: degree,
            school: school,
            GPA: parseFloat(GPA),
            relatedSubject: relatedSubject,

        }).then((res) => {
            console.log(res)

            setSelectedEducation(null);
        }).catch((err) => {
            console.log(err);
        })
        setIsFormVisible(false);
    }

    const toggleAddForm = (e) => {
        e.preventDefault();
        setIsAddFormVisible((prevState) => !prevState);
        setIsFormVisible(false);
    };

    const addUserEdu = (e) => {
        e.preventDefault();
        if (major==null || degree==null || school==null || GPA==null || relatedSubject==null){
            alert("입력내용은 반드시 입력해주세요.");
            return false;
        }
        axios.post(baseURL+"/education",{
            major: major,
            degree: degree,
            school: school,
            GPA: parseFloat(GPA),
            relatedSubject: relatedSubject,

        }).then((res) => {
            console.log(res);

            setSelectedEducation(null);
        }).catch((err) =>{
            console.log(err);
        })
        setIsAddFormVisible(false);
    };

    const deleteEdu = (edu, e) => {
        e.preventDefault();
        if (edu[0]==null){
            alert("id가 존재하지않는 education 입니다.");
            return false;
        }
        axios.delete(baseURL+"/education",
            { data: { id: edu[0] } }
        ).then((res) => {
            console.log(res);
            setDeletedEduId(edu[0]);
        }).catch((err) =>{
            console.log(err);
        })
        setDeletedEduId(null);
    }

    return (
        <div>
            <CVTitle title="Education"/>
            <div style={styles.cvElementContainer}>
                {
                    userEducation.map((edu) => {
                        const isEditing = selectedEducation === edu[0];

                        return (
                            <div key={edu[0]}>
                                <div style={styles.cvContainer}>
                                    <div>
                                        <div><b>{edu[1]}, {edu[2]}</b></div>
                                        <div><i>{edu[3]}</i></div>
                                        <div><b>GPA: </b>{edu[4]}</div>
                                        <div><b>Related coursework:</b>{edu[5]}</div>
                                    </div>
                                </div>
                                {
                                    isAuthenticated && isEditing ? (
                                        isFormVisible &&(
                                        <form>
                                            <InputContainer type={"hidden"} value={major[0]} onChange={
                                                (e) => {
                                                    setId(e.target.value)
                                                }}
                                            /><br/>
                                            Major:
                                            <InputContainer type={"text"} value={major} onChange={
                                                (e) => {
                                                    setMajor(e.target.value)
                                                }}
                                            /><br/>
                                            Degree:
                                            <InputContainer type={"text"} value={degree} onChange={
                                                (e) => {
                                                    setDegree(e.target.value)
                                                }}
                                            /><br/>
                                            School:
                                            <InputContainer type={"text"} value={school} onChange={
                                                (e) => {
                                                    setSchool(e.target.value)
                                                }}
                                            /><br/>
                                            GPA:
                                            <InputContainer type={"text"} value={GPA} onChange={
                                                (e) => {
                                                    setGPA(e.target.value)
                                                }}
                                            /><br/>
                                            RelatedSubject:
                                            <InputContainer type={"text"} value={relatedSubject} onChange={
                                                (e) => {
                                                    setRelatedSubject(e.target.value)
                                                }}
                                            /><br/>
                                            <button type="submit" onClick={updateUserEducation}>Update</button>
                                        </form>
                                        )
                                    ) : (
                                        isAuthenticated &&(
                                        <div>
                                            <button type="submit" onClick={(e) => toggleEducationUpdateForm(edu, e)}>Update</button>
                                            <button type="submit" onClick={(e) => {deleteEdu(edu,e)}}>Delete</button>
                                        </div>
                                        )
                                    )
                                }
                            </div>
                        )

                    })}
                {
                    isAddFormVisible && (
                        <form>
                            Major:
                            <InputContainer type={"text"} onChange={
                                (e) => {
                                    setMajor(e.target.value)
                                }}
                            /><br/>
                            Degree:
                            <InputContainer type={"text"} onChange={
                                (e) => {
                                    setDegree(e.target.value)
                                }}
                            /><br/>
                            School:
                            <InputContainer type={"text"} onChange={
                                (e) => {
                                    setSchool(e.target.value)
                                }}
                            /><br/>
                            GPA:
                            <InputContainer type={"text"} onChange={
                                (e) => {
                                    setGPA(e.target.value)
                                }}
                            /><br/>
                            RelatedSubject:
                            <InputContainer type={"text"} onChange={
                                (e) => {
                                    setRelatedSubject(e.target.value)
                                }}
                            /><br/>
                            <button type="submit" onClick={addUserEdu}>Add</button>
                        </form>
                    )
                }
            </div>
            {isAuthenticated&& <PlusButton onClick={toggleAddForm}/>}
        </div>
    )
}

export default UserEducation;