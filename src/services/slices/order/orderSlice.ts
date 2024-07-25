import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  SerializedError
} from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrdersThunk } from './orderThunk';

interface IOrder {
  orders: TOrder[];
  isLoading: boolean;
  error: SerializedError | null;
}

const initialState: IOrder = {
  orders: [],
  isLoading: false,
  error: null
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  selectors: {
    selectOrderUser: (state) => state.orders,
    selectOrderRequest: (state) => state.isLoading,
    selectOrderError: (state) => state.error
  },
  extraReducers(builder) {
    builder
      .addCase(getOrdersThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrdersThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(getOrdersThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  }
});
export const { selectOrderUser, selectOrderRequest, selectOrderError } =
  orderSlice.selectors;
export default orderSlice.reducer;
