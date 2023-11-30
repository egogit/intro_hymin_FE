import React, {useEffect} from "react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "./AuthContext";

const styles={
    loginElement: {
        marginBottom: '10px',
        backgroundColor: 'white',
        width: '100%',
        padding: '10px',
        boxSizing: 'border-box',
        borderRadius: '5px',
        border: 'none',

    },
    loginButton: {
        backgroundColor: "#1BBC9B",
        marginBottom: "30px",
        color: "white",
        width: '100%',
        padding: '10px',
        boxSizing: 'border-box',
        borderRadius: '5px',
        border: 'none',
    }
}

function LoginForm(props){
    const [id, setId]= useState('');
    const [pw, setPw] = useState('');
    const {isAuthenticated, login, logout} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        isAuthenticated && navigate('/')
    }, [isAuthenticated]);

    const loginHandler = (e) => {
        e.preventDefault();
        if(!login(id,pw)){
            setId("");
            setPw("");
        }
    }

    return (
        <form>
            <input value={id} type="text" placeholder="아이디" style={styles.loginElement} onChange={e => setId(e.target.value)} />
            <input value={pw} type="password" placeholder="비밀번호" style={styles.loginElement} onChange={e => setPw(e.target.value)} /><br/>
            <input type="submit" id="btn" value="로그인" style={styles.loginButton} onClick={loginHandler} />
            <p>id: admin, pw: 1234</p>
        </form>
    )
}

export default LoginForm;