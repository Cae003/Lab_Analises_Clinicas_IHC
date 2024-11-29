import { createContext, useState, useEffect } from "react";

export const PacienteContext = createContext();

export const PacienteStore = ({children}) => {
    // Inicializa o pacienteData com o valor do localStorage, caso exista
    const [pacienteData, setPacienteData] = useState(() => {
        const storedUsersData = localStorage.getItem("pacienteData");
        return storedUsersData ? JSON.parse(storedUsersData) : {};
    });

    // Atualiza o localStorage sempre que pacienteData mudar
    useEffect(() => {
        // console.log(pacienteData);
        localStorage.setItem("pacienteData", JSON.stringify(pacienteData));
    }, [pacienteData]);

    return (
        <PacienteContext.Provider value={{ pacienteData, setPacienteData }}>
            {children}
        </PacienteContext.Provider>
    );
}