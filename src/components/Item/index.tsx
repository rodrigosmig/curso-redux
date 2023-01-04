import { alterarItem, deletarItem, IItem, mudarFavorito } from 'store/reducers/itens';
import styles from './Item.module.scss';
import {
  AiOutlineHeart,
  AiFillHeart,
  AiFillCloseCircle,
  AiFillMinusCircle,
  AiFillPlusCircle,
  AiOutlineCheck,
  AiFillEdit
} from 'react-icons/ai';
import {
  FaCartPlus
} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { mudarCarrinho, mudarQuantidade } from 'store/reducers/carrinho';
import { RootState } from 'store';
import classNames from 'classnames';
import { useState } from 'react';
import Input from 'components/Input/input';

interface Props {
  item: IItem
  carrinho?: boolean
  quantidade?: number
}

const iconProps = {
  size: 24,
  color: '#041833'
}

const quantidadeProps = {
  size: 32,
  color: '#1875E8'
}

export function Item({item, quantidade = 0, carrinho = false}: Props) {
  const [modoDeEdicao, setModoDeEdicao] = useState(false);
  const [novoTitulo, setNovoTitulo] = useState(item.titulo);
  const dispatch = useDispatch();
  const estahNoCarrinho = useSelector((state: RootState) => {
    return state.carrinho.some(carrinho => carrinho.item.id === item.id)
  });

  function resolverFavorito() {
    dispatch(mudarFavorito(item.id))
  }

  function resolverCarrinho() {
    dispatch(mudarCarrinho(item))
  }

  const componenteModoDeEdicao = <>
    {modoDeEdicao
      ? <AiOutlineCheck
        {...iconProps}
        className={styles['item-acao']}
        onClick={() => {
          dispatch(alterarItem({id: item.id, titulo: novoTitulo}))
          setModoDeEdicao(false)
        }}
      />
      : <AiFillEdit
        {...iconProps}
        className={styles['item-acao']}
        onClick={() => setModoDeEdicao(true)}
      />
    }
  </>

  return (
    <div className={classNames(styles.item, {
      [styles.itemNoCarrinho]: carrinho
    })}>
      <AiFillCloseCircle
        {...iconProps}
        className={`${styles['item-acao']} ${styles['item-deletar']}`}
        onClick={() => dispatch(deletarItem(item.id))}
      />

      <div className={styles['item-imagem']}>
        <img src={item.foto} alt={item.titulo} />
      </div>

      <div className={styles['item-descricao']}>
        <div className={styles['item-titulo']}>
          {modoDeEdicao
            ? <Input value={novoTitulo} onChange={evento => setNovoTitulo(evento.target.value)} />
            : <h2>{item.titulo}</h2>
          }
          <p>{item.descricao}</p>
        </div>

        <div className={styles['item-info']}>
          <div className={styles['item-preco']}>
            R$ {item.preco.toFixed(2)}
          </div>

          <div className={styles['item-acoes']}>
            {item.favorito
              ? <AiFillHeart {...iconProps} color='#ff0000' className={styles['item-acao']} onClick={resolverFavorito} />
              : <AiOutlineHeart {...iconProps} className={styles['item-acao']} onClick={resolverFavorito} />
            }
            {
              carrinho
              ? (
                <div className={styles.quantidade}>
                  Quantidade:
                  <AiFillMinusCircle 
                    {...quantidadeProps} 
                    onClick={() => {
                      if (quantidade >= 1) {
                        dispatch(mudarQuantidade({id: item.id, quantidade: -1}))
                      }
                    }} 
                  />
                  <span>{String(quantidade || 0).padStart(2, '0')}</span>
                  <AiFillPlusCircle {...quantidadeProps} onClick={() => dispatch(mudarQuantidade({id: item.id, quantidade: 1}))}/>
                </div>
              )
              : (
                <>
                  <FaCartPlus 
                    {...iconProps}
                    color={estahNoCarrinho ? '#1875E8' : iconProps.color }
                    className={styles['item-acao']}
                    onClick={resolverCarrinho}
                  />
                  {componenteModoDeEdicao}
                </>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}