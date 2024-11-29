import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./navLateral_R.css";
import NavAbertaR from '../NavAberta_Recep/NavAberta_Recep'; // Importa o componente de menu lateral maior
import BarraMenu from "../../assets/MenuH.png";
import Home from "../../assets/Home.png";
import TodosPacientes from "../../assets/Pacientes.png";
import CadastroTecnico from "../../assets/Cadastro.png";
import NovoExame from "../../assets/NovoExame.png";
import Calendario from "../../assets/Calendário.png";

const NavLateralR = () => {
  const [menuOpen, setMenuOpen] = useState(false); // Controla a abertura do menu lateral maior
  const [currentTime, setCurrentTime] = useState(new Date());
  const location = useLocation();

  // Exibe no console a rota atual
  // console.log(location);

  // Efeito para mudar a cor de fundo com base na rota
  useEffect(() => {
    switch (location.pathname) {
      case "/Recepcionista":
        document.getElementById("Home").style.backgroundColor = "#93A5DD";
        break;
      case "/Recepcionista/TodosPacientes":
        document.getElementById("TPacientes").style.backgroundColor = "#93A5DD";
        break;
      case "/Recepcionista/CadastroTecnico":
        document.getElementById("CTecnico").style.backgroundColor = "#93A5DD";
        break;
      case "/Recepcionista/CadastroExame":
        document.getElementById("NExame").style.backgroundColor = "#93A5DD";
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
      <nav className="sidebar">
        <ul>
          <li className="Menu" onClick={toggleMenu}>
            <img src={BarraMenu} alt="Menu"></img>
          </li>
          <Link to="/Recepcionista">
            <li id="Home" className="defaultColor">
              <img src={Home} alt="Home"></img>
            </li>
          </Link>
          <Link to="/Recepcionista/TodosPacientes">
            <li id="TPacientes" className="defaultColor">
              <img src={TodosPacientes} alt="Todos os Pacientes"></img>
            </li>
          </Link>
          <Link to="/Recepcionista/CadastroTecnico">
            <li id="CTecnico" className="defaultColor">
              <img src={CadastroTecnico} alt="Cadastro do Técnico"></img>
            </li>
          </Link>
          <Link to="/Recepcionista/CadastroExame">
            <li id="NExame" className="defaultColor">
              <img src={NovoExame} alt="Novo Exame"></img>
            </li>
          </Link>
        </ul>
        <div className="date-time">
          <img className="Calendario" src={Calendario} alt="Símbolo do Calendário"></img>
          <p className="Hora">{formatTime(currentTime)}</p>
          <p className="Data">{formatDate(currentTime)}</p>
        </div>
      </nav>

      {/* Renderiza o menu lateral maior e passa o controle de estado */}
      <NavAbertaR closeMenu={toggleMenu} menuOpen={menuOpen} />
    </>
  );
}

export default NavLateralR;