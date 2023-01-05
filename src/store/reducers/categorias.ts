import { createStandaloneToast } from '@chakra-ui/toast';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import categoriasService from 'services/categorias';
import { resetarCarrinho } from './carrinho';

interface ICategory {
  nome: string;
  thumbnail: string;
  header: string;
  id: string;
  descricao: string;
}

const {toast} = createStandaloneToast();

const initialState: ICategory[] = []

export const buscarCategorias = createAsyncThunk(
  'categorias/buscar',
  categoriasService.buscar
);

const categoriasSlice = createSlice({
  name: 'categorias',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      buscarCategorias.fulfilled,
      (state, action: PayloadAction<ICategory[]>) => {
        toast({
          title: "Sucesso",
          description: 'Categorias carregadas com sucesso!',
          duration: 2000,
          isClosable: true,
          status: 'success'
        })
        return action.payload
      }
    )
    .addCase(
      buscarCategorias.pending,
      (state, action) => {
        toast({
          title: "Carregando...",
          description: 'Carregando categorias',
          duration: 2000,
          isClosable: true,
          status: 'loading'
        })
      }
    )
    .addCase(
      buscarCategorias.rejected,
      (state, action) => {
        toast({
          title: "Erro",
          description: 'Erro na busca de categorias',
          duration: 2000,
          isClosable: true,
          status: 'error'
        })
      }
    )
    .addCase(
      resetarCarrinho.type,
      () => {
        toast({
          title: "Sucesso",
          description: 'Compra completada com sucesso',
          duration: 2000,
          isClosable: true,
          status: 'success'
        })
      }
    )
  }
});

export default categoriasSlice.reducer;