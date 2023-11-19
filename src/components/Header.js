import {Link} from 'react-router-dom';
import logo from '../assets/logo.png';
import {useEffect, useState} from "react";
import axios from "axios";

const styles= {
    header:{
        backgroundColor:'#423f43',
    },
    containerStyle:{
        display: 'flex',
        height:100,
    },
    headerContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    navBarContainer: {
        flex: 2,
        height: '100px',
        textAlign:'right',
    },
    navBar: {
        display: 'flex',
    },
    nav:{
        width: 120,
    },
    link:{
        textDecoration: 'none',
        color: 'white',
    }
}
function Header(){

    const [isLogin, setIsLogin] = useState(false);
    const baseURL ="http://localhost:8080/api/auth";

    useEffect(() => {
        axios.get(baseURL+'/checkSession').then((res) => {
            console.log(res.data);
            let result = res.data.status === 'success';
            console.log(result)
            setIsLogin(result);
        }).catch((err) => {
            console.log(err);
            alert("오류가 발생하였습니다.")
        })
    })

    const logoutHandler = () => {
        setIsLogin(false);
        axios.get(baseURL+'/logout').then((res) => {
            let result = res.data.status === 'success';
            if(!result){
                alert("로그아웃에 실패하였습니다.");
            }else{
                alert("로그아웃하였습니다.");
            }
        }).catch((err) => {
            console.log(err);
            alert("오류가 발생하였습니다.")
        })
    }

    return (
        <div style={styles.header}>
            <div style={styles.containerStyle}>
                <div style={styles.headerContainer}>
                    <img src={logo} alt="Intro-hymin"/>
                </div>
                <div style={styles.navBarContainer}>
                    <div style={styles.navBar}>
                        <div style={styles.nav}><p><Link style={styles.link} to="/">Home</Link></p></div>
                        {
                            isLogin ? <div style={styles.nav}><p><Link style={styles.link} to="/" onClick={logoutHandler} >LogOut</Link></p></div>
                                : <div style={styles.nav}><p><Link style={styles.link} to="/login">Login</Link></p></div>

                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;