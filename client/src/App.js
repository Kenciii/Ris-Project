import React from "react";
import Login from "./Login";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./Register";
import Footer from "./Footer";
import MobilesDetails from "./MobilesDetails";
import EditMobile from "./EditMobile";
import AddMobile from "./AddMobile";
import ListUsers from "./ListUsers";
import ReservationPage from "./ReservationPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Login />} />
        <Route path="/home/add" element={<AddMobile />} />
        <Route path="/home/:id" element={<MobilesDetails />} />
        <Route path="/home/edit/:id" element={<EditMobile />} />
        <Route path="/users" element={<ListUsers />} />
        <Route path="/" element={<Login />} />
        <Route path="/reservation" element={<ReservationPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
