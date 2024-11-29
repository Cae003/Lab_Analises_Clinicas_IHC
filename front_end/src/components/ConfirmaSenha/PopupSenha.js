import React, { useContext, useState } from 'react'
import "./PopupSenha.css"
import { UserContext } from '../../stores/UserStore';

const PopupSenha = ({ onConfirm, onCancel }) => {

  const [senha, setSenha] = useState('');
  const { userData } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (senha === userData.password) {
      onConfirm(); // Simula o envio ao backend
    } else {
      console.log(senha);
      console.log(userData.password);
      alert('Senha incorreta!');
    }
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <form onSubmit={handleSubmit}>
          <label htmlFor="senha">Digite sua senha:</label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <div className="popup-buttons">
            <button type="submit">Confirmar</button>
            <button type="button" onClick={onCancel}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PopupSenha
