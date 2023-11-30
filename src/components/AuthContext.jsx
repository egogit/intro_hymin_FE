import React, {createContext, useState, useContext, useEffect} from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const baseURL ="http://localhost:8080/api/auth";

    useEffect(() => {
        axios.get(baseURL+'/checkSession')
            .then((res) => {
            console.log(res);
            (res.data.status==='success')? setIsAuthenticated(true) : setIsAuthenticated(false);

        }).catch((err) => {
            console.log(err);
            alert("오류가 발생하였습니다.");
            setIsAuthenticated(false);
        }).finally(() => {
        })
    },[])

    const login = (id, pw) => {

        axios.post(baseURL+'/login',{
            id: id,
            pw: pw
        }).then((res) => {
            if(res.data.status === 'success'){
                setIsAuthenticated(true);
                return true;
            }else{
                setIsAuthenticated(false);
            }
        }).catch((err) => {
            console.log(err);
            alert("오류가 발생하였습니다.")
        })
        return false;
    }

    const logout = () => {
        axios.get(baseURL+'/logout')
            .then((res) => {
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
        setIsAuthenticated(false);
    }

    return(
        <AuthContext.Provider value={{isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
}