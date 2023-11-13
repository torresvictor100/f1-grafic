import './Nav.css'
import React from 'react'
import { Link } from 'react-router-dom'

export default props =>
    <aside className='menu-area'>
        <nav className='menu'>
            <Link to="/">
                <i ></i> Start
            </Link>
            <Link to="/pilotsScore">
                <i ></i> Pilots Score
            </Link>
            <Link to="/constructorScores"> 
                <i ></i>Constructor Scores
            </Link>
        </nav>
    </aside>