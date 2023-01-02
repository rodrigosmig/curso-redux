import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RootState } from 'store';
import { mudarBusca, resetarBusca } from 'store/reducers/busca';
import styles from './Busca.module.scss';

export default function Busca() {
	const busca = useSelector((state: RootState) => state.busca);
	const dispatch = useDispatch();
	const location = useLocation()

	useEffect(() => {
		dispatch(resetarBusca())
	}, [dispatch, location.pathname])

	return (
		<div className={styles.busca}>
				<input 
					className={styles.input}
					placeholder="O que você procura?"
					value={busca}
					onChange={evento => dispatch(mudarBusca(evento.target.value))}
				/>
		</div>
	)
}