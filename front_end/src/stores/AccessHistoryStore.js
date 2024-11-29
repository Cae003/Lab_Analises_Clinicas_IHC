import React, { createContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const AccessHistoryContext = createContext();

export const AccessHistoryStore = ({ children }) => {
  const [accessHistory, setAccessHistory] = useState([]);
  const location = useLocation(); // Observar a mudança de rota

  const addAccess = (access) => {
    setAccessHistory((prevHistory) => {
      // Verifica se a URL já existe no histórico
      const existingIndex = prevHistory.findIndex(
        (item) => item.url === access.url
      );

      if (existingIndex !== -1) {
        // Remove a entrada existente e adiciona ao início
        const updatedHistory = [
          access,
          ...prevHistory.filter((_, index) => index !== existingIndex),
        ];
        return updatedHistory.slice(0, 10); // Garante no máximo 10 itens
      }

      // Adiciona o novo acesso no início da lista
      return [access, ...prevHistory].slice(0, 10); // Garante no máximo 10 itens
    });
  };

  useEffect(() => {
    const currentTime = new Date();

    // Lista de rotas que **não** devem ser monitoradas
    const excludedRoutes = [
      "/",
      "/Recepcionista",
      "/Gestor",
      "/Analista",
      "/Tecnico",
      "/Recepcionista/Perfil",
      "/Recepcionista/Perfil/EditPerfil",
    ];

    // Verifica se a rota atual **não** está na lista de rotas excluídas
    if (!excludedRoutes.includes(location.pathname)) {
      const newAccess = {
        url: location.pathname,
        date: currentTime.toLocaleDateString(),
        time: currentTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      addAccess(newAccess);
    }
  }, [location]); // Executa sempre que a localização mudar

  return (
    <AccessHistoryContext.Provider value={{ accessHistory }}>
      {children}
    </AccessHistoryContext.Provider>
  );
};
