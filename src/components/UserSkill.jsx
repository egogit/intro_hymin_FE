import React, {useState, useEffect} from "react";
import axios from "axios";
import SidebarTitle from "../ui/SidebarTitle";
import StarRatings from "react-star-ratings/build/star-ratings";
import PlusButton from "./PlusButton";
import InputContainer from "../ui/InputContainer";
import deleteIcon from "../assets/delete.png";
import {useAuth} from "./AuthContext";


const styles = {
    skillContainer:{
        display: 'flex',
    },
    skillRating:{
        textAlign: 'right',
        width: '100%',
        paddingRight: '30px'
    },
    deleteButton:{
        width: '20px',
        height: '20px',
        cursor: 'pointer',
    },
}

function UserSkill(props){
    const [userSkill, setUserSkill] = useState([]);

    const [editId, setEditId] = useState("");
    const [editSkill, setEditSkill] = useState("");
    const [editDegree, setEditDegree] = useState(0);
    const [isAddFormVisible, setIsAddFormVisible]=useState(false);
    const [deletedSkillId, setDeletedSkillId] = useState(null);

    const {isAuthenticated} = useAuth();

    const baseURL ="http://introhymin.com/api/user"  // local: "http://localhost:8080/api/user"

    useEffect(() => {
        axios.get(baseURL+"/skill").then((res) => {
            setUserSkill([]);
            res.data.map((skill)=>{
                setUserSkill( (userSkill) => [...userSkill, [skill["id"], skill["name"], skill["degree"]]])
            })
        }).catch((err) =>{
            console.log(err);
        })
    },[editId, isAddFormVisible, deletedSkillId])

    const onDoubleClick = (id, skill, degree) => {
        if (isAuthenticated){
            setEditId(id);
            setEditSkill(skill);
            setEditDegree(degree);
        }else{
            return false;
        }
    }

    const updateUserSkill = () => {
        axios.post(baseURL + "/skill", {
            id: editId,
            name: editSkill,
            degree: editDegree

        }).then((res) => {
            console.log(res)

            setEditId(null);
        }).catch((err) => {
            console.log(err);
        })
    }

    const toggleAddForm = (e) => {
        e.preventDefault();
        setIsAddFormVisible((prevState) => !prevState);
    };

    const addUserSkill = (e) => {
        e.preventDefault();
        if (editSkill==null || editDegree==null){
            alert("입력내용은 반드시 입력해주세요.");
            return false;
        }
        axios.post(baseURL+"/skill",{
            name: editSkill,
            degree: editDegree

        }).then((res) => {
            console.log(res);

        }).catch((err) =>{
            console.log(err);
        })
        setIsAddFormVisible(false);
    };

    const deleteSkill = (skill) => {
        if (skill[0]==null){
            alert("id가 존재하지않는 skill 입니다.");
            return false;
        }
        axios.delete(baseURL+"/skill",
            { data: { id: skill[0] } }
        ).then((res) => {
            console.log(res);
            setDeletedSkillId(skill[0]);
        }).catch((err) =>{
            console.log(err);
        })
        setDeletedSkillId(null);
    }

    return(
        <div>
            <SidebarTitle title="Skills"/>
            <div>
                {userSkill.map((skill) => (
                    <div key={skill[0]} onDoubleClick={() => onDoubleClick(skill[0], skill[1], skill[2])}>
                        {editId === skill[0] ? (
                            isAuthenticated &&(
                            <div>
                                <input
                                    type="text"
                                    value={editSkill}
                                    onChange={(e) => setEditSkill(e.target.value)}
                                    onBlur={updateUserSkill}
                                />
                                <input
                                    type="text"
                                    value={editDegree}
                                    onChange={(e) => setEditDegree(e.target.value)}
                                    onBlur={updateUserSkill}
                                />
                            </div>
                            )
                        ) : (
                            <div style={styles.skillContainer}>
                                <div>{skill[1]}</div>
                                <div style={styles.skillRating}>
                                    <StarRatings rating={skill[2]} starRatedColor="#003b6c"
                                             starSpacing='3px' starDimension="15px"/>
                                </div>
                                {isAuthenticated&&(
                                <div>
                                    <img style={styles.deleteButton} onClick={(e) => deleteSkill(skill,e)} src={deleteIcon} alt="delete"/>
                                </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
                {
                    isAddFormVisible && (
                        <form>
                            Name:
                            <InputContainer type={"text"} onChange={
                                (e) => {
                                    setEditSkill(e.target.value)
                                }}
                            /><br/>
                            Rating:
                            <InputContainer type={"text"} onChange={
                                (e) => {
                                    setEditDegree(e.target.value)
                                }}
                            /><br/>
                            <button type="submit" onClick={addUserSkill}>Add</button>
                        </form>
                    )
                }
            </div>
            {isAuthenticated&&<PlusButton onClick={toggleAddForm}/>}
        </div>
    )
}

export default UserSkill;