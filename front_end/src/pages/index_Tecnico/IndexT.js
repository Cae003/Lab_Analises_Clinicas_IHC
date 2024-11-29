import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./IndexT.css";
import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';
import NavLateralTecnico from '../../components/navLateral_Tecnico/navLateral_Tecnico';
import lupa from "../../assets/Lupa.png";
import coletaPendenteIMG from  "../../assets/ColetaPend.png";

const IndexT = () => {
  const navigate = useNavigate();

  function goExame() {
    navigate("ColetaExame");
  }

  return (
    <div>
      <Header />
      <NavLateralTecnico />
      <main className="main-contentHT">
        <header className="search-barHT">
          <span>Lista de Exames para Coleta</span>
          <div className="input-containerHT">
            <img src={lupa} alt="Ícone de Pesquisa"></img>
            <input placeholder="Pesquisar Exame" type="text" />
          </div>
        </header>
        <article>
          <ul className="patient-listHT">
            <li onClick={goExame}>
              <img src={coletaPendenteIMG} alt="Ícone do Paciente"></img>
              <p className="nomeHT">Wanderley de Almeida Souza</p>
              <p className="RP_HT">180523001</p>
              <p className="TipoExameHT">Glicemia</p>
            </li>
            <li onClick={goExame}>
              <img src={coletaPendenteIMG} alt="Ícone do Paciente"></img>
              <p className="nomeHT">Ana Clara Pereira da Silva</p>
              <p className="RP_HT">180523002</p>
              <p className="TipoExameHT">Glicemia</p>
            </li>
            <li onClick={goExame}>
              <img src={coletaPendenteIMG} alt="Ícone do Paciente"></img>
              <p className="nomeHT">Carlos Eduardo Moreira Santos</p>
              <p className="RP_HT">180723001</p>
              <p className="TipoExameHT">Glicemia</p>
            </li>
            <li onClick={goExame}>
              <img src={coletaPendenteIMG} alt="Ícone do Paciente"></img>
              <p className="nomeHT">Maria Júlia Costa Ferreira</p>
              <p className="RP_HT">180723002</p>
              <p className="TipoExameHT">Glicemia</p>
            </li>
            <li onClick={goExame}>
              <img src={coletaPendenteIMG} alt="Ícone do Paciente"></img>
              <p className="nomeHT">Pedro Henrique Lopes Oliveira</p>
              <p className="RP_HT">190823001</p>
              <p className="TipoExameHT">Glicemia</p>
            </li>
            <li onClick={goExame}>
              <img src={coletaPendenteIMG} alt="Ícone do Paciente"></img>
              <p className="nomeHT">Beatriz Souza Nascimento Costa</p>
              <p className="RP_HT">200823001</p>
              <p className="TipoExameHT">Glicemia</p>
            </li>
            <li onClick={goExame}>
              <img src={coletaPendenteIMG} alt="Ícone do Paciente"></img>
              <p className="nomeHT">João Victor Alves Martins</p>
              <p className="RP_HT">301223001</p>
              <p className="TipoExameHT">Glicemia</p>
            </li>
          </ul>
        </article>
      </main>
      <Footer />
    </div>
  )
}

export default IndexT
