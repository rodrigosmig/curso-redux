import Header from "components/Header";
import { Item } from "components/Item";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { ICarrinho, resetarCarrinho } from "store/reducers/carrinho";
import styles from './Carrinho.module.scss';

export default function Carrinho() {
  const dispatch = useDispatch();

  const {carrinho, total} = useSelector((state: RootState) => {
    let total = 0;
    const regexp = new RegExp(state.busca, 'i')
    const carrinhoReduce = state.carrinho.reduce((itens, itemNoCarrinho) => {
      const item = state.itens.find(item => item.id === itemNoCarrinho.item.id);
      total += item ? item.preco * itemNoCarrinho.quantidade : 0
      if (item && item.titulo.match(regexp)) {
        itens.push({
          item: item,
          quantidade: itemNoCarrinho.quantidade
        })
      }
      return itens;
    }, [] as ICarrinho[])
    return {
      carrinho: carrinhoReduce,
      total: total
    };
  })
  return (
    <div>
      <Header 
        titulo="Carrinho de Compras"
        descricao="Confira produtos que você adicionou ao carrinho"
      />
      <div className={styles.carrinho}>
        {carrinho.map(data => <Item key={data.item.id} item={data.item} quantidade={data.quantidade} carrinho />)}
        <div className={styles.total}>
          <strong>
            Resumo da compra
          </strong>
          <span>
            Subtotal: <strong> R$ {total.toFixed(2)} </strong>
          </span>
        </div>
        <button
          className={styles.finalizar}
          onClick={() => dispatch(resetarCarrinho())}
        >
          Finalizar compra
        </button>
      </div>
    </div>
  )
}