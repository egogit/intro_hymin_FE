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
function UserExtraActivity(props) {

    const [userExtraAct, setUserExtraAct] = useState([]);
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [content, setContent] = useState("");
    const [showExtraActUpdate, setShowExtraActUpdate] = useState(false);
    const [selectedExtraAct, setSelectedExtraAct] = useState(null);
    const [isFormVisible, setIsFormVisible]=useState(false);
    const [isAddFormVisible, setIsAddFormVisible]=useState(false);
    const [deletedExtraActId, setDeletedExtraActId] = useState(null);

    const {isAuthenticated} = useAuth();

    const baseURL = "http://introhymin.com/api/user" //local: "http://localhost:8080/api/user"

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
    },[showExtraActUpdate,selectedExtraAct,isAddFormVisible,deletedExtraActId])

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

    const deleteExtraAct = (extraAct, e) => {
        e.preventDefault();
        if (extraAct[0]==null){
            alert("id가 존재하지않는 extraActivity 입니다.");
            return false;
        }
        axios.delete(baseURL+"/extracurriculum",
            { data: { id: extraAct[0] } }
        ).then((res) => {
            console.log(res);
            setDeletedExtraActId(extraAct[0]);
        }).catch((err) =>{
            console.log(err);
        })
        setDeletedExtraActId(null);
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
                                    isAuthenticated && isEditing ? (
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
                                        isAuthenticated &&(
                                        <div>
                                            <button type="submit" onClick={(e) => toggleExtraActUpdateForm(extraAct, e)}>Update</button>
                                            <button type="submit" onClick={(e) => deleteExtraAct(extraAct,e)}>Delete</button>
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
            {isAuthenticated &&<PlusButton onClick={toggleAddForm}/>}
        </div>
    )
}
export default UserExtraActivity;