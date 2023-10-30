import {Link} from 'react-router-dom';

const style= {
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
    },
    navBar: {
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    nav:{
        width: 120,
        alignItems:'center',
    },
    link:{
        textDecoration: 'none',
    }
}
function Header(){
    return (
        <div>
            <div style={style.containerStyle}>
                <div style={style.headerContainer}>
                    <div style={style.info}>
                        <b>I'm HyunMin Ahn</b><br />
                        A BE Developer
                    </div>
                </div>
                <div style={style.navBarContainer}>
                    <div style={style.navBar}>
                        <div style={style.nav}><p><Link style={style.link} to="/">Home</Link></p></div>
                        <div style={style.nav}><p><Link style={style.link} to="/CV">CV</Link></p></div>
                        <div style={style.nav}><p><Link style={style.link} to="/Blog">Blog</Link></p></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;