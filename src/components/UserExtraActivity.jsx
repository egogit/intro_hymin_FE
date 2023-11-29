import axios from "axios";
import React from "react";
import {useState, useEffect} from "react";
import InputContainer from "../ui/InputContainer";
import CVTitle from "../ui/CVTitle";
import PlusButton from "./PlusButton";

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
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [content, setContent] = useState("");
    const [showExtraActUpdate, setShowExtraActUpdate] = useState(false);
    const [selectedExtraAct, setSelectedExtraAct] = useState(null);
    const [isFormVisible, setIsFormVisible]=useState(false);
    const [isAddFormVisible, setIsAddFormVisible]=useState(false);


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
    },[showExtraActUpdate,selectedExtraAct,isAddFormVisible])

    const toggleExtraActUpdateForm = (extraAct, e) => {
        e.preventDefault();
        setShowExtraActUpdate(prevState => !prevState);
        setId(extraAct[0]);
        setName(extraAct[1]);
        setContent(extraAct[2]);
        setSelectedExtraAct(extraAct[0]);
        setIsFormVisible(true);
        setIsAddFormVisible(false);
    }

    const updateUserExtraAct = () => {
        axios.post(baseURL + "/extracurriculum", {
            id: id,
            name: name,
            content: content,

        }).then((res) => {
            console.log(res);

            setSelectedExtraAct(null);
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

    const addUserExtraActivity = (e) => {
        e.preventDefault();
        if (name==null || content==null){
            alert("입력내용은 반드시 입력해주세요.");
            return false;
        }
        axios.post(baseURL+"/extracurriculum",{
            name: name,
            content: content,

        }).then((res) => {
            console.log(res);

            setSelectedExtraAct(null);
        }).catch((err) =>{
            console.log(err);
        })
        setIsAddFormVisible(false);
    };

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
                                        isFormVisible &&(
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
                                            <button type="submit" onClick={updateUserExtraAct}>Update</button>
                                        </form>
                                        )
                                    ) : (
                                        <div>
                                            <button type="submit" onClick={(e) => toggleExtraActUpdateForm(extraAct, e)}>Update</button>
                                        </div>
                                    )
                                }
                            </div>
                        )

                    })}
                {
                    isAddFormVisible && (
                        <form>
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
                            <button type="submit" onClick={addUserExtraActivity}>Update</button>
                        </form>
                    )
                }
            </div>
            <PlusButton onClick={toggleAddForm}/>
        </div>
    )
}
export default UserExtraActivity;