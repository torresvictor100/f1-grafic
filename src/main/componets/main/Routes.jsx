import React from "react";
import { Routes, Route } from "react-router-dom";

import Construtores from "../Desk/Construtores";
import DeskCrud from "../Desk/DeskCrud";
import Home from "../home/Home";

export default props =>
    <Routes>
        <Route exact path="/" element = {<Home/>}/>
        <Route path="/pilotos" element = {<DeskCrud/>}/>
        <Route path="/construtores" element = {<Construtores/>}/>
        <Route path="*" element={<Home/>}/>
    </Routes>