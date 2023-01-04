import { forwardRef, ForwardRefRenderFunction, InputHTMLAttributes } from 'react';
import styles from './Input.module.scss';

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const Input: ForwardRefRenderFunction<HTMLInputElement, Props> = ({ ...rest }: Props, ref) => {
    return (
      <input 
        className={styles.input}
        {...rest}
        ref={ref}
      />
    )
}

export default forwardRef(Input)