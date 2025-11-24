import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import CadastrarChamado from "./components/chamados/CadastrarChamado";
import ListarChamados from "./components/chamados/ListarChamado";
import ListarChamadosResolvidos from "./components/chamados/ListarResolvidos";
import ListarChamadosNaoResolvidos from "./components/chamados/ListarNaoResolvidos";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="pages/chamado/listar">Lista de Chamados</Link>
            </li>
            <li>
              <Link to="pages/chamado/cadastrar">Cadastro de Chamado</Link>
            </li>
            <li>
              <Link to="pages/chamado/resolvidos">Lista de Chamados Resolvidos</Link>
            </li>
            <li>
              <Link to="pages/chamado/naoresolvido">Lista de Chamados Não Resolvidos</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route
            path="pages/chamado/cadastrar"
            element={<CadastrarChamado />}
          />
          <Route
            path="pages/chamado/listar"
            element={<ListarChamados />}
          />
          <Route
            path="pages/chamado/resolvidos"
            element={<ListarChamadosResolvidos />}
          />
          <Route
            path="pages/chamado/naoresolvido"
            element={<ListarChamadosNaoResolvidos />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;