import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./header.css";
import Logo from "../../assets/Logo_Definitiva.png";
import IconUser from "../../assets/User.png";
import Logout from "../../assets/exit.png";
import ConfirmaSaida from "../ConfirmaSaida/ConfirmaSaida";
import { UserContext } from '../../stores/UserStore';

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();

  // Funções para manipular o modal
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleConfirmLogout = () => {
    // Lógica de logout
    setShowModal(false);
    alert("Logout confirmado!");
    navigate("/");
  };

  return (
    <div className="containerH">
      <div className="divisa"></div>
      <header className="header">
        <img className="logoH" src={Logo} alt="Lab Logo"></img>
        <div className="options">
          <Link style={{ textDecoration: "none" }} to="/Recepcionista/Perfil">
            <div className="user-info">
              <img src={IconUser} alt="Ícone de Usuário"></img>
              <span>
                {userData.nome ? userData.nome.split(" ").slice(0, 2).join(" ") : "Carregando..."} {/* Exibe o nome ou uma mensagem temporária */}
              </span>
            </div>
          </Link>
          <div className="logout" onClick={handleOpenModal}>
            <img src={Logout} alt="Ícone de Usuário"></img>
            <p className="sair">Sair</p>
          </div>
        </div>
      </header>
      {showModal && (
        <ConfirmaSaida
          message="Tem certeza que deseja sair?"
          onConfirm={handleConfirmLogout}
          onCancel={handleCloseModal}
        />
      )}
    </div>
  );
}

export default Header;