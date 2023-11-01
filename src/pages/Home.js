import Header from "../components/Header";
import CVContent from "../components/CVContent";
import CVSidebar from "../components/CVSidebar";

const styles = {
    mainContainer:{
        display: 'flex',
        paddingLeft: 30,
    },
}

function Home(){
    return(
        <div>
            <Header />
            <div style={styles.mainContainer}>
                <CVSidebar />
                <CVContent />
            </div>
        </div>
    )
}

export default Home;