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
function UserCertificate(props) {

    const [userCertificate, setUserCertificate] = useState([]);


    const [showCertificateUpdate, setShowCertificateUpdate] = useState(false);
    const [selectedCertificate, setSelectedCertificate] = useState(null);

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [organization, setOrganization] = useState("");


    const baseURL = "http://localhost:8080/api/user"

    useEffect(() => {
        axios.get(baseURL+"/certificate").then((res) => {
            setUserCertificate([]);
            res.data.map((exp)=>{
                setUserCertificate( (userCertificate) =>
                    [...userCertificate, [exp["id"], exp["name"], exp["organization"]]]
                )
            })
        }).catch((err) =>{
            console.log(err);
        })
    },[showCertificateUpdate])

    const toggleCertificateUpdateForm = (certificate, e) => {
        setShowCertificateUpdate(prevState => !prevState);
        setId(certificate[0]);
        setName(certificate[1]);
        setOrganization(certificate[2]);

        setSelectedCertificate(certificate[0]);
    }

    const updateUserCertificate = () => {
        axios.post(baseURL + "/certificate/update", {
            id: id,
            name: name,
            organization: organization,

        }).then((res) => {
            console.log(res)

            setSelectedCertificate(null);
        }).catch((err) => {
            console.log(err);
        })
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
                                            <button onClick={updateUserCertificate}>Update</button>
                                        </form>
                                    ) : (
                                        <div>
                                            <button onClick={(e) => toggleCertificateUpdateForm(certificate, e)}>Update</button>
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

export default UserCertificate;