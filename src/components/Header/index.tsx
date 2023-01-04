import { ReactNode } from 'react';
import styles from './Header.module.scss';
import TituloComImagem from './TituloComImagem';
import TituloSemImagem from './TituloSemImagem';

interface Props {
  titulo: string;
  descricao: string;
  className?: string;
  imagem?: string;
  children?: ReactNode;
}

export default function Header({titulo, descricao, imagem, children, className = ""}: Props) {
  return (
    <header className={styles.header}>
      {titulo && !imagem &&
        <TituloSemImagem
          titulo={titulo}
          descricao={descricao}
        >
          {children}
        </TituloSemImagem>
      }
      {titulo && imagem &&
        <TituloComImagem
          titulo={titulo}
          descricao={descricao}
          imagem={imagem}
          className={className}
        >
          {children}
        </TituloComImagem>
      }
    </header>
  )
}