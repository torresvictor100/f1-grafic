import './Nav.css'
import React from 'react'
import { Link } from 'react-router-dom'

export default props =>
    <aside className='menu-area'>
        <nav className='menu'>
            <Link to="/">
                <i className="fa fa-home"></i> Início
            </Link>
            <Link to="/pilotsScore"> {/** Isso é olhando o back */}
                <i class="fa fa-money-bill-1"></i> Pilots Score
            </Link>
            <Link to="/constructorScores"> {/** Isso é olhando o back */}
                <i class="fa fa-money-bill-1"></i>Constructor Scores
            </Link>
        </nav>
    </aside>