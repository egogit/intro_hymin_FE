import React from "react";
import styled from "styled-components";

const StyledTitle = styled.h3`
    color: #003b6c;
    border-top: 2px solid #003b6c;
    border-bottom: 2px solid #003b6c;
`

function CVTitle(props){
    return(
        <div>
            <StyledTitle>{props.title}</StyledTitle>
        </div>
    )
}

export default CVTitle;