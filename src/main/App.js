import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './App.css'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import Logo from './componets/template/Logo'
import Footer from './componets/template/Footer'
import Nav from './componets/template/Nav'
import Routes from './componets/main/Routes'


export default props =>
    <BrowserRouter>
        <div className='app'>
            <Logo />
            <Routes/>
            <Nav />
            <Footer />
        </div>
    </BrowserRouter>
