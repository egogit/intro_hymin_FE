import axios from "axios";
import React from "react";
import {useState, useEffect} from "react";
import InputContainer from "../ui/InputContainer";
import CVTitle from "../ui/CVTitle";

const styles={
    cvContainer:{
        display:'flex',
        paddingBottom: '20px',
    },
    cvElementContainer:{
        flexDirection: 'column'
    },
}
function UserExtraActivity(props) {

    const [userExtraAct, setUserExtraAct] = useState([]);


    const [showExtraActUpdate, setShowExtraActUpdate] = useState(false);
    const [selectedExtraAct, setSelectedExtraAct] = useState(null);

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [content, setContent] = useState("");


    const baseURL = "http://localhost:8080/api/user"

    useEffect(() => {
        axios.get(baseURL+"/extracurriculum").then((res) => {
            setUserExtraAct([]);
            res.data.map((extraAct)=>{
                setUserExtraAct( (userExtraAct) =>
                    [...userExtraAct, [extraAct["id"], extraAct["name"], extraAct["content"]]]
                )
            })
        }).catch((err) =>{
            console.log(err);
        })
    },[showExtraActUpdate])

    const toggleExtraActUpdateForm = (extraAct, e) => {
        setShowExtraActUpdate(prevState => !prevState);
        setId(extraAct[0]);
        setName(extraAct[1]);
        setContent(extraAct[2]);
        setSelectedExtraAct(extraAct[0]);
    }

    const updateUserExtraAct = () => {
        axios.post(baseURL + "/extracurriculum/update", {
            id: id,
            name: name,
            content: content,

        }).then((res) => {
            console.log(res)

            setSelectedExtraAct(null);
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div>
            <CVTitle title="Extra Activity"/>
            <div style={styles.cvElementContainer}>
                {
                    userExtraAct.map((extraAct) => {
                        const isEditing = selectedExtraAct === extraAct[0];

                        return (
                            <div key={extraAct[0]}>
                                <div style={styles.cvContainer}>
                                    <div>
                                        <div><b>{extraAct[1]}</b></div>
                                        <div>{extraAct[2]}</div>
                                    </div>
                                </div>
                                {
                                    props.islogin && isEditing ? (
                                        <form>
                                            <InputContainer type={"hidden"} value={extraAct[0]} onChange={
                                                (e) => {
                                                    setId(e.target.value)
                                                }}
                                            /><br/>
                                            Name:
                                            <InputContainer type={"text"} value={name} onChange={
                                                (e) => {
                                                    setName(e.target.value)
                                                }}
                                            /><br/>
                                            Content:
                                            <InputContainer type={"text"} value={content} onChange={
                                                (e) => {
                                                    setContent(e.target.value)
                                                }}
                                            /><br/>
                                            <button onClick={updateUserExtraAct}>Update</button>
                                        </form>
                                    ) : (
                                        <div>
                                            <button onClick={(e) => toggleExtraActUpdateForm(extraAct, e)}>Update</button>
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
export default UserExtraActivity;