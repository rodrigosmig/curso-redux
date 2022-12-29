import styles from './PageDefault.module.scss';
import Navbar from 'components/Navbar';
import { Outlet } from "react-router-dom";
import Footer from 'components/footer';
export default function PaginaPadrao() {
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles['container-outlet']}>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}