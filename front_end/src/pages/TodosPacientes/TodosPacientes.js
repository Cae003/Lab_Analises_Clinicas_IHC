import React, { useCallback, useContext, useEffect, useState } from 'react';
import "./TodosPacientes.css";
import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';
import NavLateralR from '../../components/navLateral_Recep/navLateral_R';
import lupa from "../../assets/Lupa.png";
import pacienteIMG from "../../assets/paciente.png";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PacienteContext } from '../../stores/PacienteStore';

const TodosPacientes = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const { setPacienteData } = useContext(PacienteContext);
  const [pacientes, setPacientes] = useState([]); // Estado para armazenar a lista de pacientes
  const [isLoading, setIsLoading] = useState(true); // Estado para verificar se ainda está carregando
  const [searchText, setSearchText] = useState(''); // Estado para armazenar o texto de pesquisa
  const navigate = useNavigate();

  // Função para navegar para a página de cadastro
  function goCadastrar() {
    navigate("Cadastrar");
  }

  // Função para navegar para a página de detalhes do paciente
  function goPaciente(paciente) {
    //console.log(paciente);
    setPacienteData(paciente);
    navigate("Paciente");
  }

  // Função para buscar a lista de pacientes do backend
  const recebeLista = useCallback(async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/listarPacientes`);
      setPacientes(response.data);
    } catch (error) {
      console.error("Erro ao carregar a lista de pacientes:", error);
    } finally {
      setIsLoading(false);
    }
  }, [apiUrl]); // Adicione apiUrl se necessário para garantir que a função seja atualizada se essa variável mudar

  // Chama a função ao carregar a página
  useEffect(() => {
    recebeLista();
  }, [recebeLista]);

  // Filtrar pacientes com base no texto de pesquisa
  const filteredPacientes = pacientes.filter(paciente =>
    paciente.nome.toLowerCase().includes(searchText.toLowerCase()) || 
    paciente.registropaciente.includes(searchText) || 
    paciente.datanasc.includes(searchText)
  );

  return (
    <div>
      <div className="background"></div>
      <Header />
      <NavLateralR />
      <main className="main-contentTP">
        <header className="search-barTP">
          <span>Lista de Pacientes</span>
          <div className="input-containerTP">
            <img src={lupa} alt="Ícone de Pesquisa"></img>
            <input 
              placeholder="Pesquisar Pacientes" 
              type="text" 
              value={searchText} 
              onChange={(e) => setSearchText(e.target.value)} // Atualiza o texto de pesquisa
            />
          </div>
          <button onClick={goCadastrar}>Cadastrar Paciente</button>
        </header>
        <article>
          {isLoading ? ( // Verifica se está carregando
            <p id="CarregandoTP">Carregando...</p>
          ) : pacientes.length === 0 ? ( // Verifica se o backend não retornou pacientes
            <p className="no-patients-messageTP">Não há pacientes cadastrados.</p>
          ) : filteredPacientes.length > 0 ? ( // Verifica se há pacientes filtrados
            <ul className="patient-listTP">
              {filteredPacientes.map((paciente, index) => (
                <li key={index} onClick={() => goPaciente(paciente)}>
                  <img src={pacienteIMG} alt="Ícone do Paciente"></img>
                  <p className="nomeTP">{paciente.nome}</p>
                  <p className="RP_TP">{paciente.registropaciente}</p>
                  <p className="DNascTP">{paciente.datanasc}</p>
                </li>
              ))}
            </ul>
          ) : ( // Quando não há pacientes correspondentes à pesquisa
            <p className="no-patients-messageTP">Nenhum paciente corresponde à pesquisa.</p>
          )}
        </article>
      </main>
      <Footer />
    </div>
  );
}

export default TodosPacientes;