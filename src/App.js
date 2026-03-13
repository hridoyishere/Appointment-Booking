import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FindDoctorPage from "./Pages/FindDoctorPage/FindDoctor";
import ContactPage from "./Pages/ContractPage/Contact";
import { AuthProvider } from "./Context/AuthContext";
import Success from "./Components/SuccessMessage/Success";
import UserProfile from "./Pages/UserProfile/Profile";
import "./App.css"
import Home from "./Pages/Home/Home";

function App() {
  return (
    <Router>
      <AuthProvider>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/find-doctor" element={<FindDoctorPage />} />
        <Route path="/contact" element={<ContactPage/>}/>
        <Route path="/success" element={<Success/>}/>
        <Route path="/profile" element={<UserProfile/>}/>
      </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;