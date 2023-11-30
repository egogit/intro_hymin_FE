import {Link} from 'react-router-dom';
import logo from '../assets/logo.png';
import {useEffect, useState} from "react";
import axios from "axios";
import {useAuth} from "./AuthContext";

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

    const {isAuthenticated, logout} = useAuth();

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
                            isAuthenticated ? <div style={styles.nav}><p><Link style={styles.link} to="/" onClick={logout} >LogOut</Link></p></div>
                                : <div style={styles.nav}><p><Link style={styles.link} to="/login">Login</Link></p></div>

                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;