import React, {useState, useEffect} from "react";
import axios from "axios";
import SidebarTitle from "../ui/SidebarTitle";
import StarRatings from "react-star-ratings/build/star-ratings";


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
    },[editId])

    const onDoubleClick = (id, skill, degree) => {
        setEditId(id);
        setEditSkill(skill);
        setEditDegree(degree);
    }

    const updateUserSkill = () => {
        axios.post(baseURL + "/skill/update", {
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
            </div>
        </div>
    )
}

export default UserSkill;