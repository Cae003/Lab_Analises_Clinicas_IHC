import React, { useContext } from "react";
import "./index_R.css";
import Header from "../../components/Header/header";
import Footer from "../../components/Footer/footer";
import NavLateralR from "../../components/navLateral_Recep/navLateral_R";
import { AccessHistoryContext } from "../../stores/AccessHistoryStore";
import TodosPacientes from "../../assets/PacientesB.png";
import CadastroTecnico from "../../assets/CadastroB.png";
import NovoExame from "../../assets/NovoExameB.png";
import { useNavigate } from "react-router-dom";

const IndexR = () => {
  const { accessHistory } = useContext(AccessHistoryContext); // Acessa o contexto
  const navigate = useNavigate();
  
  function goPag(url) {
    navigate(url);
  }
  
  // Função para determinar o conteúdo baseado na URL
  const renderAccessContent = (url) => {
    if (url === "/Recepcionista/TodosPacientes/Paciente/EditPaciente") {
      return [
        <img key="titulo" src={TodosPacientes} alt="Todos os Pacientes"></img>,
        <p key="subtitulo" className="Titulo">Editar Dados do Paciente</p>
      ];
    } else if (url === "/Recepcionista/TodosPacientes/Paciente") {
      return [
        <img key="titulo" src={TodosPacientes} alt="Todos os Pacientes"></img>,
        <p key="subtitulo" className="Titulo">Ver Dados do Paciente</p>
      ];
    } else if (url === "/Recepcionista/TodosPacientes/Cadastrar") {
      return [
        <img key="titulo" src={TodosPacientes} alt="Todos os Pacientes"></img>,
        <p key="subtitulo" className="Titulo">Cadastro de Paciente</p>
      ];
    } else if (url.startsWith("/Recepcionista/TodosPacientes")) {
      return [
        <img key="titulo" src={TodosPacientes} alt="Todos os Pacientes"></img>,
        <p key="subtitulo" className="Titulo">Lista de Pacientes</p>
      ];
    } else if (url === "/Recepcionista/CadastroTecnico/ConfirmaCadastoTecnico") {
      return [
        <img key="titulo" src={CadastroTecnico} alt="Cadastro do Técnico"></img>,
        <p key="subtitulo" className="Titulo">Confirmar Técnico</p>
      ];
    } else if (url === "/Recepcionista/CadastroTecnico") {
      return [
        <img key="titulo" src={CadastroTecnico} alt="Cadastro do Técnico"></img>,
        <p key="subtitulo" className="Titulo">Cadastro de Técnico</p>
      ];
    } else if (url === "/Recepcionista/CadastroExame/ConfirmaCadastroExame") {
      return [
        <img key="titulo" src={NovoExame} alt="Cadastro do Técnico"></img>,
        <p key="subtitulo" className="Titulo">Confirmar Exame</p>
      ];
    } else if (url === "/Recepcionista/CadastroExame") {
      return [
        <img key="titulo" src={NovoExame} alt="Cadastro do Técnico"></img>,
        <p key="subtitulo" className="Titulo">Cadastro de Exame</p>
      ];
    } else {
      return <p className="Titulo">Ação desconhecida</p>;
    }
  };

  return (
    <div>
      <Header />
      <NavLateralR />
      <main className="main-contentBL">
        <h2>Últimos Acessos</h2>
        {accessHistory.length === 0 ? (
          <p className="sem-acessosIR">Não houve nenhum último acesso</p>
        ) : (
          <ul className="history-listIR">
            {accessHistory.map((access, index) => (
              <li onClick={() => goPag(access.url)} key={index}>
                {renderAccessContent(access.url)}
                <p className="data">Data: {access.date}</p>
                <p className="hora">Hora: {access.time}</p>
              </li>
            ))}
          </ul>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default IndexR;