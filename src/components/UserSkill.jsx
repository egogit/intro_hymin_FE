import React, {useState, useEffect} from "react";
import axios from "axios";
import SidebarTitle from "../ui/SidebarTitle";
import StarRatings from "react-star-ratings/build/star-ratings";
import PlusButton from "./PlusButton";
import InputContainer from "../ui/InputContainer";


const styles = {
    skillContainer:{
        display: 'flex',
    },
    skillRating:{
        textAlign: 'right',
        width: '100%'
    },
}

function UserSkill(props){
    const [userSkill, setUserSkill] = useState([]);

    const [editId, setEditId] = useState("");
    const [editSkill, setEditSkill] = useState("");
    const [editDegree, setEditDegree] = useState(0);
    const [isAddFormVisible, setIsAddFormVisible]=useState(false);


    const baseURL ="http://localhost:8080/api/user"

    useEffect(() => {
        axios.get(baseURL+"/skill").then((res) => {
            setUserSkill([]);
            res.data.map((skill)=>{
                setUserSkill( (userSkill) => [...userSkill, [skill["id"], skill["name"], skill["degree"]]])
            })
        }).catch((err) =>{
            console.log(err);
        })
    },[editId, isAddFormVisible])

    const onDoubleClick = (id, skill, degree) => {
        setEditId(id);
        setEditSkill(skill);
        setEditDegree(degree);
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

    return(
        <div>
            <SidebarTitle title="Skills"/>
            <div>
                {userSkill.map((skill) => (
                    <div key={skill[0]} onDoubleClick={() => onDoubleClick(skill[0], skill[1], skill[2])}>
                        {editId === skill[0] ? (
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
                        ) : (
                            <div style={styles.skillContainer}>
                                <div>{skill[1]}</div>
                                <div style={styles.skillRating}>
                                <StarRatings rating={skill[2]} starRatedColor="#003b6c"
                                         starSpacing='3px' starDimension="15px"/>
                            </div>
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
            <PlusButton onClick={toggleAddForm}/>
        </div>
    )
}

export default UserSkill;