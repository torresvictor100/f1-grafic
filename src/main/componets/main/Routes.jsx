import React from "react";
import { Routes, Route } from "react-router-dom";

import Construtores from "../makeGraphs/Construtores";
import PilotsScore from "../makeGraphs/PilotsScore";
import Home from "../home/Home";

export default props =>
    <Routes>
        <Route exact path="/" element = {<Home/>}/>
        <Route path="/pilotsScore" element = {<PilotsScore/>}/>
        <Route path="/construtores" element = {<Construtores/>}/>
        <Route path="*" element={<Home/>}/>
    </Routes>