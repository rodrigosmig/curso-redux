import Button from "components/Button";
import Header from "components/Header";
import { Item } from "components/Item";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "store";
import styles from './Categoria.module.scss';

export default function Categoria() {
  const navigate = useNavigate();
  const { nomeCategoria } = useParams();
  const { categoria, itens } = useSelector((state: RootState) => {
    const regexp = new RegExp(state.busca, 'i');

    return {
      categoria: state.categorias.find(categoria => categoria.id === nomeCategoria),
      itens: state.itens.filter(item => item.categoria === nomeCategoria && item.titulo.match(regexp))
    }
  });

  return (
    <div>
      { categoria && (
        <>
          <Header 
            titulo={categoria.nome}
            descricao={categoria.descricao}
            imagem={categoria.header}
          >
            <Button onClick={() => navigate(`/anuncie/${nomeCategoria}`)}>
              Quero Anunciar
            </Button>
          </Header>

          <div className={styles.itens}>
            {itens.map(item => (
              <Item key={item.id} item={item} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}