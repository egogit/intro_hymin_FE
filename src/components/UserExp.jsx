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
function UserExp(props){

    const [userExp, setUserExp] = useState([]);
    const [id, setId] = useState("");
    const [type, setType] = useState("");
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [content, setContent] = useState("");
    const [contentId, setContentId] = useState("");
    const [showExpUpdate, setShowExpUpdate] = useState(false);
    const [selectedExpUpdate, setSelectedExpUpdate]=useState("");

    const baseURL ="http://localhost:8080/api/user"

    useEffect(() => {
        axios.get(baseURL+"/experience").then((res) => {
            setUserExp([]);
            res.data.map((exp)=>{
                setUserExp( (userExp) =>
                    [...userExp, [exp["id"], exp["type"], exp["name"],
                        exp["location"], exp['content'],exp['expContentId']]])
            })
        }).catch((err) =>{
            console.log(err);
        })
    },[showExpUpdate])

    const toggleExpUpdateForm = (exp, e) => {
        setShowExpUpdate(prevState => !prevState);
        setId(exp[0])
        setType(exp[1])
        setName(exp[2])
        setLocation(exp[3])
        setContent(exp[4])
        setContentId(exp[5])
    }

    const updateUserExp = () => {
        axios.post(baseURL+"/experience/update",{
            id: id,
            type: type,
            name: name,
            location: location,
            content: content,
            expContentId: contentId

        }).then((res) => {
            console.log(res);

            setSelectedExpUpdate(null);
        }).catch((err) =>{
            console.log(err);
        })
    }

    return(
        <div>
            <CVTitle title="Experience"/>
            <div style={styles.cvElementContainer}>
                {
                    userExp.map((exp) => {
                        const isEditing = selectedExpUpdate === exp[0];

                        return(
                            <div key={exp[0]}>
                                <div style={styles.cvContainer}>
                                    <div>
                                        <div><b>{exp[3]} ({exp[2]}, {exp[1]})</b></div>
                                        {exp[4]}
                                    </div>
                                </div>
                                {
                                    props.islogin && isEditing ? (
                                        <form>
                                            <InputContainer type={"hidden"} value={exp[0]} onChange={
                                                (e) =>
                                                {
                                                    setId(e.target.value)
                                                }}
                                            /><br />
                                            Position:
                                            <InputContainer type={"text"} value={name} onChange={
                                                (e) =>
                                                {
                                                    setName(e.target.value)
                                                }}
                                            /><br />
                                            Location:
                                            <InputContainer type={"text"} value={location} onChange={
                                                (e) =>
                                                {
                                                    setLocation(e.target.value)
                                                }}
                                            /><br />
                                            Type:
                                            <InputContainer type={"text"} value={type} onChange={
                                                (e) =>
                                                {
                                                    setType(e.target.value)
                                                }}
                                            /><br />
                                            Content:
                                            <InputContainer type={"text"} value={content} onChange={
                                                (e) =>
                                                {
                                                    setContent(e.target.value)
                                                }}
                                            /><br />
                                            <button onClick={updateUserExp}>Update</button>
                                        </form>
                                    ) : (
                                        props.islogin ? (
                                        <div>
                                            <button onClick={(e) => toggleExpUpdateForm(exp,e)}>Update</button>
                                        </div>
                                        ): <></>
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

export default UserExp;