import { useState, useEffect, useContext } from "react";
import React from "react";
import axios from "axios";
import { Header } from "../components/Header/Header";
import styled from "styled-components";
import { TokenContext } from "../context/TokenContext";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { CompactPicker } from "react-color";




function Column({index, names, setNames,colors, setColors, values, setValues, disabled}){ 
  const [name, setName] = useState() ;
  const [color, setColor ]= useState(null);
  const [divColor, setDivColor ]= useState("#a3cef1");
  const [value, setValue] = useState();
  
  function changeColor(e){
    const newColor = {
      hex: e.hex,
      rgb: "(" + e.rgb.r + "," + e.rgb.g + "," + e.rgb.b + "," + e.rgb.a + ")"
    };
    setColor(newColor);
    let auxColors = colors;
    auxColors[index] = e.hex;
    setColors(auxColors);
    setDivColor(e.hex);
  }

  function changeValue(){
    if(isNaN(value)){
      alert("value must be a number");
      setValue(0);
    }else{
      let auxValues = values;
      auxValues[index] = value;
      setValues(auxValues);
    }
  }
  function changeName(){
    let auxNames = names;
    auxNames[index] = name;
    setNames(auxNames);
  }

  return(
    <Form disabled= {disabled} divColor={divColor} >
      <input  disabled ={disabled} placeholder = "Name" type= "text" value={name} onBlur={() => changeName()} onChange ={e => setName(e.target.value)} />
      <div>
        <CompactPicker
          color={color !== null && color.hex}
          onChange={e => changeColor(e)}
          disableAlpha
          renderers={false}
        /> 
      </div>
      <input  disabled ={disabled} placeholder = "Value" type= "text" value={value} onBlur={() => changeValue()} onChange ={e => setValue(e.target.value)}/>
    </Form>
  );
}
export default function CreateBarChart(){ 
  const [columNames, setColumnNames] = useState([]);
  const [columnColors, setColumnColors] = useState([]);
  const [columnValues, setColumnValues] = useState([]);
  const [columnNumber, setColumnNumber] = useState();
  const [title, setTitle] = useState();
  console.log(columNames);
  const [disabled, setDisabled] = useState(false);
  const [botao, setBotao] = useState("Create chart");
  const [colorButton, setColorButton] = useState("#274c77");
  const [colorInput, setColorInput] = useState("#274c77");


  const { token, header, setToken} = useContext(TokenContext);

  const navigate = useNavigate();
  const REACT_APP_REQUEST_URL = process.env.REACT_APP_REQUEST_URL;
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


  useEffect(()=>{
    columnCreation(columnNumber);
  },[columnNumber] );


  function columnCreation(number){
    if(number<1){
      alert("Number of columns must be a value between 1 and 20");
      setColumnNumber(1);
    }else if (number>20){
      alert("Number of columns must be a value between 1 and 20");
      setColumnNumber(20);
    }else{
      setColumnNumber(number);
      let namesAux = [];
      let colorsAux = [];
      let valuesAux = [];
      for(let i = 0; i < number; i++){
        columNames[i]? namesAux.push(columNames[i]):namesAux.push("name");
        columnColors[i]? colorsAux.push(columnColors[i]):colorsAux.push("#ffffff");
        columnValues[i]? valuesAux.push(columnValues[i]):valuesAux.push(1);
      }
      setColumnNames(namesAux);
      setColumnColors(colorsAux);
      setColumnValues(valuesAux);
    }
  }

  function changeColumnNumber(operation){
    let aux; 
    columnNumber? aux = columnNumber: aux = 0;
    if(operation === "+"){
      aux ++;
    }else{ 
      aux--;
    }
    setColumnNumber(aux);
  }

  function criarGrafico(){
    if(!header) return;
    setDisabled(true);
    setColorButton("#4a759e");
    setColorInput("#4a759e");
    setBotao(<ThreeDots color="white" height={80} width={80} />);

    const body = {
      title: title,
      columnNumber: columnNumber,
      columnNames: columNames,
      columnColors: columnColors,
      columnValues: columnValues
    };
    console.log(header);
    let promise = axios.post(`${REACT_APP_REQUEST_URL}/barchart/create`, body, header );
    promise.then((response => {
      console.log(response);
      window.localStorage.setItem("chartId", response.data);
      navigate("/barchart/show");
    }));
    promise.catch((response => {
      alert(response.response.data);
      setColorButton("#274c77");
      setColorInput("#274c77");
      setDisabled(false);
      setBotao("Criar Grafico");
    }
    ));  

  }

  return (
    <>
      <Header page={page}>
      </Header>
      <Container disabled={disabled} colorInput= {colorInput} >
        <TitleNumber>
          <h1>Choose the title to your bar chart</h1>
          <input disabled ={disabled} placeholder = "Title" type= "text" value={title} onChange={e => setTitle(e.target.value)} />
          <h1>how many columns will your chart need?  choose a number between 1 and 20</h1>
          <ColumnNumber colorButton={colorButton}>
            <div onClick={()=> changeColumnNumber("+")}>+</div>
            <input disabled ={true} placeholder = "Number" type= "number" value={columnNumber} onChange={e => columnCreation(e.target.value)} />
            <div onClick={()=> changeColumnNumber("-")}>-</div>
          </ColumnNumber>
          { columNames.length > 0 ? <h1> Now choose a name, a color and a value for each column</h1> : <></>}
        </TitleNumber>
        <Columns>
          {columNames.length > 0 ? columNames.map((name, index)=>{
            return ( 
              <Column key={index} index={index} names = {columNames} setNames = {setColumnNames}
                colors={columnColors} setColors = {setColumnColors} values={columnValues}
                setValues={setColumnValues} disabled ={disabled}>
              </Column>);
          }) : <></>}
          {columNames.length > 0 ?<CreateChart colorButton={colorButton} disabled ={disabled} onClick={()=> criarGrafico()}> {botao}
          </CreateChart>: <></>}
          <div>.</div>
        </Columns>   
      </Container>
    </>
  );

}


