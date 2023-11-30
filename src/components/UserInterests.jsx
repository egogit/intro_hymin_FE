import React, {useState, useEffect} from "react";
import axios from "axios";
import SidebarTitle from "../ui/SidebarTitle";
import PlusButton from "./PlusButton";
import InputContainer from "../ui/InputContainer";
import StarRatings from "react-star-ratings/build/star-ratings";
import deleteIcon from "../assets/delete.png";

const styles = {
    deleteButton:{
        width: '20px',
        height: '20px',
        cursor: 'pointer',
    },
    interestsContainer:{
        display: 'flex',
        justifyContent: 'space-between',
    },
    deleteButtonContainer:{
        // width: '100%',
        textAlign: 'right'
    }
}

function UserInterests(props){
    const [userInterests, setUserInterests] = useState([]);
    const [editId, setEditId] = useState("");
    const [editInterests, setEditInterests] = useState("");
    const [isAddFormVisible, setIsAddFormVisible]=useState(false);
    const [deletedInterestsId, setDeletedInterestsId] = useState(null);


    const baseURL ="http://localhost:8080/api/user"

    useEffect(() => {
        axios.get(baseURL+"/interests").then((res) => {
            setUserInterests([]);
            res.data.map((interests)=>{
                setUserInterests( (userInterests) =>
                    [...userInterests, [interests["id"], interests["name"]]])
            })
        }).catch((err) =>{
            console.log(err);
        })
    },[editId, isAddFormVisible, deletedInterestsId])

    const onDoubleClick = (id, interests) => {
        setEditId(id);
        setEditInterests(interests);
    }

    const updateUserInterests = () => {
        axios.post(baseURL + "/interests", {
            id: editId,
            name: editInterests

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

    const addUserInterests = (e) => {
        e.preventDefault();
        if (editInterests==null){
            alert("입력내용은 반드시 입력해주세요.");
            return false;
        }
        axios.post(baseURL+"/interests",{
            name: editInterests,

        }).then((res) => {
            console.log(res);

        }).catch((err) =>{
            console.log(err);
        })
        setIsAddFormVisible(false);
    };

    const deleteInterests = (interests) => {
        if (interests[0]==null){
            alert("id가 존재하지않는 skill 입니다.");
            return false;
        }
        axios.delete(baseURL+"/interests",
            { data: { id: interests[0] } }
        ).then((res) => {
            console.log(res);
            setDeletedInterestsId(interests[0]);
        }).catch((err) =>{
            console.log(err);
        })
        setDeletedInterestsId(null);
    }

    return(
        <div>
            <SidebarTitle title="Interests"/>
            <div>
                {userInterests.map((interests) => (
                    <div key={interests[0]} onDoubleClick={() => onDoubleClick(interests[0], interests[1])}>
                        {editId === interests[0] ? (
                            <input
                                type="text"
                                value={editInterests}
                                onChange={(e) => setEditInterests(e.target.value)}
                                onBlur={updateUserInterests}
                            />
                        ) : (
                            <div style={styles.interestsContainer}>
                                <div>{interests[1]}</div>
                                <div style={styles.deleteButtonContainer}>
                                    <img style={styles.deleteButton} onClick={(e) => deleteInterests(interests,e)} src={deleteIcon} alt="delete"/>
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
                                    setEditInterests(e.target.value)
                                }}
                            /><br/>
                            <button type="submit" onClick={addUserInterests}>Add</button>
                        </form>
                    )
                }
            </div>
            <PlusButton onClick={toggleAddForm}/>
        </div>
    )
}

export default UserInterests;