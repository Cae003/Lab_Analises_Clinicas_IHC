import React, { useContext, useState } from "react";
import "./login.css";
import { useNavigate } from 'react-router-dom';
import Logo from "../../assets/Logo_Definitiva.png";
import IconUser from "../../assets/User.png";
import IconLock from "../../assets/Lock.png";
import axios from "axios";
import { UserContext } from "../../stores/UserStore";

function Login() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [userRegister, setUserRegister] = useState("");
    const [password, setPassword] = useState("");
    const {setUserData} = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false); // Estado para verificar se ainda está carregando
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post(`${apiUrl}/api/login`, {
                userRegister,
                password,
            });
    
            if (response.data.accessLevel) { // Se `accessLevel` ou outros dados relevantes existirem
                // console.log(response.data);
                setUserData(response.data); // Armazena a resposta completa no contexto
                navigate(response.data.accessLevel); // Navega com base no nível de acesso
            } else {
                alert("Credenciais Inválidas! Veja se às escreveu corretamente ou peça para um Gestor te cadastrar.");
            }
        } catch (error) {
            alert("Erro ao tentar fazer login. Tente novamente mais tarde.");
        }
        setIsLoading(false);
    };    

    function handleInvalidUserRegister(e) {
        e.target.setCustomValidity("Digite um login válido! (6 caracteres, sendo eles de 0 a 9)");
    }

    function handleInvalidPassword(e) {
        e.target.setCustomValidity("Digite uma senha válida! (8 caracteres, incluindo: 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caractere especial.)");
    }

    function handleChangeUserRegister(e) {
        setUserRegister(e.target.value);
        e.target.setCustomValidity(""); // Limpa a mensagem de erro
    }

    function handleChangePassword(e) {
        setPassword(e.target.value);
        e.target.setCustomValidity(""); // Limpa a mensagem de erro
    }

    return (
        <div className="container">
            <main id="left">
                <div className="logo">
                    <img src={Logo} alt="Lab Logo" />
                </div>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="input-container">
                        <img src={IconUser} alt="Ícone de Usuário" />
                        <input
                            className="username"
                            placeholder="Registro do Usuário"
                            maxLength="6"
                            type="text"
                            onChange={handleChangeUserRegister}
                            onInvalid={handleInvalidUserRegister}
                            pattern="[0-9]{6,6}$"
                            required />
                    </div>
                    <div className="input-container">
                        <img src={IconLock} alt="Ícone de Cadeado" />
                        <input
                            className="password"
                            placeholder="Senha"
                            type="password"
                            onChange={handleChangePassword}
                            onInvalid={handleInvalidPassword}
                            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$"
                            required />
                    </div>
                    <button type="submit" className="button">ACESSAR SISTEMA</button>
                </form>
                {isLoading ? (
                    <p id="CarregandoL">Carregando...</p>
                ): ""}
            </main>
            <aside id="right"></aside>
        </div>
    );
}

export default Login;