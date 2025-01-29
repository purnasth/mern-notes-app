import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";

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
  return (
    <>
      {/* {routes} */}
      <Router>
        <Routes>
          <Route path="/dashboard" exact element={<Home />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
