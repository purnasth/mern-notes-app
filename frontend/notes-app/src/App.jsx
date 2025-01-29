import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Navbar from "./components/Navbar/Navbar";
import axiosInstance from "./utils/axiosInstance";

// const routes = (
//   <Router>
//     <Navbar />
//     <Routes>
//       <Route path="/dashboard" exact element={<Home />} />
//       <Route path="/login" exact element={<Login />} />
//       <Route path="/signup" element={<SignUp />} />
//     </Routes>
//   </Router>
// );

const App = () => {
  const [userInfo, setUserInfo] = useState(null);

  const navigate = useNavigate();

  // Get user info

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");

      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    getUserInfo();
    return () => {};
  }, []);

  return (
    <>
      {/* {routes} */}
      <Navbar userInfo={userInfo} />
      <Routes>
        <Route path="/dashboard" exact element={<Home />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
};

export default App;
