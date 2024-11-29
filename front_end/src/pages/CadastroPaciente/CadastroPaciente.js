import React, { useState } from 'react'
import "./CadastroPaciente.css";
import Header from '../../components/Header/header';
import NavLateralR from '../../components/navLateral_Recep/navLateral_R';
import Footer from '../../components/Footer/footer';
import ConfirmaSenha from "../../components/ConfirmaSenha/PopupSenha";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CadastroPaciente = () => {

  const apiUrl = process.env.REACT_APP_API_URL;
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Estados individuais para cada campo do formulário
  const [nome, setNome] = useState("");
  const [nomeSocial, setNomeSocial] = useState("");
  const [datanasc, setDataNasc] = useState("");
  const [cpf, setCPF] = useState("");
  const [nomeMae, setNomeMae] = useState("");
  const [nomeResponsavel, setNomeResponsavel] = useState("");
  const [sexo, setSexo] = useState("");
  const [endereco, setEndereco] = useState("");
  const [cidade, setCidade] = useState("");
  const [bairro, setBairro] = useState("");
  const [cep, setCEP] = useState("");
  const [email, setEmail] = useState("");
  const [telefone1, setTelefone1] = useState("");
  const [telefone2, setTelefone2] = useState("");

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
      const response = await axios.post(`${apiUrl}/api/paciente/cadastroPaciente`, {
        nome,
        nomeSocial,
        datanasc,
        cpf,
        nomeMae,
        nomeResponsavel,
        sexo,
        endereco,
        cidade,
        bairro,
        cep,
        email,
        telefone1,
        telefone2,
      });
      //console.log(response);
      if (response) { // Se a resposta for bem-sucedida
        //console.log(response);
        //setExamesData(response.data); // Atualiza o contexto com os dados retornados
        setShowModal(false); // Fecha o modal
        alert("Cadastro Realizado com Sucesso!"); // Simulação de sucesso
        navigate("/Recepcionista/TodosPacientes"); // Redireciona após confirmação
      } else {
        alert("Erro no cadastro dos dados no banco"); // Mostra um alerta de erro se a resposta for inválida
      }
    } catch (error) {
      alert(`Erro ao tentar fazer o processo de Cadastro. Erro:${error}`); // Alerta se houver erro na requisição
    }
  };

  return (
    <>
      <Header />
      <NavLateralR />
      <main className="main-contentCP">
        <h1>Informações do Paciente</h1>
        <form onSubmit={submitButtom}>
          <fieldset id="DadosPessoais" className="blocoDadosCP">
            {/* <div className="form-groupCP">
              <label htmlFor="rp">RP (Registro do Paciente)*</label>
              <input disabled id="rp" type="text" maxLength="9" defaultValue="171024001" />
            </div> */}
            <div className="form-groupCP">
              <label htmlFor="nome">Nome Completo*</label>
              <input required id="nome" type="text" placeholder="Digite o nome completo" onChange={handleChange(setNome)} />
            </div>
            <div className="form-groupCP">
              <label htmlFor="nomeSocial">Nome Social</label>
              <input id="nomeSocial" type="text" placeholder="Digite o nome social caso tenha" onChange={handleChange(setNomeSocial)} />
            </div>
            <div className="form-groupCP">
              <label htmlFor="nascimento">Data de Nascimento*</label>
              <input required id="nascimento" type="date" maxLength="10" onChange={handleChange(setDataNasc)} />
            </div>
            <div className="form-groupCP">
              <label htmlFor="cpf">CPF*</label>
              <input required id="cpf" type="text" maxLength="14" placeholder="Digite o CPF [123.456.789-10]" onChange={handleChange(setCPF)} />
            </div>
            <div className="form-groupCP">
              <label htmlFor="nomeMae">Nome da Mãe*</label>
              <input required id="nomeMae" type="text" placeholder="Digite o nome da mãe do paciente" onChange={handleChange(setNomeMae)} />
            </div>
            <div className="form-groupCP">
              <label htmlFor="nomeResp">Nome do Responsável</label>
              <input id="nomeResp" type="text" placeholder="Digite o nome do responsável caso seja de menor" onChange={handleChange(setNomeResponsavel)} />
            </div>
            <div className="form-groupCP">
              <label>Sexo Biológico: </label>
              <div className="radio-groupCP">
                <label htmlFor="sexo-m">M</label>
                <input required className="sexoOpcaoCP" id="sexo-m" name="sexo" type="radio" defaultValue="M" onChange={() => setSexo("M")} />
                <label htmlFor="sexo-f">F</label>
                <input required className="sexoOpcaoCP" id="sexo-f" name="sexo" type="radio" defaultValue="F" onChange={() => setSexo("F")} />
              </div>
            </div>
          </fieldset>

          <fieldset id="DadosEndereco" className="blocoDadosCP">
            <div className="form-groupCP">
              <label htmlFor="endereco">Endereço*</label>
              <input required id="endereco" type="text" placeholder="Digite o endereço" onChange={handleChange(setEndereco)} />
            </div>
            <div className="form-groupCP">
              <label htmlFor="cidade">Cidade*</label>
              <input required id="cidade" type="text" placeholder="Digite a cidade" onChange={handleChange(setCidade)} />
            </div>
            <div className="form-groupCP">
              <label htmlFor="bairro">Bairro*</label>
              <input required id="bairro" type="text" placeholder="Digite o bairro" onChange={handleChange(setBairro)} />
            </div>
            <div className="form-groupCP">
              <label htmlFor="cep">CEP*</label>
              <input required id="cep" type="text" maxLength="9" placeholder="DIgite o CEP [12345-678]" onChange={handleChange(setCEP)} />
            </div>
          </fieldset>

          <fieldset id="Contatos" className="blocoDadosCP">
            <div className="form-groupCP">
              <label htmlFor="email">Email*</label>
              <input required id="email" type="email" placeholder="Digite email válido" onChange={handleChange(setEmail)} />
            </div>
            <div className="form-groupCP">
              <label htmlFor="telefone1">Telefone 1*</label>
              <input required id="telefone1" type="tel" placeholder="Digite um telefone [(61) 91234-5678]" onChange={handleChange(setTelefone1)} />
            </div>
            <div className="form-groupCP">
              <label htmlFor="telefone2">Telefone 2</label>
              <input id="telefone2" type="tel" placeholder="Digite o telefone do responsável caso tenha [(61) 91234-5678]" onChange={handleChange(setTelefone2)} />
            </div>
          </fieldset>

          <div className="edit-buttonCP">
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
    </>
  )
}

export default CadastroPaciente
