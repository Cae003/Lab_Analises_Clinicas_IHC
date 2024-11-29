import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserStore = ({children}) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [userData, setUserData] = useState(() => {
        const storedUserData = localStorage.getItem("userData");
        return storedUserData ? JSON.parse(storedUserData) : {};
    });

    const fetchUserData = async (userRegister) => {
        try {
            const response = await axios.get(`${apiUrl}/api/profile/${userRegister}`);
            setUserData(response.data);
        } catch (error) {
            console.error("Erro ao carregar perfil do usuário:", error);
        }
    };

    // Atualiza o localStorage sempre que userData mudar
    useEffect(() => {
        localStorage.setItem("userData", JSON.stringify(userData));
    }, [userData]);

    return (
        <UserContext.Provider value={{ userData, setUserData, fetchUserData }}>
            {children}
        </UserContext.Provider>
    );
};
