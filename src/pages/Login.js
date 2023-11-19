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
        let result = false;
        axios.get(baseURL+'/checkSession').then((res) => {
            console.log(res);
            result = (res.data.status === 'success');
        }).catch((err) => {
            console.log(err);
            alert("오류가 발생하였습니다.")
        }).finally(() => {
            setIsLogin(result);
        })
    })

    if(!isLogin) {
        return (
            <div>
                <Header/>
                <div style={styles.mainContainer}>
                    <LoginForm/>
                </div>
            </div>
        )
    }else{
         navigate('/')
    }
}

export default Login;