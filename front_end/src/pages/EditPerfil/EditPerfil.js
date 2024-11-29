import React, { useContext, useState } from 'react';
import "./EditPerfil.css"; // Importa o CSS específico para estilizar o componente EditPerfil
import Header from '../../components/Header/header'; // Importa o cabeçalho do componente
import Footer from '../../components/Footer/footer'; // Importa o rodapé do componente
import NavLateralR from '../../components/navLateral_Recep/navLateral_R'; // Importa a navegação lateral para o perfil do recepcionista
import { useNavigate } from 'react-router-dom'; // Importa para redirecionamento de rotas
import axios from "axios"; // Importa o axios para fazer requisições HTTP
import ConfirmaSenha from "../../components/ConfirmaSenha/PopupSenha"; // Importa o popup para confirmação de senha
import { UserContext } from '../../stores/UserStore'; // Importa o contexto global do usuário

const EditPerfil = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const { userData } = useContext(UserContext); // Pega o contexto do usuário, com dados e função para atualizar
  const [showModal, setShowModal] = useState(false); // Estado para controlar a visibilidade do modal de confirmação de senha
  const navigate = useNavigate(); // Hook de navegação para redirecionamento de página

  // Estados individuais para cada campo do formulário, usando valores iniciais de userData
  const [nome, setNome] = useState(userData.nome || "");
  const [datanasc, setDataNasc] = useState(userData.datanasc || "");
  const [password, setPassword] = useState(userData.password || "");
  const [sexo, setSexo] = useState(userData.sexo || "");
  const [endereco, setEndereco] = useState(userData.endereco || "");
  const [cep, setCep] = useState(userData.cep || "");
  const [cidade, setCidade] = useState(userData.cidade || "");
  const [bairro, setBairro] = useState(userData.bairro || "");
  const [email, setEmail] = useState(userData.email || "");
  const [telefone1, setTel1] = useState(userData.telefone1 || "");
  const [telefone2, setTel2] = useState(userData.telefone2 || "");

  // Função para capturar mudanças no input e atualizar o estado correspondente
  const handleChange = (setter) => (e) => {
    setter(e.target.value); // Usa e.target.value para pegar o valor atual do input
    e.target.setCustomValidity(""); // Limpa a mensagem de erro personalizada do campo
};

  // Função de submissão do formulário, apenas abre o modal de confirmação
  const submitButtom = (e) => {
    e.preventDefault(); // Previne o recarregamento da página
    setShowModal(true); // Abre o popup de confirmação de senha
  };

  // Função para fechar o modal de confirmação
  const handleCloseModal = () => setShowModal(false);

  // Função de confirmação de alterações (enviada ao backend)
  const handleConfirmLogout = async () => {
    try {
      // Envia uma requisição HTTP PUT para o backend com todos os dados atualizados
      const response = await axios.put(`${apiUrl}/api/profile/update/${userData.userRegister}`, {
        nome,
        datanasc,
        password,
        sexo,
        endereco,
        cep,
        cidade,
        bairro,
        email,
        telefone1,
        telefone2,
      });

      if (response.data) { // Se a resposta for bem-sucedida
        // setUserData(response.data); // Atualiza o contexto com os dados retornados
        setShowModal(false); // Fecha o modal
        alert("Alterações confirmadas!"); // Mostra um alerta de sucesso
        navigate("/Recepcionista/Perfil"); // Redireciona para a página de perfil
      } else {
        alert("Credenciais Inválidas!"); // Mostra um alerta de erro se a resposta for inválida
      }
    } catch (error) {
      alert("Erro ao tentar fazer login. Tente novamente."); // Alerta se houver erro na requisição
    }
  };

  return (
    <>
      <Header /> {/* Renderiza o componente de cabeçalho */}
      <NavLateralR /> {/* Renderiza o componente de navegação lateral */}
      <main className="main-contentEP">
        <h1>Informações do Usuário</h1>
        <form onSubmit={submitButtom}>
          {/* Formulário dividido em seções (fieldset) */}
          <fieldset id="DadosPessoais" className="blocoDadosEP">
            <div className="form-groupEP">
              <label htmlFor="nome">Seu Nome Completo*: </label>
              <input required id="nome" type="text" defaultValue={userData.nome || "Não Existe"} onChange={handleChange(setNome)} />
            </div>
            <div className="form-groupEP">
              <label htmlFor="nascimento">Data de Nascimento*: </label>
              <input required id="nascimento" type="text" maxLength="10" defaultValue={userData.datanasc || "Não Existe"} onChange={handleChange(setDataNasc)} />
            </div>
            <div className="form-groupEP">
              <label htmlFor="cpf">CPF*: </label>
              <input required disabled id="cpf" type="text" defaultValue={userData.cpf || "Não Existe"} />
            </div>
            <div className="form-groupEP">
              <label htmlFor="matricula">RU (Registro do Usuário): </label>
              <input disabled id="matricula" maxLength="6" type="text" defaultValue={userData.userRegister || "Não Existe"} />
            </div>
            <div className="form-groupEP">
              <label htmlFor="password">Senha*: </label>
              <input required id="password" type="text" defaultValue={userData.password || "Não Existe"} onChange={handleChange(setPassword)} />
            </div>
            <div className="form-groupEP">
              <label>Sexo Biológico: </label>
              <div className="radio-groupEP">
                <label htmlFor="sexo-m">M</label>
                <input required className="sexoOpcaoEP" defaultChecked={sexo === "M"} id="sexo-m" name="sexo" type="radio" value="M" onChange={() => setSexo("M")} />
                <label htmlFor="sexo-f">F</label>
                <input required className="sexoOpcaoEP" defaultChecked={sexo === "F"} id="sexo-f" name="sexo" type="radio" value="F" onChange={() => setSexo("F")} />
              </div>
            </div>
          </fieldset>

          {/* Campos de endereço */}
          <fieldset id="DadosEndereco" className="blocoDadosEP">
            <div className="form-groupEP">
              <label htmlFor="endereco">Endereço*: </label>
              <input required id="endereco" type="text" defaultValue={userData.endereco || "Não Existe"} onChange={handleChange(setEndereco)} />
            </div>
            <div className="form-groupEP">
              <label htmlFor="cep">CEP*: </label>
              <input required id="cep" type="text" maxLength="9" defaultValue={userData.cep || "Não Existe"} onChange={handleChange(setCep)} />
            </div>
            <div className="form-groupEP">
              <label htmlFor="cidade">Cidade*: </label>
              <input required id="cidade" type="text" defaultValue={userData.cidade || "Não Existe"} onChange={handleChange(setCidade)} />
            </div>
            <div className="form-groupEP">
              <label htmlFor="bairro">Bairro*: </label>
              <input required id="bairro" type="text" defaultValue={userData.bairro || "Não Existe"} onChange={handleChange(setBairro)} />
            </div>
          </fieldset>

          {/* Campos de contato */}
          <fieldset id="Contatos" className="blocoDadosEP">
            <div className="form-groupEP">
              <label htmlFor="email">Email*: </label>
              <input required id="email" type="email" defaultValue={userData.email || "Não Existe"} onChange={handleChange(setEmail)} />
            </div>
            <div className="form-groupEP">
              <label htmlFor="telefone1">Telefone 1*: </label>
              <input required id="telefone1" type="tel" defaultValue={userData.telefone1 || "Não Existe"} onChange={handleChange(setTel1)} />
            </div>
            <div className="form-groupEP">
              <label htmlFor="telefone2">Telefone 2: </label>
              <input  id="telefone2" type="tel" defaultValue={userData.telefone2 || "Não Existe"} onChange={handleChange(setTel2)} />
            </div>
          </fieldset>

          {/* Botão de submissão */}
          <div className="edit-buttonEP">
            <button type="submit">SALVAR ALTERAÇÕES</button>
          </div>
        </form>
      </main>
      {showModal && (
        <ConfirmaSenha
          onConfirm={handleConfirmLogout} // Passa a função de confirmação para o modal
          onCancel={handleCloseModal} // Passa a função de cancelamento para o modal
        />
      )}
      <Footer />
    </>
  );
}

export default EditPerfil;