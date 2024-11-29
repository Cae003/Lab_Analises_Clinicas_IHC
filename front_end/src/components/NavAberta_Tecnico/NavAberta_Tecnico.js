import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./NavAberta_Tecnico.css";
import Logo from "../../assets/Logo_Definitiva.png";
import fecharX from "../../assets/Xicon.png";
import Home from "../../assets/Home.png";

const NavAbertaTecnico = ({ closeMenu, menuOpen }) => {
    const location = useLocation();

    // Efeito para mudar a cor de fundo com base na rota
    useEffect(() => {
        switch (location.pathname) {
            case "/Tecnico":
                document.getElementById("HomeTA").style.backgroundColor = "#93A5DD";
                break;
            default:
                break;
        }
    }, [location]);
    return (
        <aside className={`sidebarTA ${menuOpen ? '' : 'hide'}`}> {/* Condicional para aplicar a classe hide */}
            <header className="headerTA">
                <img className="logoTA" src={Logo} alt="Lab Logo"></img>
                <button className="XiconTA" aria-label="Fechar menu" onClick={closeMenu}>
                    <img src={fecharX} alt="Fechar Menu"></img>
                </button>
            </header>
            <nav className="NavegacaoTA">
                <Link style={{ textDecoration: "none" }} to="/Tecnico">
                    <section id="HomeTA" className="ItemTA">
                        <img src={Home} alt="Home"></img>
                        <span>Home</span>
                    </section>
                </Link>
            </nav>
        </aside>
    )
}

export default NavAbertaTecnico
