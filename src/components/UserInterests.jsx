import React, {useState, useEffect} from "react";
import axios from "axios";
import SidebarTitle from "../ui/SidebarTitle";


function UserInterests(props){
    const [userInterests, setUserInterests] = useState([]);
    const [editId, setEditId] = useState("");
    const [editInterests, setEditInterests] = useState("");

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
    },[editId])

    const onDoubleClick = (id, interests) => {
        setEditId(id);
        setEditInterests(interests);
    }

    const updateUserInterets = () => {
        axios.post(baseURL + "/interests/update", {
            id: editId,
            name: editInterests

        }).then((res) => {
            console.log(res)

            setEditId(null);
        }).catch((err) => {
            console.log(err);
        })
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
                                onBlur={updateUserInterets}
                            />
                        ) : (
                            <span>{interests[1]}</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UserInterests;