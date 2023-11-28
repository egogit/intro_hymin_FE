import axios from "axios";
import React from "react";
import {useState, useEffect} from "react";
import InputContainer from "../ui/InputContainer";
import CVTitle from "../ui/CVTitle";
import TermContainer from "../ui/TermContainer";

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

    const [showEducationUpdate, setShowEducationUpdate] = useState(false);
    const [selectedEducation, setSelectedEducation] = useState(null);

    const [id, setId] = useState("");
    const [major, setMajor] = useState("");
    const [type, setType] = useState(-1);
    const [degree, setDegree] = useState("");
    const [school, setSchool] = useState("");
    const [GPA, setGPA] = useState(0.0);
    const [relatedSubject, setRelatedSubject] = useState("");

    const baseURL = "http://localhost:8080/api/user"

    useEffect(() => {
        axios.get(baseURL + "/education").then((res) => {
            setUserEducation([]);
            res.data.map((exp) => {
                setUserEducation((userEducation) =>
                    [...userEducation, [exp["id"], exp["major"], exp["type"],
                        exp["degree"], exp["school"], exp['GPA'], exp['relatedSubject']
                        ]])
            })
        }).catch((err) => {
            console.log(err);
        })
    }, [showEducationUpdate])

    const toggleEducationUpdateForm = (edu, e) => {
        setShowEducationUpdate(prevState => !prevState);
        setId(edu[0]);
        setMajor(edu[1]);
        setType(1);
        setDegree(edu[3]);
        setSchool(edu[4]);
        setGPA(edu[5]);
        setRelatedSubject(edu[6]);

        setSelectedEducation(edu[0]);
    }

    const updateUserEducation = () => {
        axios.post(baseURL + "/education/update", {
            id: id,
            major: major,
            type: 1,
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
                                        <div><b>{edu[1]}, {edu[3]}</b></div>
                                        <div><i>{edu[4]}</i></div>
                                        <div><b>GPA: </b>{edu[5]}</div>
                                        <div><b>Related coursework:</b>{edu[6]}</div>
                                    </div>
                                </div>
                                {
                                    props.islogin && isEditing ? (
                                        <form>
                                            <InputContainer type={"hidden"} value={edu[0]} onChange={
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
                                            <button onClick={updateUserEducation}>Update</button>
                                        </form>
                                    ) : (
                                        <div>
                                            <button onClick={(e) => toggleEducationUpdateForm(edu, e)}>Update</button>
                                        </div>
                                    )
                                }
                            </div>
                        )

                    })
                }
            </div>
        </div>
    )
}

export default UserEducation;