import email from '../assets/email.png';
import repo from '../assets/github-mark.png'
import blog from '../assets/blog.png';
import axios from 'axios';
import StarRatings from "react-star-ratings/build/star-ratings";

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
    contactImageContainer: {
        display: 'flex',
        alignContent: 'center',
    },
    infoUrl: {
        textDecoration: 'none',
        color: 'black',
    },
    skillContainer:{
        display: 'flex',
    },
    skillRating:{
        textAlign: 'right',
        width: '100%'
    },
}

function CVSidebar(props){

    const [userInfo, setUserInfo] = useState([]);
    const [userSkill, setUserSkill] = useState([]);
    const [userInterests, setUserInterests] = useState([]);

    const baseURL ="http://localhost:8080/api/user"

    useEffect(() => {
        axios.get(baseURL+"/info").then((res) => {
            setUserInfo([res.data[0]["email"],res.data[0]["blog"],res.data[0]["git"]]);
        }).catch((err) =>{
            console.log(err);
        })
    },[])

    useEffect(() => {
        axios.get(baseURL+"/skill").then((res) => {
            setUserSkill([]);
            res.data.map((skill)=>{
                setUserSkill( (userSkill) => [...userSkill, [skill["id"], skill["name"], skill["degree"]]])
            })
        }).catch((err) =>{
            console.log(err);
        })
    },[])

    useEffect(() => {
        axios.get(baseURL+"/interests").then((res) => {
            setUserInterests([]);
            res.data.map((interests)=>{
                setUserInterests( (userInterests) =>
                    [...userInterests, [interests["id"], interests["name"]]])
            })
        }).catch((err) =>{
            console.log(err);
        })
    },[])

    return(
        <div style={styles.sidebarContainer}>
            <div>
                <h3 style={styles.cvTitle}>Personal Info</h3>
                <div>
                    <div style={styles.contactImageContainer}>
                        <img src={email} style={styles.contactImage} alt="email"/>
                        <a href={`mailto:${userInfo[0]}` } style={styles.infoUrl}>Email</a>
                    </div>
                    <div style={styles.contactImageContainer}>
                        <img src={repo} style={styles.contactImage} alt="git"/>
                        <a href={userInfo[2]} style={styles.infoUrl}>Github</a>
                    </div>
                    <div style={styles.contactImageContainer}>
                        <img src={blog} style={styles.contactImage} alt="blog"/>
                        <a href={userInfo[1]} style={styles.infoUrl}>Min It's Devlog</a>
                    </div>
                </div>
            </div>
            <div>
                <h3 style={styles.cvTitle}>Skills</h3>
                <div>
                    {
                        userSkill.map((skill) => {
                            return <div key={skill[0]} style={styles.skillContainer}>
                                <div>{skill[1]}</div>
                                <div style={styles.skillRating}>
                                    <StarRatings rating={skill[2]} starRatedColor="#003b6c"
                                                 starSpacing='3px' starDimension="15px"/>
                                </div>
                            </div>
                    })}
                </div>
            </div>
            <div>
                <h3 style={styles.cvTitle}>Interests</h3>
                <div>
                    {
                        userInterests.map((interests) => {
                            return <div key={interests[0]}>{interests[1]}</div>
                        })}
                </div>
            </div>
        </div>
    )

}

export default CVSidebar;