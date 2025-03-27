import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import LoanApplicationForm from "./pages/LoanApplicationForm"; // Import Loan Form Page

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply-loan" element={<LoanApplicationForm />} />
      </Routes>
    </Router>
  );
};

export default App;
