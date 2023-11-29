import email from '../assets/email.png';
import repo from '../assets/github-mark.png'
import blog from '../assets/blog.png';

import React, {useState, useEffect} from "react";
import axios from "axios";
import SidebarTitle from "../ui/SidebarTitle";
import ContactElement from "./ContactElement";

function UserContact(props){
    const [userInfo, setUserInfo] = useState([]);

    const baseURL ="http://localhost:8080/api/user"

    useEffect(() => {
        axios.get(baseURL+"/info").then((res) => {
            setUserInfo([res.data[0]["email"],res.data[0]["blog"],res.data[0]["git"]]);
        }).catch((err) =>{
            console.log(err);
        })
    },[])

    return(
        <div>
            <SidebarTitle title="Personal Info"/>
            <div>
                <ContactElement img={email} alt="email" url={`mailto:${userInfo[0]}`} contact="email"/>
                <ContactElement img={repo} alt="git" url={userInfo[2]} contact="Github"/>
                <ContactElement img={blog} alt="blog" url={userInfo[1]} contact="Min It's Devlog"/>
            </div>
        </div>
    )
}

export default UserContact;