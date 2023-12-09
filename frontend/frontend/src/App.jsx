import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import ViewAll from "./components/ViewAll";
import Register from "./components/Register";

import { Navbar } from "./components";
import { useState } from "react";
import Loader from "./components/Loader";

const App = () => {
  const [masterUsername,setMasterUsername] = useState('');
  const [loading,setLoading] = useState(false);
  return (
    <BrowserRouter>
      <Navbar username={masterUsername} setUsername={setMasterUsername}/>
      {loading && <Loader />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/viewAll' element={<ViewAll loading={setLoading} username={masterUsername} />} />
        <Route path='/login' element={<Login loading={setLoading} setUsername={setMasterUsername} />} />
        <Route path="/register" element={<Register loading={setLoading} setUsername={setMasterUsername} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
