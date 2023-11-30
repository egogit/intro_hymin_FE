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
function UserProject(props) {

    const [userProject, setUserProject] = useState([]);
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [stack, setStack] = useState("");
    const [content, setContent] = useState("");
    const [contribution, setContribution] = useState("");
    const [showProjectUpdate, setShowProjectUpdate] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isFormVisible, setIsFormVisible]=useState(false);
    const [isAddFormVisible, setIsAddFormVisible]=useState(false);
    const [deletedProjectId, setDeletedProjectId] = useState(null);

    const {isAuthenticated} = useAuth();

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
    },[showProjectUpdate,selectedProject,isAddFormVisible,deletedProjectId])

    const toggleProjectUpdateForm = (project, e) => {
        e.preventDefault();
        setShowProjectUpdate(prevState => !prevState);
        setId(project[0]);
        setName(project[1]);
        setStack(project[2]);
        setContent(project[3]);
        setContribution(project[4]);
        setSelectedProject(project[0]);
        setIsFormVisible(true);
        setIsAddFormVisible(false);
    }

    const updateUserProject = (e) => {
        e.preventDefault();
        axios.post(baseURL + "/project", {
            id: id,
            name: name,
            stack: stack,
            content: content,
            contribution: contribution

        }).then((res) => {
            console.log(res);

            setSelectedProject(null);
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

    const addUserProject = (e) => {
        e.preventDefault();
        if (name==null || stack==null || content==null || contribution==null){
            alert("입력내용은 반드시 입력해주세요.");
            return false;
        }
        axios.post(baseURL+"/project",{
            name: name,
            stack: stack,
            content: content,
            contribution: contribution

        }).then((res) => {
            console.log(res);

            setSelectedProject(null);
        }).catch((err) =>{
            console.log(err);
        })
        setIsAddFormVisible(false);
    };

    const deleteProject = (project, e) => {
        e.preventDefault();
        if (project[0]==null){
            alert("id가 존재하지않는 certificate 입니다.");
            return false;
        }
        axios.delete(baseURL+"/project",
            { data: { id: project[0] } }
        ).then((res) => {
            console.log(res);
            setDeletedProjectId(project[0]);
        }).catch((err) =>{
            console.log(err);
        })
        setDeletedProjectId(null);
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
                                    isAuthenticated && isEditing ? (
                                        isFormVisible &&(
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
                                            <button type="submit" onClick={updateUserProject}>Update</button>
                                        </form>
                                        )
                                    ) : (
                                        isAuthenticated &&(
                                        <div>
                                            <button type="submit" onClick={(e) => toggleProjectUpdateForm(project, e)}>Update</button>
                                            <button type="submit" onClick={(e) => deleteProject(project,e)}>Delete</button>
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
                            <InputContainer type={"text"} onChange={
                                (e) => {
                                    setName(e.target.value)
                                }}
                            /><br/>
                            Stack:
                            <InputContainer type={"text"} onChange={
                                (e) => {
                                    setStack(e.target.value)
                                }}
                            /><br/>
                            Content:
                            <InputContainer type={"text"} onChange={
                                (e) => {
                                    setContent(e.target.value)
                                }}
                            /><br/>
                            Contribution:
                            <InputContainer type={"text"} onChange={
                                (e) => {
                                    setContribution(e.target.value)
                                }}
                            /><br/>
                            <button type="submit" onClick={addUserProject}>Add</button>
                        </form>
                    )
                }
            </div>
            {isAuthenticated &&<PlusButton onClick={toggleAddForm}/>}
        </div>
    )
}
export default UserProject;