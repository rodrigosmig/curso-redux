import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CadastrarForm } from "pages/Anuncie";
import itensService from "services/itens";

export interface IItem {
  id: number;
  titulo: string;
  descricao: string;
  foto: string;
  favorito: boolean;
  preco: number;
  categoria: string;
}

interface IAlterarTitulo {
  id: number;
  titulo: string;
}

export const buscarItens = createAsyncThunk(
  'itens/buscar',
  itensService.buscar
);

const initialState: IItem[] = []

const itensSlice = createSlice({
  name: 'itens',
  initialState,
  reducers: {
    mudarFavorito: (state, action: PayloadAction<number>) => {
      state.forEach(item => {
        if(item.id === action.payload) {
          item.favorito = !item.favorito;
          return item;
        }
      })
    },
    cadastrarItem: (state, action: PayloadAction<CadastrarForm>) => {
      const item = action.payload
      const ultimo = state.slice(-1).pop()

      state.push({
        id: ultimo ? ultimo.id : 1,
        titulo: item.nome,
        descricao: item.descricao,
        foto: item.imagem,
        favorito: false,
        preco: item.preco,
        categoria: item.categoria
      })
    },
    alterarItem: (state, action: PayloadAction<IAlterarTitulo>) => {
      state.forEach(item => {
        if (item.id === action.payload.id) {
          item.titulo = action.payload.titulo
        }
      })
    },
    deletarItem: (state, action: PayloadAction<number>) => {
      const index = state.findIndex(item => item.id === action.payload)
      state.splice(index, 1)
    },
    adicionarItens: (state, action: PayloadAction<IItem[]>) => {
      state.push(...action.payload)
    }
  },
  extraReducers: builder => {
    builder.addCase(
      buscarItens.fulfilled,
      (state, action: PayloadAction<IItem[]>) => {
        return action.payload
      }
    )
    .addCase(
      buscarItens.pending,
      (state, action) => {
        console.log('carregando itens')
      }
    )
    .addCase(
      buscarItens.rejected,
      (state, action) => {
        console.log('busca de itens rejeitada')
      }
    )
  }
});

export const { mudarFavorito, cadastrarItem, alterarItem, deletarItem, adicionarItens } = itensSlice.actions;

export default itensSlice.reducer;
