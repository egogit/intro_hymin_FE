import Header from "../components/Header";
import LoginForm from "../components/LoginForm"
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const styles = {
    mainContainer:{
        textAlign: 'center',
        height: '100%',
        backgroundColor: '#003b6c',
        margin: 'auto',
        width: '300px',
        borderRadius: '5px',
        padding: '20px',
    },
}

const baseURL ="http://localhost:8080/api/auth";

function Login(){
    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(baseURL+'/checkSession').then((res) => {
            let result = (res.data.status === 'success');
            setIsLogin(result);
        }).catch((err) => {
            console.log(err);
            alert("오류가 발생하였습니다.")
        })
    },[])

    // if(!isLogin) { // TODO 로그인 여부 확인해서 로그인이 된 상태면 root로 돌아가게 만들기
    // TODO 로그인이 되었다면 header에는 로그아웃 안되었다면 로그인을 띄우기
        return (
            <div>
                <Header/>
                <div style={styles.mainContainer}>
                    <LoginForm/>
                </div>
            </div>
        )
    // }else{
    //     navigate('/')
    // }
}

export default Login;