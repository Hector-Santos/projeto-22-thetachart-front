import GlobalStyle from "./styles/global";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TokenProvider from "./context/TokenContext";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";


function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <TokenProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
        </Routes>
      </TokenProvider>
    </BrowserRouter>
  );
}

export default App;
