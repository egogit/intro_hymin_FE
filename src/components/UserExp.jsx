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
    const [isFormVisible, setIsFormVisible]=useState(false);
    const [isAddFormVisible, setIsAddFormVisible]=useState(false);
    const [deletedExpId, setDeletedExpId] = useState(null);


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
    },[showExpUpdate, selectedExpUpdate, isAddFormVisible, deletedExpId])

    const toggleExpUpdateForm = (exp, e) => {
        e.preventDefault();
        setShowExpUpdate(prevState => !prevState);
        setId(exp[0]);
        setType(exp[1]);
        setName(exp[2]);
        setLocation(exp[3]);
        setContent(exp[4]);
        setContentId(exp[5]);
        setSelectedExpUpdate(exp[0]);
        setIsFormVisible(true);
        setIsAddFormVisible(false);
    }

    const updateUserExp = (e) => {
        e.preventDefault();
        axios.post(baseURL+"/experience",{
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
        setIsFormVisible(false);
    }

    const toggleAddForm = (e) => {
        e.preventDefault();
        setIsAddFormVisible((prevState) => !prevState);
        setIsFormVisible(false);
    };

    const addUserExp = (e) => {
        e.preventDefault();
        if (name==null || location==null || content==null){
            alert("name ,location, content는 반드시 입력해주세요.");
            return false;
        }
        console.log(type, name, location, content)
        axios.post(baseURL+"/experience",{
            type: type,
            name: name,
            location: location,
            content: content,

        }).then((res) => {
            console.log(res);

            setSelectedExpUpdate(null);
        }).catch((err) =>{
            console.log(err);
        })
        setIsAddFormVisible(false);
    };

    const deleteExp = (exp, e) => {
        e.preventDefault();
        if (exp[0]==null){
            alert("id가 존재하지않는 experience 입니다.");
            return false;
        }
        axios.delete(baseURL+"/experience",
            { data: { id: exp[0] } }
        ).then((res) => {
            console.log(res);
            setDeletedExpId(exp[0]);
        }).catch((err) =>{
            console.log(err);
        })
        setDeletedExpId(null);
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
                                        <div>{exp[4]}</div>
                                    </div>
                                </div>
                                {
                                    props.islogin && isEditing ? (
                                        isFormVisible &&(
                                        <form>
                                            <InputContainer type={"hidden"} value={exp[0]} onChange={
                                                (e) => {
                                                    setId(e.target.value)
                                                }}
                                            /><br/>
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
                                            <button type="submit" onClick={updateUserExp}>Update</button>
                                        </form>
                                        )
                                    ) : (
                                        <div>
                                            <button type="submit" onClick={(e) => toggleExpUpdateForm(exp,e)}>Update</button>
                                            <button type="submit" onClick={(e) => {deleteExp(exp,e)}}>Delete</button>
                                        </div>
                                    )
                                }
                            </div>
                        )

                    })}
                {
                    isAddFormVisible && (
                        <form>
                            Position:
                            <InputContainer type={"text"} onChange={
                                (e) =>
                                {
                                    setName(e.target.value)
                                }}
                            /><br />
                            Location:
                            <InputContainer type={"text"} onChange={
                                (e) =>
                                {
                                    setLocation(e.target.value)
                                }}
                            /><br />
                            Type:
                            <InputContainer type={"text"} onChange={
                                (e) =>
                                {
                                    setType(e.target.value)
                                }}
                            /><br />
                            Content:
                            <InputContainer type={"text"} onChange={
                                (e) =>
                                {
                                    setContent(e.target.value)
                                }}
                            /><br />
                            <button type="submit" onClick={addUserExp}>Add</button>
                        </form>
                    )
                }
            </div>
            <PlusButton onClick={toggleAddForm}/>
        </div>
    )

}

export default UserExp;