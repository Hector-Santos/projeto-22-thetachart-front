import React, { useState, useEffect, useContext } from "react";
import { TokenContext } from "../context/TokenContext";
import { useNavigate, } from "react-router-dom";
import { Header } from "../components/Header/Header";
import styled from "styled-components";
import { BarChart } from "../components/charts/Barchart";
import { ThreeDots } from "react-loader-spinner";
import useWindowDimensions from "../Hooks/WindowResizeHook";

import axios from "axios";




export default function BarChartView(){

  const [columnColors, setCollumnColors] = useState("");
  const [columnNames,  setCollumnNames] = useState("");
  const [columnValues,  setCollumnValues ] = useState("");
  const [colorButton, setColorButton] = useState("#274c77");
  const [disabled, setDisabled] = useState(false);
  const [botao, setBotao] = useState("Create new chart");
  const [title, setTitle] = useState("");
  const [chartWidth, setChartWidth] = useState(200);
  const [chartHeigth, setChartHeigth] = useState(100);
  const [fontsize, setFontsize] = useState(25);
  const { width } = useWindowDimensions();
  const { token, header, setToken} = useContext(TokenContext);
  const REACT_APP_REQUEST_URL = process.env.REACT_APP_REQUEST_URL;
  const navigate = useNavigate();
  const page = "";
  
  useEffect(()=>{
    if(width<1000){
      setChartHeigth(800);
      setChartWidth(100);
      setFontsize(18);
    }
    if(width>1000){
      setChartHeigth(100);
      setChartWidth(300);
      setFontsize(25);
    }
  },[width] );

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

    const chartId = window.localStorage.getItem("chartId");
    let promise = axios.get(`${REACT_APP_REQUEST_URL}/barchart/find/${chartId}`, header);
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

  function createNew(){
    setDisabled(true);
    setColorButton("#4a759e");
    setBotao(<ThreeDots color="white" height={80} width={80} />);
    navigate("/typechoice");
  }
    
  return (
    <>
      <Header page={page}>
      </Header>
      <Container>
        <BarChartContainer>
          <BarChart columnColors={columnColors}
            columnNames ={columnNames} columnValues= {columnValues}
            title = {title} width={chartWidth} heigth={chartHeigth} fontSize={fontsize}> 
          </BarChart>
         
        </BarChartContainer> 
        {<CreateNew colorButton={colorButton} disabled ={disabled} onClick={()=> createNew()}> {botao}
        </CreateNew>}
        <div>.</div>
      </Container>
    </>
  );
}


const BarChartContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
width: 90vw;
height: 75vh;
;
@media only screen and (max-width: 1000px) {
   width: 90vw;
   height: 60vh;
  } 
`;

export const Container = styled.div`
 
  padding-top: 5vw;
  overflow-x: hidden;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: flex-start;
  font-family: 'Manrope', sans-serif; 
  font-size: 20px; 
  padding-bottom: 50px; 
  position: relative; 
  h1{ 
    font-family: 'Manrope', sans-serif; 
    font-size: 30px; 
    font-weight: 500;
    color: #274c77; 
   
  }
  @media only screen and (max-width: 1000px) {
   padding-top: 20VH;
  } 
  
  `;

export const  CreateNew = styled.div`
display:flex;
margin-top: 5vh;
margin-bottom: 10vh;
align-items: center; 
justify-content: center; 
height: 45px; 
width: 30vw; 
border-radius: 5px; 
color: white; 
font-weight: bold; 
background-color: ${props => props.colorButton} ; 
border: none; 
font-family: 'Manrope', sans-serif; 
font-size: 20px;

@media only screen and (max-width: 1000px) {
    width: 80vw;
  } 

`;