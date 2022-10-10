import React, { useState, useEffect, useContext } from "react";
import { TokenContext } from "../context/TokenContext";
import { useNavigate, } from "react-router-dom";
import { Header } from "../components/Header/Header";
import styled from "styled-components";
import { BarChart } from "../components/charts/Barchart";


import axios from "axios";




export default function MyCharts(){
  const [charts, setCharts] = useState("");
  const { token, header, setToken} = useContext(TokenContext);
  const REACT_APP_REQUEST_URL = process.env.REACT_APP_REQUEST_URL;
  const navigate = useNavigate();
  const page = "mycharts";

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
    
    let promise = axios.get(`${REACT_APP_REQUEST_URL}/barchart/find`, header);
    promise.then((response => {
      setCharts(response.data);
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
        <Charts>
          {charts? charts.map(((chart, index)=>{
            return ( 
              <Chart key={index} onClick={()=> navigate("/barchart/create")}>
                <BarChart key={index} columnColors={chart.columnColors}
                  columnNames ={chart.columnNames} columnValues= {chart.columnValues}
                  title = {chart.title} width = {300} height = {200} fontSize = {12}>
                </BarChart>
              </Chart>
            );
          })): <h1>You have no charts yet. Click here to create a chart</h1>}      
        </Charts>
       
      </Container>
    </>
  );
}


const Chart = styled.div`
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

const Charts = styled.div`
  display: flex;
  flex-flow: wrap;
  width: 90vw; 
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