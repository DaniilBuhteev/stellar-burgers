import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';

interface IConstructor {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: IConstructor = {
  bun: null,
  ingredients: []
};

export const constructorSlice = createSlice({
  name: 'constructorBurger',
  initialState,
  reducers: {
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    },
    addIngredient: {
      reducer: (
        state,
        action: PayloadAction<TConstructorIngredient | TIngredient>
      ) => {
        if ('id' in action.payload) {
          state.ingredients.push(action.payload);
        } else {
          state.bun = action.payload;
        }
      },
      prepare: (ingredient: TIngredient, id: string) => ({
        payload: ingredient.type === 'bun' ? ingredient : { ...ingredient, id }
      })
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    moveIngredient: (
      state,
      action: PayloadAction<{
        direction: 'up' | 'down';
        ingredient: TConstructorIngredient;
      }>
    ) => {
      const index = state.ingredients.findIndex(
        (ingredient) => ingredient.id === action.payload.ingredient.id
      );
      if (index !== -1) {
        let newPosition = index + (action.payload.direction === 'up' ? -1 : 1);
        newPosition = Math.max(
          0,
          Math.min(newPosition, state.ingredients.length - 1)
        );
        if (newPosition !== index) {
          const [tIngredient] = state.ingredients.splice(index, 1);
          state.ingredients.splice(newPosition, 0, tIngredient);
        }
      }
    }
  },
  selectors: {
    selectConstructor: (state: IConstructor) => state
  }
});
export const { selectConstructor } = constructorSlice.selectors;
export const {
  clearConstructor,
  addIngredient,
  removeIngredient,
  moveIngredient
} = constructorSlice.actions;
export default constructorSlice.reducer;
