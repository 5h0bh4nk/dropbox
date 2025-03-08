import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FileViewer from "./pages/FileViewer";
import UploadFile from './components/UploadFile';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/file/:_id" element={<FileViewer />} />
        <Route path="/upload" element={<UploadFile />} />
      </Routes>
    </Router>
  );
};


export default App;
