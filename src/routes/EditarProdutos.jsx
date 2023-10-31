import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function EditarProdutos() {
  document.title = "EDITAR PRODUTOS";
  const { id } = useParams();
  const navigate = useNavigate();

  // Define um estado inicial para o número
  const initialProductState = {
    nome: '',
    desc: '',
    preco: 0, // Assume que é um número
  };

  const [produto, setProduto] = useState(initialProductState);

  useEffect(() => {
    fetch(`http://localhost:5000/produtos/${id}`)
      .then((response) => response.json())
      .then((response) => setProduto(response))
      .catch((error) => console.log(error));
  }, [id]);

  const handleChange = (e) => {
    // Destructuring
    const { name, value } = e.target;
    // Preencher o useState com a função set... utilizando
    // o operador SPREAD ...
    setProduto({ ...produto, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:5000/produtos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(produto),
    })
      .then((response) => {
        if (response.status === 200) {
          navigate("/produtos");
        } else {
          console.log("Update failed. Status: " + response.status);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h1>EDITAR PRODUTOS</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <legend>Produto Selecionado</legend>
          <div>
            <label htmlFor="idNome">Nome</label>
            <input
              type="text"
              name="nome"
              id="idNome"
              placeholder="Digite o nome do produto"
              value={produto.nome}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="idDesc">Descrição</label>
            <input
              type="text"
              name="desc"
              id="idDesc"
              placeholder="Digite a descrição do produto"
              value={produto.desc}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="idPreco">Valor</label>
            <input
              type="number"
              name="preco"
              id="idPreco"
              placeholder="Digite o valor do produto"
              value={produto.preco}
              onChange={handleChange}
            />
          </div>
          <div>
            <button>EDITAR</button>
          </div>
        </div>
      </form>
    </div>
  );
}
