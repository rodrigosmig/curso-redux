import Button from "components/Button";
import Header from "components/Header";
import Input from "components/Input/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "store";
import { cadastrarItem } from "store/reducers/itens";
import styles from './Anuncie.module.scss';

export interface CadastrarForm {
  nome: string;
  descricao: string;
  imagem: string;
  categoria: string;
  preco: number;
}

export default function Anuncie() {
  const dispatch = useDispatch();
  const { nomeCategoria = '' } = useParams();
  const categorias = useSelector((state: RootState) => state.categorias.map(({ nome, id }) => ({ nome, id })));
  const {register, handleSubmit } = useForm<CadastrarForm>({
    defaultValues: {
      categoria: nomeCategoria
    }
  });

  const  cadastrar: SubmitHandler<CadastrarForm> = (data) => {
    dispatch(cadastrarItem(data))
  }

  return (
    <>
      <div className={styles.container}>
        <Header
            titulo='Anuncie aqui!'
            descricao='Anuncie seu produto no melhor site do Brasil'
        />
        <form className={styles.formulario} onSubmit={handleSubmit(cadastrar)}>
          <Input {...register('nome', {required: true})} placeholder='Nome do produto' alt='nome do produto' />
          <Input {...register('descricao', {required: true})} placeholder='Descrição do produto' alt='descrição do produto' />
          <Input {...register('imagem', {required: true})} placeholder='URL da imagem do produto' alt='URL da imagem do produto' />
          <select 
            {...register('categoria', {required: true})}
            disabled={!!nomeCategoria} 
          >
              <option value='' disabled > Selecione a categoria </option>
              {categorias.map(categoria => (
                  <option key={categoria.id} value={categoria.id}>
                      {categoria.nome}
                  </option>
              ))}
          </select>
          <input {...register('preco', {required: true, valueAsNumber: true})} type='number' placeholder='Preço do produto' />
          <Button
            type="submit"
          >
            Cadastrar produto
          </Button>
        </form>
      </div>
    </>
  )
}