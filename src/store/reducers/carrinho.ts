import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IItem } from "./itens";

export interface ICarrinho {
  item: IItem;
  quantidade: number;
}

export interface IQuantidade {
  id: string;
  quantidade: number;
}

const initialState: ICarrinho[] = []

const carrinhoSlice = createSlice({
  name: 'carrinho',
  initialState,
  reducers: {
    mudarCarrinho: (state, action: PayloadAction<IItem>) => {
      const temItem = state.some(carrinho => carrinho.item.id === action.payload.id)

      if (!temItem) {
        return [
          ...state,
          {
            item: action.payload,
            quantidade: 1
          }
        ]
      }

      return state.filter(carrinho => carrinho.item.id !== action.payload.id)
    },
    mudarQuantidade: (state, action: PayloadAction<IQuantidade>) => {
      state.forEach(itemNoCarrinho => {
        if (itemNoCarrinho.item.id === action.payload.id) {
          itemNoCarrinho.quantidade += action.payload.quantidade
        }
        return itemNoCarrinho;
      })
      return state;
    },
    resetarCarrinho: () => initialState
  }
});

export const { mudarCarrinho, mudarQuantidade, resetarCarrinho } = carrinhoSlice.actions;

export default carrinhoSlice.reducer;