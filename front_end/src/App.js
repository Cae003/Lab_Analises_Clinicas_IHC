import './App.css';
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/login";
import IndexA from "./pages/index_Analista/IndexA";
import IndexG from './pages/Index_Gestor/IndexG';
import IndexR from './pages/index_Recep/index_R';
import IndexT from './pages/index_Tecnico/IndexT';
import Perfil from './pages/Perfil/Perfil';
import EditPerfil from "./pages/EditPerfil/EditPerfil";
import TodosPacientes from "./pages/TodosPacientes/TodosPacientes";
import CadastroPaciente from "./pages/CadastroPaciente/CadastroPaciente";
import CadastroUserT from "./pages/CadastroUserT/CadastroUserT";
import CadastroExame from "./pages/CadastroExame/CadastroExame";
import VerPaciente from './pages/VerPaciente/VerPaciente';
import EditPaciente from './pages/EditPaciente/EditPaciente';
import ColetaDH from './pages/ColetaDataHora/ColetaDH';
import ConfirmaCadastroT from './pages/ConfirmaUserT/ConfirmaCadastroT';
import ConfirmaCadastroExame from './pages/ConfirmaCadastroExame/ConfirmaCadastroExame';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Analista" element={<IndexA />} />
      <Route path="/Gestor" element={<IndexG />} />
      <Route path="/Recepcionista" element={<IndexR />} />
      <Route path="/Recepcionista/Perfil" element={<Perfil />} />
      <Route path="/Recepcionista/Perfil/EditPerfil" element={<EditPerfil />} />
      <Route path="/Recepcionista/TodosPacientes" element={<TodosPacientes />} />
      <Route path="/Recepcionista/TodosPacientes/Cadastrar" element={<CadastroPaciente />} />
      <Route path="/Recepcionista/TodosPacientes/Paciente" element={<VerPaciente />} />
      <Route path="/Recepcionista/TodosPacientes/Paciente/EditPaciente" element={<EditPaciente />} />
      <Route path="/Recepcionista/CadastroTecnico" element={<CadastroUserT />} />
      <Route path="/Recepcionista/CadastroTecnico/ConfirmaCadastoTecnico" element={<ConfirmaCadastroT />} />
      <Route path="/Recepcionista/CadastroExame" element={<CadastroExame />} />
      <Route path="/Recepcionista/CadastroExame/ConfirmaCadastroExame" element={<ConfirmaCadastroExame />} />
      <Route path="/Tecnico" element={<IndexT />} />
      <Route path="/Tecnico/ColetaExame" element={<ColetaDH />} />
    </Routes>
  );
}

export default App;
