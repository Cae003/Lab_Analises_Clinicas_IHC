import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./ColetaDH.css";
import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';
import NavLateralTecnico from '../../components/navLateral_Tecnico/navLateral_Tecnico';
import ConfirmaSenha from "../../components/ConfirmaSenha/PopupSenha";

const ColetaDH = () => {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const submitButtom = (e) => {
        e.preventDefault();
        setShowModal(true); // Abre o popup de confirmação
    };

    const handleCloseModal = () => setShowModal(false);

    const handleConfirmLogout = () => {
        setShowModal(false);
        alert("Data e Hora Salvas com Sucesso!"); // Simulação de sucesso
        navigate("/Tecnico"); // Redireciona após confirmação
    };

    return (
        <div>
            <Header />
            <NavLateralTecnico />
            <main className="main-contentCDH">
                <h1>Marcação da Data e Hora da Coleta</h1>
                <form onSubmit={submitButtom}>
                    <fieldset id="DadosPessoais" className="blocoDadosCDH">
                        <div className="form-groupCDH">
                            <label htmlFor="matricula">RU (Registro do Usuário): </label>
                            <input disabled id="matricula" maxLength="6" type="text" value="030001" />
                        </div>
                        <div className="form-groupCDH">
                            <label htmlFor="nome">Profissional que Realizou a Coleta: </label>
                            <input disabled id="nome" type="text" value="Lia Aranel de Souza Martins" />
                        </div>
                        <div className="form-groupCDH">
                            <label htmlFor="cpf">CPF: </label>
                            <input disabled id="cpf" type="text" value="065.295.541-95" />
                        </div>
                    </fieldset>

                    <fieldset id="DadosEndereco" className="blocoDadosCDH">
                        <div className="form-groupCDH">
                            <label htmlFor="nome">RP (Registro do Paciente):</label>
                            <input disabled id="nome" type="text" maxLength="9" defaultValue="180523001" />
                        </div>
                        <div className="form-groupCDH">
                            <label htmlFor="nome">Nome Completo do Paciente:</label>
                            <input disabled id="nome" type="text" defaultValue="Wanderley de Almeida Souza" />
                        </div>
                        <div className="form-groupCDH">
                            <label htmlFor="cpf">CPF do Paciente:</label>
                            <input disabled id="cpf" type="text" maxLength="14" defaultValue="654.321.987-00" />
                        </div>
                        <div className="form-groupCDH">
                            <label htmlFor="nomeS">Nome do Solicitante:</label>
                            <input disabled id="nomeS" type="text" defaultValue="Wanderley de Almeida Souza" />
                        </div>
                    </fieldset>

                    <fieldset id="Contatos" className="blocoDadosCDH">
                        <div className="form-groupCDH">
                            <label htmlFor="dataColeta">Registro da Data da Coleta: </label>
                            <input id="dataColeta" type="date" />
                        </div>
                        <div className="form-groupCDH">
                            <label htmlFor="horaColeta">Registro Horário da Coleta:</label>
                            <input id="horaColeta" type="time" step="1" />
                        </div>
                        <div className="form-groupCDH">
                            <label>Validar Coleta de Material Biológico</label>
                            <div className="radio-groupCDH">
                                <input className="opcaoValidaCDH" id="validaCDH" name="opValida" type="radio" value="Viavel" />
                                <label htmlFor="sexo-m">Amostra  Viavel</label>
                                <input className="opcaoValidaCDH" id="recoletaCDH" name="opValida" type="radio" value="Recoleta" />
                                <label htmlFor="sexo-f">Solicitar Recoleta</label>
                                <input className="opcaoValidaCDH" id="semMaterialCDH" name="opValida" type="radio" value="" />
                                <label htmlFor="sexo-f">Não foi Feita Coleta de Material de Fora</label>
                            </div>
                        </div>
                    </fieldset>

                    <div className="edit-buttonCDH">
                        <button type="submit">SALVAR INFORMAÇÕES</button>
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

export default ColetaDH
