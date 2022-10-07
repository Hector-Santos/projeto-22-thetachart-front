import React, { useEffect, useContext } from "react";
import { TokenContext } from "../context/TokenContext";
import { useNavigate, } from "react-router-dom";
import { Header } from "../components/Header/Header";
import styled from "styled-components";


export default function ComingSoon(){

  const { token, setToken} = useContext(TokenContext);
 
  const navigate = useNavigate();
  const page = "signup";

  useEffect(()=>{
    ( ()=>{
       
      const localStorageToken = window.localStorage.getItem("token");
      if(localStorageToken && !token){
        setToken(localStorageToken);
      }else if(!localStorageToken && !token){
        navigate("/");
      }else if(!localStorageToken && token){
        window.localStorage.setItem("token", token);
      }
    })();
  }, );

  
    
  return (
    <Container>
      <Header page={page}>
      </Header>
      <Option onClick={()=> navigate("/typechoice")}>
        <h1>Coming Soon. Click Here To Return</h1>
      </Option>
    </Container>
  );
}


const Option = styled.div`
display: flex;
flex-direction: column;
align-items: center;
height: 10vw;
`;

export const Container = styled.div`
  box-sizing: border-box; 
  margin-top: 60px;
  display: flex;  
  align-items: center; 
  justify-content: space-around; 
  font-family: 'Manrope', sans-serif; 
  font-size: 20px; 
  height: 100vh; 
  width: 100vw; 
  padding-bottom: 50px; 
  position: relative; 
  h1{ 
    font-family: 'Manrope', sans-serif; 
    font-size: 30px; 
    font-weight: 500;
    color: #274c77; 
    margin-bottom: 30px; 
  }`;