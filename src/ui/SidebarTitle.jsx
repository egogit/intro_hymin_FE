import React from "react";
import styled from "styled-components";

const StyledTitle = styled.h3`
    color: #003b6c;
`

function SidebarTitle(props){
    return(
        <div>
            <StyledTitle>{props.title}</StyledTitle>
        </div>
    )
}

export default SidebarTitle;