import './Nav.css'
import React from 'react'
import { Link } from 'react-router-dom'

export default props =>
    <aside className='menu-area'>
        <nav className='menu'>
            <Link to="/">
                <i className="fa fa-home"></i> Início
            </Link>
            <Link to="/deskcrud"> {/** Isso é olhando o back */}
                <i class="fa fa-money-bill-1"></i> Editar Caixas
            </Link>
            <Link to="/construtores"> {/** Isso é olhando o back */}
                <i class="fa fa-money-bill-1"></i>Campeões
            </Link>
        </nav>
    </aside>