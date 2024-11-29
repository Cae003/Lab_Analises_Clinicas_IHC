import React, { useContext, useEffect } from 'react';
import "./VerPaciente.css";
import Header from '../../components/Header/header';
import NavLateralR from '../../components/navLateral_Recep/navLateral_R';
import Footer from '../../components/Footer/footer';
import { useNavigate } from 'react-router-dom';
import { PacienteContext } from '../../stores/PacienteStore';
import axios from 'axios';

const VerPaciente = () => {

  const apiUrl = process.env.REACT_APP_API_URL;
  const { pacienteData, setPacienteData } = useContext(PacienteContext);
  const navigate = useNavigate();

  // Função para buscar a tupla de dados do paciente do backend
  const recebeDados = async () => {
    try {
      const registropaciente = pacienteData.registropaciente;
      const response = await axios.get(`${apiUrl}/api/paciente/${registropaciente}`, {
        registropaciente,
      });
      //console.log(registropaciente);
      setPacienteData(response.data);
    } catch (error) {
      console.error("Erro ao carregar dados do paciente:", error);
    }
  };

  // Para buscar a tupla de dados do paciente
  useEffect(() => {
    recebeDados();
  });

  function goEditPaciente() {
    navigate("EditPaciente");
  }

  return (
    <>
      <Header />
      <NavLateralR />
      <main className="main-contentVP">
        <h1>Informações do Paciente</h1>
        <form>
          <fieldset id="DadosPessoais" className="blocoDadosVP">
            <div className="form-groupVP">
              <label htmlFor="nome">RP (Registro do Paciente)</label>
              <input disabled id="nome" type="text" maxLength="9" value={pacienteData.registropaciente || "Não Existe"} />
            </div>
            <div className="form-groupVP">
              <label htmlFor="nome">Nome Completo</label>
              <input disabled id="nome" type="text" value={pacienteData.nome || "Não Existe"} />
            </div>
            <div className="form-groupVP">
              <label htmlFor="nomeSocial">Nome Social</label>
              <input disabled id="nomeSocial" type="text" value={pacienteData.nomeSocial || "Não Existe"} />
            </div>
            <div className="form-groupVP">
              <label htmlFor="nascimento">Data de Nascimento</label>
              <input disabled id="nascimento" type="text" maxLength="10" value={pacienteData.datanasc || "Não Existe"} />
            </div>
            <div className="form-groupVP">
              <label htmlFor="cpf">CPF</label>
              <input disabled id="cpf" type="text" maxLength="14" value={pacienteData.cpf || "Não Existe"} />
            </div>
            <div className="form-groupVP">
              <label htmlFor="nomeMae">Nome da Mãe</label>
              <input disabled id="nomeMae" type="text" value={pacienteData.nomeMae || "Não Existe"} />
            </div>
            <div className="form-groupVP">
              <label htmlFor="nomeResp">Nome do Responsável</label>
              <input disabled id="nomeResp" type="text" value={pacienteData.nomeResponsavel || "Não Existe"} />
            </div>
            <div className="form-groupVP">
              <label>Sexo Biológico: </label>
              <div className="radio-groupVP">
                <label htmlFor="sexo-m">M</label>
                <input disabled className="sexoOpcaoVP" checked={pacienteData.sexo === "M"} id="sexo-m" name="sexo" type="radio" value="M" />
                <label htmlFor="sexo-f">F</label>
                <input disabled className="sexoOpcaoVP" checked={pacienteData.sexo === "F"} id="sexo-f" name="sexo" type="radio" value="F" />
              </div>
            </div>
          </fieldset>

          <fieldset id="DadosEndereco" className="blocoDadosVP">
            <div className="form-groupVP">
              <label htmlFor="endereco">Endereço</label>
              <input disabled id="endereco" type="text" value={pacienteData.endereco || "Não Existe"} />
            </div>
            <div className="form-groupVP">
              <label htmlFor="cidade">Cidade</label>
              <input disabled id="cidade" type="text" value={pacienteData.cidade || "Não Existe"} />
            </div>
            <div className="form-groupVP">
              <label htmlFor="bairro">Bairro</label>
              <input disabled id="bairro" type="text" value={pacienteData.bairro || "Não Existe"} />
            </div>
            <div className="form-groupVP">
              <label htmlFor="cep">CEP</label>
              <input disabled id="cep" type="text" maxLength="9" value={pacienteData.cep || "Não Existe"} />
            </div>
          </fieldset>

          <fieldset id="Contatos" className="blocoDadosVP">
            <div className="form-groupVP">
              <label htmlFor="email">Email</label>
              <input disabled id="email" type="email" value={pacienteData.email || "Não Existe"} />
            </div>
            <div className="form-groupVP">
              <label htmlFor="telefone1">Telefone 1</label>
              <input disabled id="telefone1" type="tel" value={pacienteData.telefone1 || "Não Existe"} />
            </div>
            <div className="form-groupVP">
              <label htmlFor="telefone2">Telefone 2</label>
              <input disabled id="telefone2" type="tel" value={pacienteData.telefone2 || "Não Existe"} />
            </div>
          </fieldset>

          <div className="edit-buttonVP">
            <button type="button" onClick={goEditPaciente}>EDITAR INFORMAÇÕES</button>
          </div>
        </form>
      </main>
      <Footer />
    </>
  )
}

export default VerPaciente
