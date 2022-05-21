import React from 'react';
import styled from "styled-components";

const StyledBody=styled.div`
  display: flex;
  justify-content: center;
`;

const StyledHeader=styled.div`
  background-color: burlywood;
  padding: 20px 20px 20px 20px;
  margin-top: 15px;
  border-radius: 10%;
  font-size: 30px;
  font-weight: bold;
`;

const Header=(props)=>{
    return(
        <StyledBody>
            <StyledHeader>{props.title}</StyledHeader>
        </StyledBody>
    )
};

export default Header;