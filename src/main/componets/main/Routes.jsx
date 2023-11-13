import React from "react";
import { Routes, Route } from "react-router-dom";

import Construtores from "../makeGraphs/Construtores";
import Comparar from "../makeGraphs/Comparar";
import Home from "../home/Home";

export default props =>
    <Routes>
        <Route exact path="/" element = {<Home/>}/>
        <Route path="/comparar" element = {<Comparar/>}/>
        <Route path="/construtores" element = {<Construtores/>}/>
        <Route path="*" element={<Home/>}/>
    </Routes>