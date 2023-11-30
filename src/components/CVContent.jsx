import React from "react";
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

    return (
        <div style={styles.cvContentContainer}>
            <img src={name} alt="Hyunmin Ahn<br>BE Developer"/>
            <UserInfo/>
            <UserExp/>
            <UserEducation/>
            <UserCertificate/>
            <UserProject/>
            <UserExtraActivity/>
        </div>
    )
}

export default CVContent;