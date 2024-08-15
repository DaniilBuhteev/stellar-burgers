import { getOrdersApi } from '../../../utils/burger-api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getOrdersThunk = createAsyncThunk('order/getOrders', async () => {
  const response = await getOrdersApi();
  return response;
});
