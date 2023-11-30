import UserContact from "./UserContact";
import UserInterests from "./UserInterests";
import UserSkill from "./UserSkill";

const styles = {
    sidebarContainer:{
        width: 250,
        paddingRight: 70,
    },
}

function CVSidebar(props){

    return(
        <div style={styles.sidebarContainer}>
            <UserContact/>
            <UserSkill/>
            <UserInterests/>
        </div>
    )

}

export default CVSidebar;