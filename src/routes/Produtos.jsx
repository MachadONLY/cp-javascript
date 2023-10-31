import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Produtos.module.css";
import { AiFillEdit as Editar } from "react-icons/ai";
import { MdDeleteForever as Excluir } from "react-icons/md";
import ModalExcluir from "../components/ModalAction/ModalExcluir";

export default function Produtos() {
  document.title = "Lista de Produtos";

  const [listaProdutosLocal, setListaProdutosLocal] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [produtoId, setProdutoId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/produtos")
      .then((response) => response.json())
      .then((response) => setListaProdutosLocal(response))
      .catch((error) => console.log(error));
  }, []);

  // Função para atualizar a lista de produtos após a exclusão
  const atualizarListaProdutos = () => {
    fetch("http://localhost:5000/produtos")
      .then((response) => response.json())
      .then((response) => setListaProdutosLocal(response))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h1>Lista de Produtos</h1>

      {isModalOpen && (
        <ModalExcluir
          id={produtoId}
          open={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            atualizarListaProdutos(); // Após a exclusão, atualize a lista de produtos
          }}
        />
      )}

      <div>
        <table className={styles.tblEstilo}>
          <thead>
            <tr>
              <th>ID</th>
              <th>NOME</th>
              <th>DESCRIÇÃO</th>
              <th>PREÇO</th>
              <th>EDITAR / EXCLUIR</th>
            </tr>
          </thead>
          <tbody>
            {listaProdutosLocal.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nome}</td>
                <td>{item.desc}</td>
                <td>{item.preco}</td>
                <td>
                  {" "}
                  <Link to={`/editar/produtos/${item.id}`}>
                    {" "}
                    <Editar />{" "}
                  </Link>{" "}
                  |{" "}
                  <span
                    onClick={() => {
                      setIsModalOpen(true);
                      setProdutoId(item.id);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <Excluir />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={5}>
                PRODUTOS INFORMÁTICOS - QTD = {listaProdutosLocal.length}
              </td>
              <td>
              <Link to="/adicionar/produtos">
        <button className="addProdutos">ADICIONAR PRODUTO</button> 
        {/* adiciona produto */}
      </Link>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
