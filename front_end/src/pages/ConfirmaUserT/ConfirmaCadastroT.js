import React, { useContext } from 'react';
import "./ConfirmaCadastroT.css";
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/header';
import NavLateralR from '../../components/navLateral_Recep/navLateral_R';
import Footer from '../../components/Footer/footer';
import { UsuariosContext } from '../../stores/UsuariosStore';

const ConfirmaCadastroT = () => {

  const {usuariosData} = useContext(UsuariosContext);
  // console.log(usuariosData[0].nome);
  const navigate = useNavigate();

  function finalizaCadastro() {
    navigate("/Recepcionista");
  }

  return (
    <>
      <Header />
      <NavLateralR />
      <main className="main-contentCCT">
        <h1>Informações do Técnico Cadastrado</h1>
        <form>
          <fieldset id="DadosPessoais" className="blocoDadosCCT">
            <div className="form-groupCCT">
              <label htmlFor="nome">Seu Nome Completo: </label>
              <input disabled id="nome" type="text" value={usuariosData[0].nome || "Não Existe"} />
            </div>
            <div className="form-groupCCT">
              <label htmlFor="nascimento">Data de Nascimento: </label>
              <input disabled id="nascimento" type="date" value={usuariosData[0].datanasc || "Não Existe"} />
            </div>
            <div className="form-groupCCT">
              <label htmlFor="cpf">CPF: </label>
              <input disabled id="cpf" type="text" value={usuariosData[0].cpf || "Não Existe"} />
            </div>
            <div className="form-groupCCT">
              <label htmlFor="matricula">RU (Registro do Usuário): </label>
              <input disabled id="matricula" maxLength="6" type="text" value={usuariosData[0].userRegister || "Não Existe"} />
            </div>
            <div className="form-groupCCT">
              <label htmlFor="senha">Senha: </label>
              <input disabled id="senha" type="text" value={usuariosData[0].password || "Não Existe"} />
            </div>
            <div className="form-groupCCT">
              <label>Sexo Biológico: </label>
              <div className="radio-groupCCT">
                <label htmlFor="sexo-m">M</label>
                <input className="sexoOpcaoCCT" checked={usuariosData[0].sexo === "M"} disabled id="sexo-m" name="sexo" type="radio" value="M" />
                <label htmlFor="sexo-f">F</label>
                <input className="sexoOpcaoCCT" checked={usuariosData[0].sexo === "F"} disabled id="sexo-f" name="sexo" type="radio" value="F" />
              </div>
            </div>
          </fieldset>

          <fieldset id="DadosEndereco" className="blocoDadosCCT">
            <div className="form-groupCCT">
              <label htmlFor="endereco">Endereço: </label>
              <input disabled id="endereco" type="text" value={usuariosData[0].endereco || "Não Existe"} />
            </div>
            <div className="form-groupCCT">
              <label htmlFor="cep">CEP: </label>
              <input disabled id="cep" type="text" value={usuariosData[0].cep || "Não Existe"} />
            </div>
            <div className="form-groupCCT">
              <label htmlFor="cidade">Cidade: </label>
              <input disabled id="cidade" type="text" value={usuariosData[0].cidade || "Não Existe"} />
            </div>
            <div className="form-groupCCT">
              <label htmlFor="bairro">Bairro: </label>
              <input disabled id="bairro" type="text" value={usuariosData[0].bairro || "Não Existe"} />
            </div>
          </fieldset>

          <fieldset id="Contatos" className="blocoDadosCCT">
            <div className="form-groupCCT">
              <label htmlFor="email">Email: </label>
              <input disabled id="email" type="email" value={usuariosData[0].email || "Não Existe"} />
            </div>
            <div className="form-groupCCT">
              <label htmlFor="telefone1">Telefone 1: </label>
              <input disabled id="telefone1" type="tel" value={usuariosData[0].telefone1 || "Não Existe"} />
            </div>
            <div className="form-groupCCT">
              <label htmlFor="telefone2">Telefone 2: </label>
              <input disabled id="telefone2" type="tel" value={usuariosData[0].telefone2 || "Não Existe"} />
            </div>
          </fieldset>

          <div className="edit-buttonCCT">
            <button type="button" onClick={finalizaCadastro}>VOLTAR PARA HOME</button>
          </div>
        </form>
      </main>
      <Footer />
    </>
  )
}

export default ConfirmaCadastroT
