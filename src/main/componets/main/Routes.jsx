import React from "react";
import { Routes, Route } from "react-router-dom";

import ConstructorScores from "../makeGraphs/ConstructorScores";
import PilotsScore from "../makeGraphs/PilotsScore";
import Home from "../home/Home";

export default props =>
    <Routes>
        <Route exact path="/" element = {<Home/>}/>
        <Route path="/pilotsScore" element = {<PilotsScore/>}/>
        <Route path="/constructorScores" element = {<ConstructorScores/>}/>
        <Route path="*" element={<Home/>}/>
    </Routes>