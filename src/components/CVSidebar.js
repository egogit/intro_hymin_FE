import email from '../assets/email.png';
import phone from '../assets/phone.png';

const styles = {
    sidebarContainer:{
        width: 250,
        paddingRight: 50,
    },
    cvTitle:{
        color: '#003b6c',
    },
    contactImage:{
        width: 40,
        height: 40,
    },
    contactImageContainer:{
        display:'flex',
        alignContent:'center',
    }
}

function CVSidebar(props){
    return(
        <div style={styles.sidebarContainer}>
            <div>
                <h3 style={styles.cvTitle}>● Personal Info</h3>
                <div>
                    <div style={styles.contactImageContainer}>
                        <img src={email} style={styles.contactImage} alt="email"/>example@domain.com
                    </div>
                    <div style={styles.contactImageContainer}>
                        <img src={phone} style={styles.contactImage} alt="phone"/>010-1234-5678
                    </div>
                </div>
            </div>
            <div>
                <h3 style={styles.cvTitle}>● Skills</h3>
                <div>
                    여기는 skills가 들어가는 부분입니다.
                </div>
            </div>
            <div>
                <h3 style={styles.cvTitle}>● Interests</h3>
                <div>
                    여기는 Interests부분이 들어가는 부분입니다.
                </div>
            </div>
        </div>
    )

}

export default CVSidebar;