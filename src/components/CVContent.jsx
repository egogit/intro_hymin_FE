import axios from "axios";
import React from "react";
import {useState, useEffect} from "react";
import name from "../assets/name.png";

import UserInfo from "./UserInfo";
import UserExp from "./UserExp";
import UserEducation from "./UserEducation";
import UserCertificate from "./UserCertificate";
import UserProject from "./UserProject";
import UserExtraActivity from "./UserExtraActivity";

const styles={
    cvContentContainer:{
        width: "800px",
    },
}

function CVContent(props){

    const [isLogin, setIsLogin] = useState(false);
    const sessionURL ="http://localhost:8080/api/auth";

    useEffect(() => {
        axios.get(sessionURL+'/checkSession').then((res) => {
            let result = res.data.status === 'success';
            setIsLogin(result);
        }).catch((err) => {
            alert("오류가 발생하였습니다.")
        })
    },[isLogin])

    return (
        <div style={styles.cvContentContainer}>
            <img src={name} alt="Hyunmin Ahn<br>BE Developer"/>
            <UserInfo islogin={isLogin} />
            <UserExp islogin={isLogin} />
            <UserEducation islogin={isLogin}/>
            <UserCertificate islogin={isLogin}/>
            <UserProject islogin={isLogin}/>
            <UserExtraActivity islogin={{isLogin}}/>
        </div>
    )
}

export default CVContent;