import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import LoginLayout from "./containers/LoginLayout";
import PrivateRoute from "./hoc/PrivateRoute";
import CloudBg from "./hoc/CloudBg";
import Login from "./containers/Login";
import Register from "./containers/Register";
import Game from "./containers/Game";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<CloudBg />}>
          <Route path="/login" element={<LoginLayout children={<Login />} />} />
          <Route path="/register" element={<LoginLayout children={<Register />} />} />
          <Route path="/" element={<PrivateRoute><Game /></PrivateRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
