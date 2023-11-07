import axios from "axios";
import React from "react";
import {useState, useEffect} from "react";
import name from "../assets/name.png";

const styles={
    cvContainer:{
        display:'flex',
    },
    cvTitle:{
        color: '#003b6c',
    },
    termContainer:{
        width: 100,
    },
}

function CVContent(props){

    const [userInfo, setUserInfo] = useState([]);
    const [userExp, setUserExp] = useState([]);
    const [userEducation, setUserEducation] = useState([]);
    const [userCertificate, setUserCertificate] = useState([]);
    const [userProject, setUserProject] = useState([]);

    const baseURL ="http://localhost:8080/api/user"

    useEffect(() => {
        axios.get(baseURL+"/info").then((res) => {
            setUserInfo([res.data[0]["intro"]]);
        }).catch((err) =>{
            console.log(err);
        })
    },[])

    useEffect(() => {
        axios.get(baseURL+"/experience").then((res) => {
            setUserExp([res.data[0]['name']]);
        }).catch((err) =>{
            console.log(err);
        })
    },[])

    useEffect(() => {
        axios.get(baseURL+"/education").then((res) => {
            setUserEducation([res.data[0]['major']]);
        }).catch((err) =>{
            console.log(err);
        })
    },[])

    useEffect(() => {
        axios.get(baseURL+"/certificate").then((res) => {
            setUserCertificate([res.data[0]['name']]);
        }).catch((err) =>{
            console.log(err);
        })
    },[])

    useEffect(() => {
        axios.get(baseURL+"/project").then((res) => {
            setUserProject([res.data[0]['name']]);
        }).catch((err) =>{
            console.log(err);
        })
    },[])

    // TODO: refactor duplicated things & insert other data & ui

    return (
        <div>
            <img src={name} alt="Hyunmin Ahn<br>BE Developer"/>
            <div>
                {userInfo[0]}
            </div>
            <div>
                <h3 style={styles.cvTitle}>● Experience</h3>
                <div style={styles.cvContainer}>
                    <div style={styles.termContainer}>기간</div>
                    <div>
                        {userExp[0]}
                    </div>
                </div>
            </div>
            <div>
                <h3 style={styles.cvTitle}>● Education</h3>
                <div style={styles.cvContainer}>
                    <div style={styles.termContainer}>기간</div>
                    <div>
                        {userEducation[0]}
                    </div>
                </div>
            </div>
            <div>
                <h3 style={styles.cvTitle}>● Certificate</h3>
                <div style={styles.cvContainer}>
                    <div style={styles.termContainer}>기간</div>
                    <div>
                        {userCertificate[0]}
                    </div>
                </div>
            </div>
            <div>
                <h3 style={styles.cvTitle}>● Projects</h3>
                <div style={styles.cvContainer}>
                    <div style={styles.termContainer}>기간</div>
                    <div>
                        {userProject[0]}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CVContent;