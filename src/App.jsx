import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import LoginLayout from "./containers/LoginLayout";
import PrivateRoute from "./hoc/PrivateRoute";
import CloudBg from "./hoc/CloudBg";
import Login from "./containers/Login";
import Register from "./containers/Register";
import Game from "./containers/Game";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { updateUser } from "./slices/authSlice";
import { getUser } from "./api.js";

function App() {
  const token = useSelector((state)=>state.auth.token);
  const user = useSelector((state)=>state.auth.user);
  const dispatch = useDispatch();

  useEffect(()=>{
    (async()=>{
      if(token && user){
        const updatedUser = await getUser(user.userId);
        dispatch(updateUser(updatedUser));      
      }
    })()
  },[token]);

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
