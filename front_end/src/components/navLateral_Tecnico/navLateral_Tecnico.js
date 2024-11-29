import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./navLateral_Tecnico.css";
import NavAbertaT from '../NavAberta_Tecnico/NavAberta_Tecnico'; // Importa o componente de menu lateral maior
import BarraMenu from "../../assets/MenuH.png";
import Home from "../../assets/Home.png";
import Calendario from "../../assets/Calendário.png";

const NavLateralTecnico = () => {
    const [menuOpen, setMenuOpen] = useState(false); // Controla a abertura do menu lateral maior
    const [currentTime, setCurrentTime] = useState(new Date());
    const location = useLocation();

    // Exibe no console a rota atual
    // console.log(location);

    // Efeito para mudar a cor de fundo com base na rota
    useEffect(() => {
        switch (location.pathname) {
            case "/Tecnico":
                document.getElementById("HomeT").style.backgroundColor = "#93A5DD";
                break;
            default:
                break;
        }
    }, [location]);

    // Atualiza o relógio a cada segundo
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Função para formatar a hora
    const formatTime = (date) => {
        return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    };

    // Função para formatar a data
    const formatDate = (date) => {
        return date.toLocaleDateString('pt-BR');
    };

    // Função para abrir/fechar o menu lateral maior
    const toggleMenu = () => {
        setMenuOpen(!menuOpen); // Alterna entre true e false
    };

    return (
        <>
            <nav className="sidebarT">
                <ul>
                    <li className="MenuT" onClick={toggleMenu}>
                        <img src={BarraMenu} alt="Menu"></img>
                    </li>
                    <Link to="/Tecnico">
                        <li id="HomeT" className="defaultColorT">
                            <img src={Home} alt="Home"></img>
                        </li>
                    </Link>
                </ul>
                <div className="date-timeT">
                    <img className="CalendarioT" src={Calendario} alt="Símbolo do Calendário"></img>
                    <p className="HoraT">{formatTime(currentTime)}</p>
                    <p className="DataT">{formatDate(currentTime)}</p>
                </div>
            </nav>

            {/* Renderiza o menu lateral maior e passa o controle de estado */}
            <NavAbertaT closeMenu={toggleMenu} menuOpen={menuOpen} />
        </>
    )
}

export default NavLateralTecnico
