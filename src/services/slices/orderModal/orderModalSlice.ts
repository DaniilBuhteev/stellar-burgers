import { createSlice, SerializedError } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrderByNumberThunk, orderModalThunk } from './orderModalThunk';

export interface OrderModalState {
  order: TOrder | null;
  isLoading: boolean;
  error: SerializedError | null;
}

export const initialState: OrderModalState = {
  order: null,
  isLoading: false,
  error: null
};

export const orderModalSlice = createSlice({
  name: 'orderModal',
  initialState,
  reducers: {
    clearOrderModal(state) {
      state.order = null;
    }
  },
  selectors: {
    selectModal: (state) => state.order,
    selectMdalLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderModalThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(orderModalThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload.order;
      })
      .addCase(orderModalThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(getOrderByNumberThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderByNumberThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload.orders[0];
      })
      .addCase(getOrderByNumberThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  }
});

export const { clearOrderModal } = orderModalSlice.actions;

export default orderModalSlice.reducer;

export const { selectModal, selectMdalLoading } = orderModalSlice.selectors;
