import { useEffect, useState } from "react";
import Chamado from "../../models/Chamado";
import axios from "axios";

function ListarChamadosResolvidos() {
  const [chamadosResolvidos, setChamadosResolvidos] = useState<Chamado[]>([]);

  useEffect(() => {
    listarChamadosResolvidosAPI();
  }, []);

  async function listarChamadosResolvidosAPI() {
    try {
      const resposta = await axios.get<Chamado[]>(
        "http://localhost:5000/api/chamado/resolvidos"
      );
      const dados = resposta.data;
      setChamadosResolvidos(dados);
    } catch (error) {
      console.log("Erro na requisição: " + error);
    }
  }

  return (
    <div>
      <h1>Listar chamados resolvidos</h1>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Descrição</th>
            <th>Criado em</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {chamadosResolvidos.map((chamado) => (
            <tr key={chamado.chamadoId}>
              <td>{chamado.chamadoId}</td>
              <td>{chamado.descricao}</td>
              <td>{chamado.criadoEm}</td>
              <td>{chamado.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListarChamadosResolvidos;