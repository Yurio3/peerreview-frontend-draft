import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import EditProfile from "./pages/editProfile/EditProfile";

import { useContext } from "react";

function App() {
  return (<div className="app">
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Navigate to="/login"  />} />
                  <Route path="login" element={<Login />} />
                  <Route path="register" element={<Register />} />
                  <Route path="home" element={<Home />} />
                  <Route path="editprofile" element={<EditProfile />} />
              </Routes>
          </BrowserRouter>
  </div>
  );
}

export default App;
