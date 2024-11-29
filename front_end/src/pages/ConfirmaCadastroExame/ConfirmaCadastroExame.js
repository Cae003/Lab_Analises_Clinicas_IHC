import React, { useContext } from 'react';
import "./ConfirmaCadastroExame.css";
import Header from '../../components/Header/header';
import NavLateralR from '../../components/navLateral_Recep/navLateral_R';
import Footer from '../../components/Footer/footer';
import { useNavigate } from 'react-router-dom';
import { ExamesContext } from '../../stores/ExameStore';

const ConfirmaCadastroExame = () => {

    const { examesData } = useContext(ExamesContext);
    //console.log(examesData);
    const navigate = useNavigate();

    function finalizaCadastro() {
        navigate("/Recepcionista");
    }
    return (
        <div>
            <div className="background"></div>
            <Header />
            <NavLateralR />
            <main className="main-contentCCE">
                <h1>Informações do Exame Cadastrado</h1>
                <form>
                    <fieldset id="DadosPessoais" className="blocoDadosCCE">
                        <div className="form-groupCCE">
                            <label htmlFor="rp">RP (Registro do Paciente)</label>
                            <input disabled id="rp" type="text" maxLength="9" value={examesData[0].registropaciente || "Não Existe"} />
                        </div>
                        <div className="form-groupCCE">
                            <label htmlFor="nomeS">Nome do Solicitante</label>
                            <input disabled id="nomeS" type="text" value={examesData[0].nomeSolicitante || "Não Existe"} />
                        </div>
                        <div className="form-groupCCE">
                            <label htmlFor="dataHora">Data de Atendimento</label>
                            <input disabled id="data" type="date" value={examesData[0].dataAtendimento || "Não Existe"} />
                        </div>
                        <div className="form-groupCCE">
                            <label htmlFor="dataHora">Horário de Atendimento</label>
                            <input disabled id="hora" type="time" value={examesData[0].horarioAtendimento || "Não Existe"} />
                        </div>
                        <div className="form-groupCCE">
                            <label htmlFor="cnes">Número do CNES</label>
                            <input disabled id="cnes" type="text" value={examesData[0].cnesnomeunidade || "Não Existe"} />
                        </div>
                        <div className="form-groupCCE">
                            <label htmlFor="options">Escolha o Exame Solicitado:</label>
                            <select disabled id="options" name="options" value={examesData[0].exameSolicitado || "Não Existe"} >
                                <option value="" disabled>Selecione uma opção...</option>
                                <option value="Glicemia">Glicemia</option>
                                {/* <option value="opcao2">Opção 2</option>
                                    <option value="opcao3">Opção 3</option> */}
                            </select>
                        </div>
                        <div className="form-groupCCE">
                            <label htmlFor="materialBio">Matérial Biológico (caso aplicável)</label>
                            <input disabled id="materialBio" type="text" value={examesData[0].materialBio || "Não Existe"} />
                        </div>
                        <div className="form-groupCCE">
                            <label htmlFor="coletaH">Horário da Coleta do Material Biológico (caso aplicável)</label>
                            <input disabled id="coletaH" type="time" step="1" value={examesData[0].horarioColeta || "Não Existe"} />
                        </div>
                        <div className="form-groupCCE">
                            <label htmlFor="inforAdicao">Informações Adicionais</label>
                            <input disabled id="inforAdicao" type="text" value={examesData[0].infoAdicionais || "Não Existe"} />
                        </div>
                        <div className="form-groupCCE">
                            <label htmlFor="nomeP">Profissional que Executou o Cadastro</label>
                            <input disabled id="nomeP" type="text" value={examesData[0].profExecutaCad || "Não Existe"} />
                        </div>
                        {/* <div className="form-groupCCE">
                            <label htmlFor="coletaP">Profissional que Realizou a Coleta (caso aplicável)</label>
                            <input disabled id="coletaP" type="text" value={examesData[0].nomePColeta || "Não Existe"} />
                        </div>
                        <div className="form-groupCCE">
                            <label htmlFor="coletaV">Profissional que Validou a Coleta (caso aplicável)</label>
                            <input disabled id="coletaV" type="text" value={examesData[0].nomePValidaColeta || "Não Existe"} />
                        </div> */}
                        <div className="form-groupCCE">
                            <label htmlFor="dataPrevisao">Previsão para Entrega do Laudo</label>
                            <input disabled id="dataPrevisao" type="date" value={examesData[0].previsaoEntrega || "Não Existe"} />
                        </div>
                        <div className="form-groupCE">
                            <label htmlFor="optionsUrgencia">Escolha a Indicação de Urgência (caso aplicável):</label>
                            <select disabled id="optionsUrgencia" name="optionsUrgencia" value={examesData[0].urgencia || "Não Existe"} >
                                <option value="" disabled>Selecione uma opção...</option>
                                <option value="Mínima">Urgência Mínima</option>
                                <option value="Baixa">Urgência Baixa</option>
                                <option value="Média">Urgência Média</option>
                                <option value="Alta">Urgência Alta</option>
                                <option value="Máxima">Urgência Máxima</option>
                            </select>
                        </div>
                        <div className="form-groupCCE">
                            <label htmlFor="coletaV">Informações Relevantes do Paciente ( uso de medicamentos, condição de saúde)</label>
                            <input disabled id="coletaV" type="text" value={examesData[0].infoPaciente || "Não Existe"} />
                        </div>
                    </fieldset>

                    <div className="edit-buttonCCE">
                        <button type="button" onClick={finalizaCadastro}>VOLTAR PARA HOME</button>
                    </div>
                </form>
            </main>
            <Footer />
        </div>
    )
}

export default ConfirmaCadastroExame
