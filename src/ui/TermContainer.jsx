import React from "react";
import styled from "styled-components";

const StyledTermContainer = styled.div`
  width: 100px;
`

function TermContainer(props){
    return(
        <StyledTermContainer>{props.term}</StyledTermContainer>
    )
}

export default TermContainer;
