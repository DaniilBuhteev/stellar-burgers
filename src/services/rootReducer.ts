import { combineReducers } from 'redux';
import { feedsSlice } from './slices/feed/feedSlice';
import { ingredientsSlice } from './slices/ingredients/ingredientsSlice';
import { userSlice } from './slices/user/userSlice';
import { constructorSlice } from './slices/constructor/constructorSlice';
import { orderSlice } from './slices/order/orderSlice';
import { orderModalSlice } from './slices/orderModal/orderModalSlice';
import { combineSlices } from '@reduxjs/toolkit';

const rootReducer = combineSlices(
  feedsSlice,
  ingredientsSlice,
  userSlice,
  constructorSlice,
  orderSlice,
  orderModalSlice
);
// Заменить на импорт настоящего редьюсера

export default rootReducer;
