import axios from 'axios';
import StarRatings from "react-star-ratings/build/star-ratings";

import {useState, useEffect} from "react";
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