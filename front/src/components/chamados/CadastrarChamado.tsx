import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Chamado from "../../models/Chamado";

function CadastrarChamado() {
  const [descricao, setDescricao] = useState("");
  const navigate = useNavigate();

  function submeterForm(e: any) {
    e.preventDefault();
    enviarChamadoAPI();
  }

  async function enviarChamadoAPI() {
    try {
      const chamado: Chamado = { descricao };
      const resposta = await axios.post(
        "http://localhost:5000/api/chamado/cadastrar",
        chamado
      );
      navigate("/");
    } catch (error) {
      console.log("Erro na requisição: " + error);
    }
  }

  return (
    <div>
      <h1>Cadastrar Chamado</h1>
      <form onSubmit={submeterForm}>
        <div>
          <label>Descrição:</label>
          <input
            type="text"
            onChange={(e: any) => setDescricao(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Cadastrar</button>
        </div>
      </form>
    </div>
  );
}

export default CadastrarChamado;