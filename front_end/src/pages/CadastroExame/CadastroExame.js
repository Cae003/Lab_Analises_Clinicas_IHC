import React, { useContext, useState } from 'react';
import "./CadastroExame.css";
import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';
import NavLateralR from '../../components/navLateral_Recep/navLateral_R';
import ConfirmaSenha from "../../components/ConfirmaSenha/PopupSenha";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ExamesContext } from '../../stores/ExameStore';

const CadastroExame = () => {

  const apiUrl = process.env.REACT_APP_API_URL;
  const { setExamesData } = useContext(ExamesContext);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Estados individuais para cada campo do formulário
  const [registroPaciente, setRegistroPaciente] = useState("");
  const [nomeSolicitante, setNomeSolicitante] = useState("");
  const [dataAtendimento, setDataAtendimento] = useState("");
  const [horarioAtendimento, setHorarioAtendimento] = useState("");
  const [cnesnomeunidade, setCnesnomeunidade] = useState("");
  const [exameSolicitado, setExameSolicitado] = useState("");
  const [materialBio, setMaterialBio] = useState("");
  const [horarioColetaMatBio, setHorarioColetaMatBio] = useState("");
  const [infoAdicionais, setInfoAdicionais] = useState("");
  const [nomePCadastro, setNomePCadastro] = useState("");
  const [dataEntregaLaudo, setDataEntregaLaudo] = useState("");
  const [indicacaoUrgencia, setIndicacaoUrgencia] = useState("");
  const [infoRelevantesPaciente, setInfoRelevantesPaciente] = useState("");

  // Função para capturar mudanças no input e atualizar o estado correspondente
  const handleChange = (setter) => (e) => {
    setter(e.target.value); // Usa e.target.value para pegar o valor atual do input
    e.target.setCustomValidity(""); // Limpa a mensagem de erro personalizada do campo
  };

  const submitButtom = (e) => {
    e.preventDefault();
    setShowModal(true); // Abre o popup de confirmação
  };

  const handleCloseModal = () => setShowModal(false);

  const handleConfirmLogout = async () => {
    try {
      // Envia uma requisição HTTP POST para o backend com todos os dados atualizados
      const response = await axios.post(`${apiUrl}/api/exame/cadastroExame`, {
        registroPaciente,
        nomeSolicitante,
        dataAtendimento,
        horarioAtendimento,
        cnesnomeunidade,
        exameSolicitado,
        materialBio,
        horarioColetaMatBio,
        infoAdicionais,
        nomePCadastro,
        dataEntregaLaudo,
        indicacaoUrgencia,
        infoRelevantesPaciente,
      });
      // console.log(response.data);
      if (response.data) { // Se a resposta for bem-sucedida
        // console.log(response.data);
        setExamesData(response.data); // Atualiza o contexto com os dados retornados
        setShowModal(false); // Fecha o modal
        alert("Cadastro Realizado com Sucesso!"); // Simulação de sucesso
        navigate("ConfirmaCadastroExame"); // Redireciona após confirmação
      } else {
        alert("Erro no cadastro dos dados no banco"); // Mostra um alerta de erro se a resposta for inválida
      }
    } catch (error) {
      alert(`Erro ao tentar fazer o processo de Cadastro. Erro:${error}`); // Alerta se houver erro na requisição
    }
  };

  return (
    <div>
      <div className="background"></div>
      <Header />
      <NavLateralR />
      <main className="main-contentCE">
        <h1>Informações do Exame</h1>
        <form onSubmit={submitButtom}>
          <fieldset id="DadosPessoais" className="blocoDadosCE">
            <div className="form-groupCE">
              <label htmlFor="rp">RP (Registro do Paciente)*</label>
              <input required id="rp" type="text" maxLength="9" placeholder="Digite o RP do paciente (Ex: 171024001)" onChange={handleChange(setRegistroPaciente)} />
            </div>
            <div className="form-groupCE">
              <label htmlFor="nomeS">Nome do Solicitante*</label>
              <input required id="nomeS" type="text" placeholder="Digite o nome completo do solicitante" onChange={handleChange(setNomeSolicitante)} />
            </div>
            <div className="form-groupCE">
              <label htmlFor="dataHora">Data de Atendimento*</label>
              <input required id="data" type="date" onChange={handleChange(setDataAtendimento)} />
            </div>
            <div className="form-groupCE">
              <label htmlFor="dataHora">Horário de Atendimento*</label>
              <input required id="hora" type="time" onChange={handleChange(setHorarioAtendimento)} />
            </div>
            <div className="form-groupCE">
              <label htmlFor="cnes">Número do CNES e Nome da Unidade de Saúde*</label>
              <input required id="cnes" type="text" placeholder="Digite o número do CNES e o nome do estabelecimento (Ex: 1234567 - Laborátorio Lab Science)" onChange={handleChange(setCnesnomeunidade)} />
            </div>
            <div className="form-groupCE">
              <label htmlFor="optionsExame">Escolha o Exame Solicitado*:</label>
              <select required id="optionsExame" name="optionsExame" defaultValue="" onChange={handleChange(setExameSolicitado)} >
                <option value="" disabled>Selecione uma opção...</option>
                <option value="Glicemia">Glicemia</option>
                {/* <option value="opcao2">Opção 2</option>
                <option value="opcao3">Opção 3</option> */}
              </select>
            </div>
            <div className="form-groupCE">
              <label htmlFor="materialBio">Matérial Biológico (caso aplicável)</label>
              <input id="materialBio" type="text" placeholder="Digite o tipo de material biológico" onChange={handleChange(setMaterialBio)} />
            </div>
            <div className="form-groupCE">
              <label htmlFor="coletaH">Horário da Coleta do Material Biológico (caso aplicável)</label>
              <input id="coletaH" type="time" step="1" onChange={handleChange(setHorarioColetaMatBio)} />
            </div>
            <div className="form-groupCE">
              <label htmlFor="inforAdicao">Informações Adicionais</label>
              <input id="inforAdicao" type="text" placeholder="Digite qualquer informação adicional" onChange={handleChange(setInfoAdicionais)} />
            </div>
            <div className="form-groupCE">
              <label htmlFor="nomeP">Profissional que Executou o Cadastro* </label>
              <input required id="nomeP" type="text" placeholder="Digite o nome de quem fez o cadastro" onChange={handleChange(setNomePCadastro)} />
            </div>
            {/* <div className="form-groupCE">
              <label htmlFor="coletaP">Profissional que Realizou a Coleta (caso aplicável) </label>
              <input id="coletaP" type="text" placeholder="Digite o nome de quem fez a coleta" />
            </div>
            <div className="form-groupCE">
              <label htmlFor="coletaV">Profissional que Validou a Coleta (caso aplicável) </label>
              <input id="coletaV" type="text" placeholder="Digite o nome de quem validou a coleta" />
            </div> */}
            <div className="form-groupCE">
              <label htmlFor="dataPrevisao">Previsão para Entrega do Laudo* </label>
              <input required id="dataPrevisao" type="date" onChange={handleChange(setDataEntregaLaudo)} />
            </div>
            <div className="form-groupCE">
              <label htmlFor="optionsUrgencia">Escolha a Indicação de Urgência (caso aplicável):</label>
              <select id="optionsUrgencia" name="optionsUrgencia" defaultValue="" onChange={handleChange(setIndicacaoUrgencia)} >
                <option value="" disabled>Selecione uma opção...</option>
                <option value="Mínima">Urgência Mínima</option>
                <option value="Baixa">Urgência Baixa</option>
                <option value="Média">Urgência Média</option>
                <option value="Alta">Urgência Alta</option>
                <option value="Máxima">Urgência Máxima</option>
              </select>
            </div>
            <div className="form-groupCE">
              <label htmlFor="coletaV">Informações Relevantes do Paciente ( uso de medicamentos, condição de saúde)</label>
              <input id="coletaV" type="text" placeholder="Digite informações adicionais do paciente" onChange={handleChange(setInfoRelevantesPaciente)} />
            </div>
          </fieldset>

          <div className="edit-buttonCE">
            <button type="submit">CONFIRMAR CADASTRO</button>
          </div>
        </form>
      </main>
      {showModal && (
        <ConfirmaSenha
          onConfirm={handleConfirmLogout}
          onCancel={handleCloseModal}
        />
      )}
      <Footer />
    </div>
  )
}

export default CadastroExame
