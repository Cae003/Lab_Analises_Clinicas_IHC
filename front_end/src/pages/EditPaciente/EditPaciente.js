import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./EditPaciente.css";
import Header from '../../components/Header/header';
import NavLateralR from '../../components/navLateral_Recep/navLateral_R';
import Footer from '../../components/Footer/footer';
import ConfirmaSenha from "../../components/ConfirmaSenha/PopupSenha";
import { PacienteContext } from '../../stores/PacienteStore';
import axios from 'axios';

const EditPaciente = () => {

    const apiUrl = process.env.REACT_APP_API_URL;
    const { pacienteData } = useContext(PacienteContext);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    // Estados individuais para cada campo do formulário
    const [nome, setNome] = useState(pacienteData.nome ||"");
    const [nomeSocial, setNomeSocial] = useState(pacienteData.nomeSocial ||"");
    const [datanasc, setDataNasc] = useState(pacienteData.datanasc ||"");
    const [cpf, setCPF] = useState(pacienteData.cpf ||"");
    const [nomeMae, setNomeMae] = useState(pacienteData.nomeMae ||"");
    const [nomeResponsavel, setNomeResponsavel] = useState(pacienteData.nomeResponsavel ||"");
    const [sexo, setSexo] = useState(pacienteData.sexo ||"");
    const [endereco, setEndereco] = useState(pacienteData.endereco ||"");
    const [cidade, setCidade] = useState(pacienteData.cidade ||"");
    const [bairro, setBairro] = useState(pacienteData.bairro ||"");
    const [cep, setCEP] = useState(pacienteData.cep ||"");
    const [email, setEmail] = useState(pacienteData.email ||"");
    const [telefone1, setTelefone1] = useState(pacienteData.telefone1 ||"");
    const [telefone2, setTelefone2] = useState(pacienteData.telefone2 ||"");

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
            // Envia uma requisição HTTP PUT para o backend com todos os dados atualizados
            const response = await axios.put(`${apiUrl}/api/paciente/update/${pacienteData.registropaciente}`, {
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
            console.log(response.data);
            if (response) { // Se a resposta for bem-sucedida
                console.log(response.data);
                setShowModal(false); // Fecha o modal
                alert("Alterações Confirmadas!"); // Simulação de sucesso
                navigate("/Recepcionista/TodosPacientes/Paciente"); // Redireciona após confirmação
            } else {
                alert("Erro no alteração dos dados no banco"); // Mostra um alerta de erro se a resposta for inválida
            }
        } catch (error) {
            alert(`Erro ao tentar fazer o processo de Update. Erro:${error}`); // Alerta se houver erro na requisição
        }
    };

    return (
        <>
            <Header />
            <NavLateralR />
            <main className="main-contentECP">
                <h1>Informações do Paciente</h1>
                <form onSubmit={submitButtom}>
                    <fieldset id="DadosPessoais" className="blocoDadosECP">
                        <div className="form-groupECP">
                            <label htmlFor="rp">RP (Registro do Paciente)</label>
                            <input disabled id="rp" type="text" maxLength="9" defaultValue={pacienteData.registropaciente || "Não Existe"} />
                        </div>
                        <div className="form-groupECP">
                            <label htmlFor="nome">Nome Completo*</label>
                            <input required id="nome" type="text" defaultValue={pacienteData.nome || "Não Existe"} onChange={handleChange(setNome)} />
                        </div>
                        <div className="form-groupECP">
                            <label htmlFor="nomeSocial">Nome Social</label>
                            <input id="nomeSocial" type="text" defaultValue={pacienteData.nomeSocial || "Não Existe"} onChange={handleChange(setNomeSocial)} />
                        </div>
                        <div className="form-groupECP">
                            <label htmlFor="nascimento">Data de Nascimento*</label>
                            <input required id="nascimento" type="text" maxLength="10" defaultValue={pacienteData.datanasc || "Não Existe"} onChange={handleChange(setDataNasc)} />
                        </div>
                        <div className="form-groupECP">
                            <label htmlFor="cpf">CPF*</label>
                            <input required id="cpf" type="text" maxLength="14" defaultValue={pacienteData.cpf || "Não Existe"} onChange={handleChange(setCPF)} />
                        </div>
                        <div className="form-groupECP">
                            <label htmlFor="nomeMae">Nome da Mãe*</label>
                            <input required id="nomeMae" type="text" defaultValue={pacienteData.nomeMae || "Não Existe"} onChange={handleChange(setNomeMae)} />
                        </div>
                        <div className="form-groupECP">
                            <label htmlFor="nomeResp">Nome do Responsável</label>
                            <input required id="nomeResp" type="text" defaultValue={pacienteData.nomeResponsavel || "Não Existe"} onChange={handleChange(setNomeResponsavel)} />
                        </div>
                        <div className="form-groupECP">
                            <label>Sexo Biológico: </label>
                            <div className="radio-groupECP">
                                <label htmlFor="sexo-m">M</label>
                                <input required className="sexoOpcaoVP" defaultChecked={pacienteData.sexo === "M"} id="sexo-m" name="sexo" type="radio" value="M" onChange={() => setSexo("M")} />
                                <label htmlFor="sexo-f">F</label>
                                <input required className="sexoOpcaoVP" defaultChecked={pacienteData.sexo === "F"} id="sexo-f" name="sexo" type="radio" value="F" onChange={() => setSexo("F")} />
                            </div>
                        </div>
                    </fieldset>

                    <fieldset id="DadosEndereco" className="blocoDadosECP">
                        <div className="form-groupECP">
                            <label htmlFor="endereco">Endereço*</label>
                            <input required id="endereco" type="text" defaultValue={pacienteData.endereco || "Não Existe"} onChange={handleChange(setEndereco)} />
                        </div>
                        <div className="form-groupECP">
                            <label htmlFor="cidade">Cidade*</label>
                            <input required id="cidade" type="text" defaultValue={pacienteData.cidade || "Não Existe"} onChange={handleChange(setCidade)} />
                        </div>
                        <div className="form-groupECP">
                            <label htmlFor="bairro">Bairro*</label>
                            <input required id="bairro" type="text" defaultValue={pacienteData.bairro || "Não Existe"} onChange={handleChange(setBairro)} />
                        </div>
                        <div className="form-groupECP">
                            <label htmlFor="cep">CEP*</label>
                            <input required id="cep" type="text" maxLength="9" defaultValue={pacienteData.cep || "Não Existe"} onChange={handleChange(setCEP)} />
                        </div>
                    </fieldset>

                    <fieldset id="Contatos" className="blocoDadosECP">
                        <div className="form-groupECP">
                            <label htmlFor="email">Email*</label>
                            <input required id="email" type="email" defaultValue={pacienteData.email || "Não Existe"} onChange={handleChange(setEmail)} />
                        </div>
                        <div className="form-groupECP">
                            <label htmlFor="telefone1">Telefone 1*</label>
                            <input required id="telefone1" type="tel" defaultValue={pacienteData.telefone1 || "Não Existe"} onChange={handleChange(setTelefone1)} />
                        </div>
                        <div className="form-groupECP">
                            <label htmlFor="telefone2">Telefone 2</label>
                            <input id="telefone2" type="tel" defaultValue={pacienteData.telefone2 || "Não Existe"} onChange={handleChange(setTelefone2)} />
                        </div>
                    </fieldset>

                    <div className="edit-buttonECP">
                        <button type="submit">SALVAR ALTERAÇÕES</button>
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

export default EditPaciente
