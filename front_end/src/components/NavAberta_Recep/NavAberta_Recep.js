import React, { useEffect } from 'react';
import "./NavAberta_Recep.css";
import Logo from "../../assets/Logo_Definitiva.png";
import fecharX from "../../assets/Xicon.png";
import Home from "../../assets/Home.png";
import TodosPacientes from "../../assets/Pacientes.png";
import CadastroTecnico from "../../assets/Cadastro.png";
import NovoExame from "../../assets/NovoExame.png";
import { Link, useLocation } from 'react-router-dom';

const NavAbertaR = ({ closeMenu, menuOpen }) => { // Recebe a função de fechamento por props

  const location = useLocation();

  // Efeito para mudar a cor de fundo com base na rota
  useEffect(() => {
    switch (location.pathname) {
      case "/Recepcionista":
        document.getElementById("HomeMA").style.backgroundColor = "#93A5DD";
        break;
      case "/Recepcionista/TodosPacientes":
        document.getElementById("TPacientesMA").style.backgroundColor = "#93A5DD";
        break;
      case "/Recepcionista/CadastroTecnico":
        document.getElementById("CTecnicoMA").style.backgroundColor = "#93A5DD";
        break;
      case "/Recepcionista/CadastroExame":
        document.getElementById("NExameMA").style.backgroundColor = "#93A5DD";
        break;
      default:
        break;
    }
  }, [location]);

  return (
    <aside className={`sidebarMA ${menuOpen ? '' : 'hide'}`}> {/* Condicional para aplicar a classe hide */}
      <header className="headerMA">
        <img className="logoMA" src={Logo} alt="Lab Logo"></img>
        <button className="Xicon" aria-label="Fechar menu" onClick={closeMenu}>
          <img src={fecharX} alt="Fechar Menu"></img>
        </button>
      </header>
      <nav className="NavegacaoMA">
        <Link style={{ textDecoration: "none" }} to="/Recepcionista">
          <section id="HomeMA" className="ItemMA">
            <img src={Home} alt="Home"></img>
            <span>Home</span>
          </section>
        </Link>
        <Link style={{ textDecoration: "none" }} to="/Recepcionista/TodosPacientes">
          <section id="TPacientesMA" className="ItemMA">
            <img src={TodosPacientes} alt="Todos os Pacientes"></img>
            <span>Todos os Pacientes</span>
          </section>
        </Link>
        <Link style={{ textDecoration: "none" }} to="/Recepcionista/CadastroTecnico">
          <section id="CTecnicoMA" className="ItemMA">
            <img src={CadastroTecnico} alt="Cadastro do Técnico"></img>
            <span>Cadastro de Técnico</span>
          </section>
        </Link>
        <Link style={{ textDecoration: "none" }} to="/Recepcionista/CadastroExame">
          <section id="NExameMA" className="ItemMA">
            <img src={NovoExame} alt="Novo Exame"></img>
            <span>Inserir Novos Exames</span>
          </section>
        </Link>
      </nav>
    </aside>
  );
}

export default NavAbertaR;