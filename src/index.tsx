// After
import { createStandaloneToast } from '@chakra-ui/toast';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import Router from 'routes';
import './index.css';
import store from './store';

const { ToastContainer, toast } = createStandaloneToast()

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
      <Router />
      <ToastContainer />
    </Provider>
);