export const Container = styled.div`
  box-sizing: border-box; 
  padding-top: 5vw;
  display: flex;
  overflow-x: hidden;
  flex-direction: column; 
  align-items: center; 
  justify-content: center; 
  font-family: 'Manrope', sans-serif; 
  font-size: 20px; 
  height: 100vh; 
  width: 100vw; 
  padding-bottom: 50px; 
  position: relative; 
  button{ 
      display: flex; 
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
  } 
  img{ 
        height: auto; 
        width: 200px; 
  } 
  input{ 
    height: 45px; 
    border-radius: 5px; 
    margin-bottom: 10px; 
    width: 30vw; 
    color : ${props => props.colorInput }; 
    border: 1px solid #D4D4D4; 
    font-size: 20px; 
    text-align: center;
    background-color: #ffffff; 
    ::placeholder{ 
      font-family: 'Manrope', sans-serif; 
      font-size: 20px; 
      color: #274c77; 
      text-align: center;
    }
    @media only screen and (max-width: 1000px) {
    width: 80vw;
    margin-bottom: 0px;
  }
  }
  input[type=number]::-webkit-inner-spin-button, 
  input[type=number]::-webkit-outer-spin-button {
  opacity: 1;
  } 
  h1{ 
    font-family: "Secular One", sans-serif; 
    font-size: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
    text-align: center;
  }
  @media only screen and (max-width: 1000px) {
    padding-top: 40vw;
  }   
`;


export const Form = styled.div`  
  background-color: ${props => props.divColor };
  width: 90vw;
  height: 20vh;
  margin-top: 3vh;
  display: flex;
  align-items: center;
  justify-content: space-around;
  form{
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
  } 
  @media only screen and (max-width: 1000px) {
    width: 90vw;
    height: 40vh;
    flex-direction: column;
  }
  `;
export const TitleNumber = styled.div`
box-sizing:border-box;
display: flex;
flex-direction: column;
align-items: center;
`;

export const  Columns= styled.div`
margin-bottom: 10vh;
position:static;
align-items: center;
height: 40vh;
div{
  color  : #e7ecef;
}
`;

export const  CreateChart= styled.div`
display: flex; 
margin-top: 10vh;
margin-bottom: 10vh;
margin-left: 30vw;
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
    margin-left: 4vw;
  } 

`;
export const  ColumnNumber= styled.div`
display: flex;
width: 100vw;
align-items: center;
justify-content: center;
div{
display: flex; 
align-items: center; 
justify-content: center; 
height: 45px; 
width: 45px; 
border-radius: 5px; 
color: white; 
font-weight: bold; 
background-color: ${props => props.colorButton} ; 
border: none; 
font-family: 'Manrope', sans-serif; 
font-size: 20px;
}
input{
  height: 45px; 
    border-radius: 5px;  
    width: 30vw; 
    margin-left: 5vw;
    margin-right: 5vw;
    color : #274c77; 
    border: 1px solid #D4D4D4; 
    font-size: 20px; 
    background-color: #ffffff; 
    text-align: center;
    ::placeholder{ 
      font-family: 'Manrope', sans-serif; 
      font-size: 20px; 
      color: #274c77; 
      text-align: center;
     }
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
} 

@media only screen and (max-width: 1000px) {
display: flex;
justify-content: space-around;
input{
  margin-left: 0vw;
  margin-right: 0vw;
}
  } 
`;

