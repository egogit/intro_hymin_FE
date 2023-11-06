import name from "../assets/name.png";

const styles={
    cvContainer:{
        display:'flex',
    },
    cvTitle:{
        color: '#003b6c',
    },
    termContainer:{
        width: 100,
    },
}
function CVContent(props){
    return (
        <div>
            <img src={name} alt="Hyunmin Ahn<br>BE Developer"/>
            <div>
                여기는 간단한 자기소개 부분입니다.
            </div>
            <div>
                <h3 style={styles.cvTitle}>● Experience</h3>
                <div style={styles.cvContainer}>
                    <div style={styles.termContainer}>기간</div>
                    <div>
                        여기는 Experience 부분입니다.
                    </div>
                </div>
            </div>
            <div>
                <h3 style={styles.cvTitle}>● Education</h3>
                <div style={styles.cvContainer}>
                    <div style={styles.termContainer}>기간</div>
                    <div>
                        여기는 Education 부분입니다.
                    </div>
                </div>
            </div>
            <div>
                <h3 style={styles.cvTitle}>● Certificate</h3>
                <div style={styles.cvContainer}>
                    <div style={styles.termContainer}>기간</div>
                    <div>
                        여기는 Certificate 부분입니다.
                    </div>
                </div>
            </div>
            <div>
                <h3 style={styles.cvTitle}>● Projects</h3>
                <div style={styles.cvContainer}>
                    <div style={styles.termContainer}>기간</div>
                    <div>
                        여기는 Project 부분입니다.
                    </div>
                </div>
            </div>
        </div>
    )
}
// TODO: add repository/blog area
export default CVContent;