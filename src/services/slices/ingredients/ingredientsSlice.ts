import { createSlice, SerializedError } from '@reduxjs/toolkit';
import { getIngredientsThunk } from './ingredientsThunk';
import { TIngredient } from '@utils-types';

export interface IIngredients {
  requestStatus: 'Idle' | 'Loading' | 'Success' | 'Failed';
  ingredients: TIngredient[];
  error: SerializedError | null;
}

export const initialState: IIngredients = {
  requestStatus: 'Idle',
  ingredients: [],
  error: null
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectIngredientsStatus: (state) => state.requestStatus
  },
  extraReducers(builder) {
    builder
      .addCase(getIngredientsThunk.pending, (state) => {
        state.requestStatus = 'Loading';
        state.ingredients = [];
      })
      .addCase(getIngredientsThunk.fulfilled, (state, action) => {
        state.requestStatus = 'Success';
        state.ingredients = action.payload;
      })
      .addCase(getIngredientsThunk.rejected, (state, action) => {
        state.requestStatus = 'Failed';
        state.error = action.error;
      });
  }
});

export const { selectIngredients, selectIngredientsStatus } =
  ingredientsSlice.selectors;

export default ingredientsSlice.reducer;
