import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './ModalExcluir.scss';

export default function ModalExcluir(props) {
  const { id } = props;
  const [produto, setProduto] = useState(null);
  const navigate = useNavigate();

  // UseEffect para buscar informações do produto com base no ID
  useEffect(() => {
    fetch(`http://localhost:5000/produtos/${id}`)
      .then((response) => response.json())
      .then((data) => setProduto(data))
      .catch((error) => console.log(error));
  }, [id]);

  // Função para lidar com a exclusão do produto
  const handleExcluir = () => {
    fetch(`http://localhost:5000/produtos/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        // Após a exclusão bem-sucedida, exibe um alerta, fecha o modal e navega de volta para a página de produtos
        alert("Produto Excluído com sucesso");
        props.onClose(); // Fecha o modal
        navigate("/produtos"); // Navega de volta para a página de produtos
      })
      .catch((error) => console.log(error));
  };

  // Se as informações do produto ainda não foram carregadas, exibe uma mensagem de carregamento
  if (!produto) {
    return <div>Carregando...</div>;
  }

  // Renderização do formulário de confirmação de exclusão
  return (
    <div className="custom-modal">
      <div className="modal-content">
        <h2>Confirmação de Exclusão</h2>
        <p className="subtitle">
          Deseja realmente excluir o produto: "<span className="produto">{produto.nome}</span>"?
        </p>
        <h3>Informações do Produto:</h3>
        <ul>
          <li><strong>Descrição: </strong> {produto.desc}</li>
          <li><strong>Preço: </strong> R${produto.preco}</li>
        </ul>
        {/* Botão para confirmar a exclusão e outro para cancelar a operação */}
        <button onClick={handleExcluir}>Confirmar Exclusão</button>
        <button onClick={props.onClose}>Cancelar</button>
      </div>
    </div>
  );
}
