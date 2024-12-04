import React, { useContext, useEffect, useState } from 'react';
import "./Perfil.css";
import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';
import NavLateralR from '../../components/navLateral_Recep/navLateral_R';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../stores/UserStore';

const Perfil = () => {
  const [isLoading, setIsLoading] = useState(true);
  const {userData, fetchUserData} = useContext(UserContext);
  // console.log(userData);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData.userRegister) {
      fetchUserData(userData.userRegister);
      setIsLoading(false);
    }
  }, [userData.userRegister, fetchUserData]);

  function submitButtom(e) {
    e.preventDefault(); // Previne o recarregamento da página
    navigate("EditPerfil");
  }

  return (
    <>
      <Header />
      <NavLateralR />
      <main className="main-contentP">
        <h1>Informações do Usuário</h1>
        <form onSubmit={submitButtom}>
          <fieldset id="DadosPessoais" className="blocoDados">
            <div className="form-group">
              <label htmlFor="nome">Seu Nome Completo: </label>
              <input disabled id="nome" type="text" value={isLoading ? "Carregando..." : userData.nome || "Não Existe"} />
            </div>
            <div className="form-group">
              <label htmlFor="nascimento">Data de Nascimento: </label>
              <input disabled id="nascimento" type="text" value={isLoading ? "Carregando..." : userData.datanasc || "Não Existe"} />
            </div>
            <div className="form-group">
              <label htmlFor="cpf">CPF: </label>
              <input disabled id="cpf" type="text" value={isLoading ? "Carregando..." : userData.cpf || "Não Existe"} />
            </div>
            <div className="form-group">
              <label htmlFor="matricula">RU (Registro do Usuário): </label>
              <input disabled id="matricula" maxLength="6" type="text" value={isLoading ? "Carregando..." : userData.userRegister || "Não Existe"} />
            </div>
            <div className="form-group">
              <label htmlFor="senha">Senha: </label>
              <input disabled id="senha" type="text" value={isLoading ? "Carregando..." : userData.password || "Não Existe"} />
            </div>
            <div className="form-group">
              <label>Sexo Biológico: </label>
              <div className="radio-group">
                <label htmlFor="sexo-m">M</label>
                <input className="sexoOpcao" checked={userData.sexo === "M"} disabled id="sexo-m" name="sexo" type="radio" value="M" />
                <label htmlFor="sexo-f">F</label>
                <input className="sexoOpcao" checked={userData.sexo === "F"} disabled id="sexo-f" name="sexo" type="radio" value="F" />
              </div>
            </div>
          </fieldset>

          <fieldset id="DadosEndereco" className="blocoDados">
            <div className="form-group">
              <label htmlFor="endereco">Endereço: </label>
              <input disabled id="endereco" type="text" value={isLoading ? "Carregando..." : userData.endereco || "Não Existe"} />
            </div>
            <div className="form-group">
              <label htmlFor="cep">CEP: </label>
              <input disabled id="cep" type="text" value={isLoading ? "Carregando..." : userData.cep || "Não Existe"} />
            </div>
            <div className="form-group">
              <label htmlFor="cidade">Cidade: </label>
              <input disabled id="cidade" type="text" value={isLoading ? "Carregando..." : userData.cidade || "Não Existe"} />
            </div>
            <div className="form-group">
              <label htmlFor="bairro">Bairro: </label>
              <input disabled id="bairro" type="text" value={isLoading ? "Carregando..." : userData.bairro || "Não Existe"} />
            </div>
          </fieldset>

          <fieldset id="Contatos" className="blocoDados">
            <div className="form-group">
              <label htmlFor="email">Email: </label>
              <input disabled id="email" type="email" value={isLoading ? "Carregando..." : userData.email || "Não Existe"} />
            </div>
            <div className="form-group">
              <label htmlFor="telefone1">Telefone 1: </label>
              <input disabled id="telefone1" type="tel" value={isLoading ? "Carregando..." : userData.telefone1 || "Não Existe"} />
            </div>
            <div className="form-group">
              <label htmlFor="telefone2">Telefone 2: </label>
              <input disabled id="telefone2" type="tel" value={isLoading ? "Carregando..." : userData.telefone2 || "Não Existe"} />
            </div>
          </fieldset>

          <div className="edit-button">
            <button type="submit">EDITAR INFORMAÇÕES</button>
          </div>
        </form>
      </main>
      <Footer />
    </>
  )
}

export default Perfil