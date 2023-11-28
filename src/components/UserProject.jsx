import axios from "axios";
import React from "react";
import {useState, useEffect} from "react";

function UserProject(props){

    const [userProject, setUserProject] = useState([]);
    const [userProjectCurrent, setUserProjectCurrent] = useState({"id":"","name":"","stack":"","content":"","contribution":"","startDate":"","endDate":""})
    const [showProject, setShowProjectUpdate] = useState(false);

    const baseURL ="http://localhost:8080/api/user"

    useEffect(() => {
        axios.get(baseURL+"/project").then((res) => {
            setUserProject([]);
            res.data.map((project)=>{
                setUserProject( (userProject) =>
                    [...userProject, [project["id"], project["name"], project["stack"], project["content"],
                        project["contribution"],project["term"]]]
                )
            })
        }).catch((err) =>{
            console.log(err);
        })
    },[showProject])
}


export default UserProject;