import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import {useState} from 'react';
import Checkout from "./Checkout";
import { Course } from "./interfaces";

const RouteSwitch = () => {


     


  
    return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<App  />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </BrowserRouter>

  );
};

export default RouteSwitch;