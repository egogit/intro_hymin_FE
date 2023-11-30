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
function UserCertificate(props) {

    const [userCertificate, setUserCertificate] = useState([]);
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [organization, setOrganization] = useState("");
    const [showCertificateUpdate, setShowCertificateUpdate] = useState(false);
    const [selectedCertificate, setSelectedCertificate] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isAddFormVisible, setIsAddFormVisible] = useState(false);
    const [deletedCrtId, setDeletedCrtId] = useState(null);


    const baseURL = "http://localhost:8080/api/user"

    useEffect(() => {
        axios.get(baseURL+"/certificate").then((res) => {
            setUserCertificate([]);
            res.data.map((crt)=>{
                setUserCertificate( (userCertificate) =>
                    [...userCertificate, [crt["id"], crt["name"], crt["organization"]]]
                )
            })
        }).catch((err) =>{
            console.log(err);
        })
    },[showCertificateUpdate, selectedCertificate, isAddFormVisible, deletedCrtId])

    const toggleCertificateUpdateForm = (certificate, e) => {
        e.preventDefault()
        setShowCertificateUpdate(prevState => !prevState);
        setId(certificate[0]);
        setName(certificate[1]);
        setOrganization(certificate[2]);
        setSelectedCertificate(certificate[0]);
        setIsFormVisible(true);
        setIsAddFormVisible(false);
    }

    const updateUserCertificate = (e) => {
        e.preventDefault();
        axios.post(baseURL + "/certificate", {
            id: id,
            name: name,
            organization: organization,

        }).then((res) => {
            console.log(res)

            setSelectedCertificate(null);
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

    const addUserCertificate = (e) => {
        e.preventDefault();
        if (name==null || organization==null){
            alert("name ,organization은 반드시 입력해주세요.");
            return false;
        }

        axios.post(baseURL+"/certificate",{
            name: name,
            organization: organization

        }).then((res) => {
            console.log(res);

            setSelectedCertificate(null);
        }).catch((err) =>{
            console.log(err);
        })
        setIsAddFormVisible(false);
    };

    const deleteCrt = (crt, e) => {
        e.preventDefault();
        if (crt[0]==null){
            alert("id가 존재하지않는 certificate 입니다.");
            return false;
        }
        axios.delete(baseURL+"/certificate",
            { data: { id: crt[0] } }
        ).then((res) => {
            console.log(res);
            setDeletedCrtId(crt[0]);
        }).catch((err) =>{
            console.log(err);
        })
        setDeletedCrtId(null);
    }

    return (
        <div>
            <CVTitle title="Certificate"/>
            <div style={styles.cvElementContainer}>
                {
                    userCertificate.map((certificate) => {
                        const isEditing = selectedCertificate === certificate[0];

                        return (
                            <div key={certificate[0]}>
                                <div style={styles.cvContainer}>
                                    <div>
                                        <div><b>{certificate[1]}</b></div>
                                        <div>{certificate[2]}</div>
                                    </div>
                                </div>
                                {
                                    props.islogin && isEditing ? (
                                        isFormVisible &&(
                                        <form>
                                            <InputContainer type={"hidden"} value={certificate[0]} onChange={
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
                                            Organization:
                                            <InputContainer type={"text"} value={organization} onChange={
                                                (e) => {
                                                    setOrganization(e.target.value)
                                                }}
                                            /><br/>
                                            <button type="submit" onClick={updateUserCertificate}>Update</button>
                                        </form>
                                        )
                                    ) : (
                                        <div>
                                            <button type="submit" onClick={(e) => toggleCertificateUpdateForm(certificate, e)}>Update</button>
                                            <button type="submit" onClick={(e) => {deleteCrt(certificate,e)}}>Delete</button>
                                        </div>
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
                            Organization:
                            <InputContainer type={"text"} onChange={
                                (e) => {
                                    setOrganization(e.target.value)
                                }}
                            /><br/>
                            <button type="submit" onClick={addUserCertificate}>Add</button>
                        </form>
                    )
                }
            </div>
            <PlusButton onClick={toggleAddForm}/>
        </div>
    )
}

export default UserCertificate;