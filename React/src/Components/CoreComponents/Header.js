import React from 'react';
import styled from "styled-components";


const StyledHeader = styled.div`
  background-color: #1976d2;
  padding: 20px 20px 20px 20px;
  margin: 15px auto;
  border-radius: 10%;
  font-size: 30px;
  font-weight: bold;
  width: 30%;
  justify-content: center;
  display: flex;
  color: white;
`;

const Header = (props) => {
    return (
        <StyledHeader>{props.title}</StyledHeader>
    )
};

export default Header;