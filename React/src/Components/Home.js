import React from "react";
import styled from "styled-components";

const Container = styled.div`
   position: relative;
   text-align: center;
   color: white;
`
const Baner = styled.div`
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   font-size: 60px;
   font-weight: bold;
`

const StyledImage = styled.img`
   width: 100%;
   filter: brightness(50%);
`

const Home = () => {
   return (
      <div>
         <Container>
            <StyledImage src={require("../Images/1.jpg")} />
            <Baner>Instructor System Management</Baner>
         </Container>
      </div>
   );
}

export default Home;