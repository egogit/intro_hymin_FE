import axios from "axios";
import React from "react";
import {useState, useEffect} from "react";
import InputContainer from "../ui/InputContainer";
import CVTitle from "../ui/CVTitle";

const styles={
    cvContainer:{
        display:'flex',
        paddingBottom: '20px',
    },
    cvElementContainer:{
        flexDirection: 'column'
    },
}
function UserProject(props) {

    const [userProject, setUserProject] = useState([]);


    const [showProjectUpdate, setShowProjectUpdate] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [stack, setStack] = useState("");
    const [content, setContent] = useState("");
    const [contribution, setContribution] = useState("");


    const baseURL = "http://localhost:8080/api/user"

    useEffect(() => {
        axios.get(baseURL+"/project").then((res) => {
            setUserProject([]);
            res.data.map((project)=>{
                setUserProject( (userProject) =>
                    [...userProject, [project["id"], project["name"], project["stack"], project["content"],
                        project["contribution"]]]
                )
            })
        }).catch((err) =>{
            console.log(err);
        })
    },[showProjectUpdate])

    const toggleProjectUpdateForm = (project, e) => {
        setShowProjectUpdate(prevState => !prevState);
        setId(project[0]);
        setName(project[1]);
        setStack(project[2]);
        setContent(project[3]);
        setContribution(project[4]);
        setSelectedProject(project[0]);
    }

    const updateUserProject = () => {
        axios.post(baseURL + "/project/update", {
            id: id,
            name: name,
            stack: stack,
            content: content,
            contribution: contribution

        }).then((res) => {
            console.log(res)

            setSelectedProject(null);
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div>
            <CVTitle title="Projects"/>
            <div style={styles.cvElementContainer}>
                {
                    userProject.map((project) => {
                        const isEditing = selectedProject === project[0];

                        return (
                            <div key={project[0]}>
                                <div style={styles.cvContainer}>
                                    <div>
                                        <div><b>{project[1]}</b></div>
                                        <div><b>Stack:</b> {project[2]}</div>
                                        <div><b>Content:</b> {project[3]}</div>
                                        <div><b>Contribution:</b> {project[4]}%</div>
                                    </div>
                                </div>
                                {
                                    props.islogin && isEditing ? (
                                        <form>
                                            <InputContainer type={"hidden"} value={project[0]} onChange={
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
                                            Stack:
                                            <InputContainer type={"text"} value={stack} onChange={
                                                (e) => {
                                                    setStack(e.target.value)
                                                }}
                                            /><br/>
                                            Content:
                                            <InputContainer type={"text"} value={content} onChange={
                                                (e) => {
                                                    setContent(e.target.value)
                                                }}
                                            /><br/>
                                            Contribution:
                                            <InputContainer type={"text"} value={contribution} onChange={
                                                (e) => {
                                                    setContribution(e.target.value)
                                                }}
                                            /><br/>
                                            <button onClick={updateUserProject}>Update</button>
                                        </form>
                                    ) : (
                                        <div>
                                            <button onClick={(e) => toggleProjectUpdateForm(project, e)}>Update</button>
                                        </div>
                                    )
                                }
                            </div>
                        )

                    })
                }
            </div>
        </div>
    )
}
export default UserProject;