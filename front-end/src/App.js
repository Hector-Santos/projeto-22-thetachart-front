import GlobalStyle from "./styles/global";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TokenProvider from "./context/TokenContext";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import TypeChoice from "./pages/TypeChoice";
import ComingSoon from "./pages/ComingSoon";
import CreateBarChart from "./pages/CreateBarChart";


function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <TokenProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<SignUp />} />
          <Route path="/typechoice" element={<TypeChoice />} />
          <Route path="/comingsoon" element={<ComingSoon />} />
          <Route path="/barchart/create" element={<CreateBarChart />} />
        </Routes>
      </TokenProvider>
    </BrowserRouter>
  );
}

export default App;
