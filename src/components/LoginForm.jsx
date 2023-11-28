import axios from "axios";
import React from "react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

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
    const baseURL ="http://localhost:8080/api/auth";
    const navigate = useNavigate();

    const [id, setId]= useState('');
    const [pw, setPw] = useState('');
    const onIdChange = e => setId(e.target.value);
    const onPwChange = e => setPw(e.target.value);

    const checkLogin = (e) => {
        e.preventDefault();
        axios.post(baseURL+'/login',{
            id: id,
            pw: pw
        }).then((res) => {
            console.log(res)
            if(res.data.msg === 'success'){
                navigate('/');
            }else{
                setId('');
                setPw('');
            }
        }).catch((err) => {
            console.log(err);
            alert("오류가 발생하였습니다.")
        })
    }

    return (
        <form>
            <input value={id} type="text" placeholder="아이디" style={styles.loginElement} onChange={onIdChange} />
            <input value={pw} type="password" placeholder="비밀번호" style={styles.loginElement} onChange={onPwChange} /><br/>
            <input type="submit" id="btn" value="로그인" style={styles.loginButton} onClick={checkLogin} />
            <p>id: admin, pw: 1234</p>
        </form>
    )
}

export default LoginForm;