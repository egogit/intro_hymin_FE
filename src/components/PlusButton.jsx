import React from "react";
import styled from "styled-components";
import add from "../assets/add.png"

const Container = styled.div`
    text-align: center;
`

const StyledImg = styled.img`
    width: 30px;
    height: 30px;
`

function PlusButton(props){
    return(
        <Container>
            <StyledImg onClick={props.onClick} src={add} alt="add"/>
        </Container>
    )
}

export default PlusButton;