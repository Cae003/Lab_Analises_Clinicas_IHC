import { createContext, useState, useEffect } from "react";

export const UsuariosContext = createContext();

export const UsuariosStore = ({children}) => {
    // Inicializa o usuariosData com o valor do localStorage, caso exista
    const [usuariosData, setUsuariosData] = useState(() => {
        const storedUsersData = localStorage.getItem("usuariosData");
        return storedUsersData ? JSON.parse(storedUsersData) : {};
    });

    // Atualiza o localStorage sempre que usuariosData mudar
    useEffect(() => {
        // console.log(usuariosData);
        localStorage.setItem("usuariosData", JSON.stringify(usuariosData));
    }, [usuariosData]);

    return (
        <UsuariosContext.Provider value={{ usuariosData, setUsuariosData }}>
            {children}
        </UsuariosContext.Provider>
    );
}