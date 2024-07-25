import { getOrderByNumberApi, orderBurgerApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { clearConstructor } from '../constructor/constructorSlice';

export const orderModalThunk = createAsyncThunk(
  'orderModalData/fetchNewOrders',
  async (ingredientIds: string[], { dispatch }) => {
    const response = await orderBurgerApi(ingredientIds);
    dispatch(clearConstructor());
    return response;
  }
);

export const getOrderByNumberThunk = createAsyncThunk(
  'order/getOrdersByNumber',
  async (number: number) => {
    const response = await getOrderByNumberApi(number);
    return response;
  }
);
