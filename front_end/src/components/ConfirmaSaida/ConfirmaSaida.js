import React from 'react'
import "./ConfirmaSaida.css";

const ConfirmaSaida = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <button className="cancel-btn" onClick={onCancel}>
          Cancelar
        </button>
        <button className="confirm-btn" onClick={onConfirm}>
          Sair
        </button>
      </div>
    </div>
  )
}

export default ConfirmaSaida
