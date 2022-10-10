
import { Link } from "react-router-dom";
import styled from "styled-components";


export function Header({page}){
     
  return (
    <Container >
      <a>ThetaChart</a>
      {page === "login" ||  page === "signup" ? <></>
        : page === "mycharts" ? <Link style={{textDecoration: "none"}}
          to = "/typechoice"><b>Create New Chart</b></Link>
          : <Link style={{textDecoration: "none"}}
            to = "/mycharts"><b>My charts</b></Link>}
    </Container>
  );
}



const Container = styled.div`
    display: flex;
    height: 60px;
    width: 100vw;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1;
    background-color: #274c77;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 1px 5px;
    font-family: 'Epilogue', sans-serif;
    text-decoration: none;
    padding-left: 5vw;
    padding-right: 5vw;

    a{
    height: 100%;
    font-family: 'Epilogue', sans-serif;
    font-size: 35px;
    font-weight: 400;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    }   

    b{
    height: 100%;
    font-family: 'Epilogue', sans-serif;
    font-size: 25px;
    font-weight: 400;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    text-align: center;
    } 

    @media only screen and (max-width: 1000px) {
    padding-left: 5vw;
    padding-right: 5vw;
    a{
        font-size: 22px;
     }
     b{
        font-size: 18px;
     }
  } 
   `;



