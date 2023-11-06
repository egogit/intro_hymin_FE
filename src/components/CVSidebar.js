import email from '../assets/email.png';
import phone from '../assets/phone.png';
import repo from '../assets/github-mark.png'
import blog from '../assets/blog.png';
import axios from 'axios';
import {useState, useEffect} from "react";

const styles = {
    sidebarContainer:{
        width: 250,
        paddingRight: 50,
    },
    cvTitle:{
        color: '#003b6c',
    },
    contactImage:{
        width: 40,
        height: 40,
    },
    contactImageContainer:{
        display:'flex',
        alignContent:'center',
    }
}

function CVSidebar(props){

    const [userInfo, setUserInfo] = useState([]);
    const getUserInfo = async() =>{
        axios.get("http://localhost:8080/api/getUserInfo").then((res)=>{
            console.log(res.data)
            setUserInfo([res.data[0]["email"],res.data[0]["phone"],res.data[0]["blog"],res.data[0]["git"]])
        })
    }

    useEffect(()=>{
        getUserInfo();
    },[]);

    return(
        <div style={styles.sidebarContainer}>
            <div>
                <h3 style={styles.cvTitle}>● Personal Info</h3>
                <div>
                    <div style={styles.contactImageContainer}>
                        <img src={email} style={styles.contactImage} alt="email"/><a href={`mailto:${userInfo[0]}`}>email</a>
                    </div>
                    <div style={styles.contactImageContainer}>
                        <img src={phone} style={styles.contactImage} alt="phone"/>{userInfo[1]}
                    </div>
                    <div style={styles.contactImageContainer}>
                        <img src={repo} style={styles.contactImage} alt="git"/><a>{userInfo[2]}</a>
                    </div>
                    <div style={styles.contactImageContainer}>
                        <img src={blog} style={styles.contactImage} alt="blog"/><a>{userInfo[3]}</a>
                    </div>
                </div>
            </div>
            <div>
                <h3 style={styles.cvTitle}>● Skills</h3>
                <div>
                    여기는 skills가 들어가는 부분입니다.
                </div>
            </div>
            <div>
                <h3 style={styles.cvTitle}>● Interests</h3>
                <div>
                    여기는 Interests부분이 들어가는 부분입니다.
                </div>
            </div>
        </div>
    )

}

export default CVSidebar;