import React, {useState, useEffect} from "react";
import axios from "axios";
import SidebarTitle from "../ui/SidebarTitle";
import PlusButton from "./PlusButton";
import InputContainer from "../ui/InputContainer";


function UserInterests(props){
    const [userInterests, setUserInterests] = useState([]);
    const [editId, setEditId] = useState("");
    const [editInterests, setEditInterests] = useState("");
    const [isAddFormVisible, setIsAddFormVisible]=useState(false);


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
    },[editId, isAddFormVisible])

    const onDoubleClick = (id, interests) => {
        setEditId(id);
        setEditInterests(interests);
    }

    const updateUserInterets = () => {
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
                                onBlur={updateUserInterets}
                            />
                        ) : (
                            <span>{interests[1]}</span>
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