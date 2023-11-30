import Header from "../components/Header";
import LoginForm from "../components/LoginForm"
import {useNavigate} from "react-router-dom";
import {useAuth} from "../components/AuthContext";
import {useEffect} from "react";


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

function Login(){
    const {isAuthenticated, login, logout} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        isAuthenticated && navigate('/')
    })

    return (
        <div>
            <Header/>
            <div style={styles.mainContainer}>
                <LoginForm/>
            </div>
        </div>
    )
}

export default Login;