import { Children, ReactNode } from 'react';
import styles from './TituloComImagem.module.scss';

interface Props {
  titulo: string;
  descricao: string;
  className?: string;
  imagem?: string;
  children: ReactNode;
}

export default function TituloComImagem({
  titulo,
  descricao,
  imagem,
  className,
  children
}: Props) {
  return (
    <div className={`${className} ${styles.header}`}>
      <div className={styles['header-texto']}>
        <h1>{titulo}</h1>
        <h2>{descricao}</h2>
        {children}
      </div>
      <div className={styles['header-imagem']}>
        <img
          alt={titulo}
          src={imagem}
        />
      </div>
    </div>
  )
}