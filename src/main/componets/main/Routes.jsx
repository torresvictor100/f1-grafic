import React from "react";
import { Routes, Route } from "react-router-dom";

import Desk from "../Desk/Desk";
import DeskCrud from "../Desk/DeskCrud";
import Home from "../home/Home";

export default props =>
    <Routes>
        <Route exact path="/" element = {<Home/>}/>
        <Route path="/deskcrud" element = {<DeskCrud/>}/>
        <Route path="/desk" element = {<Desk/>}/>
        <Route path="*" element={<Home/>}/>
    </Routes>