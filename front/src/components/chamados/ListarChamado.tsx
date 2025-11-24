import { useEffect, useState } from "react";
import Chamado from "../../models/Chamado";
import axios from "axios";

function ListarChamados() {
  const [chamados, setChamados] = useState<Chamado[]>([]);

  useEffect(() => {
    listarChamadosAPI();
  }, []);

  async function listarChamadosAPI() {
    try {
      const resposta = await axios.get<Chamado[]>(
        "http://localhost:5000/api/chamado/listar"
      );
      const dados = resposta.data;
      setChamados(dados);
    } catch (error) {
      console.log("Erro na requisição: " + error);
    }
  }

  function alterarStatus(id: string) {
    alterarStatusAPI(id);
  }

  async function alterarStatusAPI(id: string) {
    try {
      const resposta = await axios.put(
        `http://localhost:5000/api/chamado/alterar/${id}`
      );
      listarChamadosAPI();
    } catch (error) {
      console.log("Erro na requisição: " + error);
    }
  }

  return (
    <div>
      <h1>Listar Chamados</h1>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Descrição</th>
            <th>Criado em</th>
            <th>Status</th>
            <th>Alterar status</th>
          </tr>
        </thead>
        <tbody>
          {chamados.map((chamado) => (
            <tr key={chamado.chamadoId}>
              <td>{chamado.chamadoId}</td>
              <td>{chamado.descricao}</td>
              <td>{chamado.criadoEm}</td>
              <td>{chamado.status}</td>
              <td>
                <button onClick={() => alterarStatus(chamado.chamadoId!)}>
                  Alterar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListarChamados;