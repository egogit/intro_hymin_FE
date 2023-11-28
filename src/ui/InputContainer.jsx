import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
    width: 80%;
    height: 32px;
    font-size: 15px;
    border: 0;
    border-radius: 15px;
    outline: none;
    padding-left: 10px;
    background-color: rgb(233, 233, 233);
`

function InputContainer(props){
    return(
        <StyledInput type={props.type} value={props.value} onChange={props.onChange}/>
    )
}

export default InputContainer;
