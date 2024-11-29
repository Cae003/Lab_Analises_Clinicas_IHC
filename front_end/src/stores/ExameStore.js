import { createContext, useState, useEffect } from "react";

export const ExamesContext = createContext();

export const ExamesStore = ({children}) => {
    // Inicializa o examesData com o valor do localStorage, caso exista
    const [examesData, setExamesData] = useState(() => {
        const storedUsersData = localStorage.getItem("examesData");
        return storedUsersData ? JSON.parse(storedUsersData) : {};
    });

    // Atualiza o localStorage sempre que examesData mudar
    useEffect(() => {
        //console.log(examesData);
        localStorage.setItem("examesData", JSON.stringify(examesData));
    }, [examesData]);

    return (
        <ExamesContext.Provider value={{ examesData, setExamesData }}>
            {children}
        </ExamesContext.Provider>
    );
}