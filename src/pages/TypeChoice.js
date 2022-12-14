import React, { useState, useEffect, useContext } from "react";
import { TokenContext } from "../context/TokenContext";
import { useNavigate, } from "react-router-dom";
import { Header } from "../components/Header/Header";
import styled from "styled-components";
import { BarChart } from "../components/charts/Barchart";
import { LineChart } from "../components/charts/LineChart";
import { PieChart } from "../components/charts/PieChart";

import axios from "axios";




export default function TypeChoice(){

  const [columnColors, setCollumnColors] = useState("");
  const [columnNames,  setCollumnNames] = useState("");
  const [coumnValues,  setCollumnValues ] = useState("");
  const [title, setTitle] = useState("");
  const { token, header, setToken} = useContext(TokenContext);
  const REACT_APP_REQUEST_URL = process.env.REACT_APP_REQUEST_URL;
  const navigate = useNavigate();
  const page = "";

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

  useEffect(() => {
    if(!token) return;
    
    let promise = axios.get(`${REACT_APP_REQUEST_URL}/barchart/random`, header);
    promise.then((response => {
      setCollumnColors(response.data.columnColors);
      setCollumnNames(response.data.columnNames);
      setCollumnValues(response.data.columnValues);
      setTitle(response.data.title);
    }));
    promise.catch((response => {
      alert(response.response.data);
    }));
  }, [token]);
    
  return (
    <>
      <Header page={page}>
      </Header>
      <Container>
        <h1>Choose a type of chart to create</h1>
        <Options>
          <Option onClick={()=> navigate("/comingsoon")}>
            <LineChart></LineChart>
            <h1>Line Chart</h1>
          </Option>
          <Option onClick={()=> navigate("/barchart/create")}>
            <BarChart columnColors={columnColors}
              columnNames ={columnNames} columnValues= {coumnValues}
              title = {title} width = {300} height = {200}
              fontSize = {12}></BarChart>
            <h1>Bar Chart</h1>
          </Option>
          <Option onClick={()=> navigate("/comingsoon")}>                  
            <PieChart></PieChart>
            <h1>Pie Chart</h1>
          </Option>          
        </Options>
       
      </Container>
    </>
  );
}


const Option = styled.div`
display: flex;
flex-direction: column;
align-items: center;
height: 10vw;
@media only screen and (max-width: 1000px) {
    height: 40vw;
    margin-top: 5vw ;
    margin-bottom: 7vw ;
  } 
`;

const Options = styled.div`
  display: flex;
  width: 100vw; 
  flex-direction: row;
  align-items: center; 
  justify-content: space-around;
  margin-top: 10vw;
  @media only screen and (max-width: 1000px) {
    flex-direction: column;
    margin-top: 0vw;
  }
  `;

export const Container = styled.div`
  box-sizing: border-box; 
  padding-top: 5vw;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: flex-start;
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
   
  }
  @media only screen and (max-width: 1000px) {
    padding-top: 20vw;
    h1{ 
    font-family: 'Manrope', sans-serif; 
    font-size: 20px; 
    font-weight: 500;
    color: #274c77; 
   
  }
  } 
  
  `;