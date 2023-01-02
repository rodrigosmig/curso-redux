import styles from './TituloSemImagem.module.scss';

interface Props {
  titulo: string;
  descricao: string;
}

export default function TituloSemImagem({
  titulo,
  descricao
}: Props) {
  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>
        {titulo}
      </h1>
      <h2 className={styles.descricao}>
        {descricao}
      </h2>
    </div>
  )
}