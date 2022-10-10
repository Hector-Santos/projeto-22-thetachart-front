import { Container, Form } from "./Login";
import {Link} from "react-router-dom";
import { useState } from "react";
import React from "react";
import axios from "axios";
import { useNavigate, } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { Header } from "../components/Header/Header";







export default function SignUp(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [botao, setBotao] = useState("Cadastrar");
  const [colorButton, setColorButton] = useState("#274c77");
  const [colorInput, setColorInput] = useState("#274c77");
  const navigate = useNavigate();
  const REACT_APP_REQUEST_URL = process.env.REACT_APP_REQUEST_URL;
  const page = "signup";

  function register(event) {
    event.preventDefault();
    setDisabled(true);
    setColorButton("#4a759e");
    setColorInput("#4a759e");
    setBotao(<ThreeDots color="white" height={80} width={80} />);
    let body = 
    {
      email: email,
      password: password,
      confirmPassword: confirmPassword
    };

    let promise = axios.post(
      `${REACT_APP_REQUEST_URL}/signup`
      ,body);
    promise.then((() => {    
      navigate("/");
    }));
  
    promise.catch((response => {
      alert(response.response.data);
      setColorButton("#274c77");
      setColorInput("#274c77");
      setDisabled(false);
      setBotao("Signup");
    }
    ));
    
  
  }
  return (
    <Container disabled={disabled} colorButton={colorButton} colorInput = {colorInput}>
      <Header page={page}>
      </Header>
      <Form>
        <form onSubmit={register}>
          <input disabled={disabled} placeholder = "Email" type= "email" value={email} onChange={e => setEmail(e.target.value)} />
          <input disabled={disabled} placeholder = "Password" type="password"value={password} onChange={e => setPassword(e.target.value)}/>
          <input disabled={disabled} placeholder = "Confirm password" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
          <button type="submit">{botao}</button>
        </form>
        <Link to = "/">
          <h2>already have an account? login now!</h2>
        </Link>
      </Form>
    </Container>
  );
}


