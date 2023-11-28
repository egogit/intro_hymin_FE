import axios from "axios";
import React from "react";
import {useState, useEffect} from "react";
import InputContainer from "../ui/InputContainer";

function UserInfo(props){
    const [userInfo, setUserInfo] = useState([]);
    const [userIntro, setUserIntro] = useState("")
    const [showInfoUpdate, setShowInfoUpdate] = useState(false);

    const baseURL ="http://localhost:8080/api/user"

    useEffect(() => {
        axios.get(baseURL+"/info").then((res) => {
            setUserInfo([res.data[0]["intro"]]);
        }).catch((err) =>{
            console.log(err);
        })
    },[showInfoUpdate])

    const toggleInfoUpdateForm = (intro, e) => {
        setShowInfoUpdate(prevState => !prevState);
        setUserIntro(intro);
    }

    const updateUserInfo = () => {
        axios.post(baseURL+"/info/update",{
            id: 1,
            intro: userIntro
        }).then((res) => {
            console.log(res)
        }).catch((err) =>{
            console.log(err);
        })
    }


    return(
        <div>
            {userInfo[0]}
            {
                props.islogin && showInfoUpdate ? (
                    <form>
                        Intro:
                        <InputContainer type={"text"} value={userIntro} onChange={
                            (e) =>
                            {
                                setUserIntro(e.target.value)
                            }}
                        /><br />
                        <button onClick={updateUserInfo}>Update</button>
                    </form>
                ) : (
                    <div>
                        <button onClick={ e => toggleInfoUpdateForm(userInfo[0],e)}>Update</button>
                    </div>
                )
            }
        </div>
    )
}

export default UserInfo;