import React, { useContext, useState } from 'react';
import "./CadastroUserT.css";
import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';
import NavLateralR from '../../components/navLateral_Recep/navLateral_R';
import ConfirmaSenha from "../../components/ConfirmaSenha/PopupSenha";
import axios from "axios"; // Importa o axios para fazer requisições HTTP
import { useNavigate } from 'react-router-dom';
import { UsuariosContext } from '../../stores/UsuariosStore';

const CadastroUserT = () => {

  const apiUrl = process.env.REACT_APP_API_URL;
  const { setUsuariosData } = useContext(UsuariosContext);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Estados individuais para cada campo do formulário
  const [nome, setNome] = useState("");
  const [datanasc, setDataNasc] = useState("");
  const [cpf, setCpf] = useState("");
  const [sexo, setSexo] = useState("");
  const [accessLevel, setAccessLevel] = useState("Tecnico");
  const [endereco, setEndereco] = useState("");
  const [cidade, setCidade] = useState("");
  const [bairro, setBairro] = useState("");
  const [cep, setCep] = useState("");
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
      const response = await axios.post(`${apiUrl}/api/user/cadastroUser`, {
        nome,
        datanasc,
        cpf,
        sexo,
        accessLevel,
        endereco,
        cidade,
        bairro,
        cep,
        email,
        telefone1,
        telefone2,
      });
      // console.log(response.data);
      if (response.data) { // Se a resposta for bem-sucedida
        // console.log(response.data);
        setUsuariosData(response.data); // Atualiza o contexto com os dados retornados
        setShowModal(false); // Fecha o modal
        alert("Cadastro Realizado com Sucesso!"); // Simulação de sucesso
        navigate("ConfirmaCadastoTecnico"); // Redireciona após confirmação
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
      <main className="main-contentCUT">
        <h1>Informações do Técnico</h1>
        <form onSubmit={submitButtom}>
          <fieldset id="DadosPessoais" className="blocoDadosCUT">
            <div className="form-groupCUT">
              <label htmlFor="nome">Nome Completo*</label>
              <input required id="nome" type="text" placeholder="Digite o nome completo do Técnico" onChange={handleChange(setNome)} />
            </div>
            <div className="form-groupCUT">
              <label htmlFor="nascimento">Data de Nascimento*</label>
              <input required id="nascimento" type="date" maxLength="10" placeholder="Digite a data de nascimento [DD/MM/AAAA]" onChange={handleChange(setDataNasc)} />
            </div>
            <div className="form-groupCUT">
              <label htmlFor="cpf">CPF*</label>
              <input required id="cpf" type="text" maxLength="14" placeholder="Digite o CPF [123.456.789-10]" onChange={handleChange(setCpf)} />
            </div>
            <div className="form-groupCUT">
              <label>Sexo Biológico: </label>
              <div className="radio-groupCUT">
                <label htmlFor="sexo-m">M</label>
                <input required className="sexoOpcaoCUT" id="sexo-m" name="sexo" type="radio" defaultValue="M" onChange={() => setSexo("M")} />
                <label htmlFor="sexo-f">F</label>
                <input required className="sexoOpcaoCUT" id="sexo-f" name="sexo" type="radio" defaultValue="F" onChange={() => setSexo("F")} />
              </div>
            </div>
            <div className="form-groupCUT">
              <label>Nível de Login:</label>
              <div className="radio-groupCUT">
                <input disabled className="nivel" id="gestor" name="nivel" type="radio" defaultValue="Gestor" onChange={() => setAccessLevel("Gestor")} />
                <label htmlFor="gestor">Gestor</label>
                <input disabled className="nivel" id="recep" name="nivel" type="radio" defaultValue="Recepcionista" onChange={() => setAccessLevel("Recepcionista")} />
                <label htmlFor="recep">Recepcionista</label>
                <input disabled className="nivel" id="analista" name="nivel" type="radio" defaultValue="Analista" onChange={() => setAccessLevel("Analista")} />
                <label htmlFor="analista">Analista</label>
                <input disabled defaultChecked className="nivel" id="tecnico" name="nivel" type="radio" defaultValue="Técnico" onChange={() => setAccessLevel("Tecnico")} />
                <label htmlFor="tecnico">Técnico</label>
              </div>
            </div>
          </fieldset>

          <fieldset id="DadosEndereco" className="blocoDadosCUT">
            <div className="form-groupCUT">
              <label htmlFor="endereco">Endereço*</label>
              <input required id="endereco" type="text" placeholder="Digite o endereço" onChange={handleChange(setEndereco)} />
            </div>
            <div className="form-groupCUT">
              <label htmlFor="cidade">Cidade*</label>
              <input required id="cidade" type="text" placeholder="Digite a cidade" onChange={handleChange(setCidade)} />
            </div>
            <div className="form-groupCUT">
              <label htmlFor="bairro">Bairro*</label>
              <input required id="bairro" type="text" placeholder="Digite o bairro" onChange={handleChange(setBairro)} />
            </div>
            <div className="form-groupCUT">
              <label htmlFor="cep">CEP*</label>
              <input required id="cep" type="text" maxLength="9" placeholder="DIgite o CEP [12345-678]" onChange={handleChange(setCep)} />
            </div>
          </fieldset>

          <fieldset id="Contatos" className="blocoDadosCUT">
            <div className="form-groupCUT">
              <label htmlFor="email">Email*</label>
              <input required id="email" type="email" placeholder="Digite email válido" onChange={handleChange(setEmail)} />
            </div>
            <div className="form-groupCUT">
              <label htmlFor="telefone1">Telefone 1*</label>
              <input required id="telefone1" type="tel" placeholder="Digite um telefone [(61) 91234-5678]" onChange={handleChange(setTelefone1)} />
            </div>
            <div className="form-groupCUT">
              <label htmlFor="telefone2">Telefone 2</label>
              <input id="telefone2" type="tel" placeholder="Digite outro telefone caso tenha [(61) 91234-5678]" onChange={handleChange(setTelefone2)} />
            </div>
          </fieldset>

          <div className="edit-buttonCUT">
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

export default CadastroUserT