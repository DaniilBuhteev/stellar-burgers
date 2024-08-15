import rootReducer from './rootReducer';
import { RootState } from './store';
import { initialState as consctructorSliceInitialState } from '../services/slices/constructor/constructorSlice';
import { initialState as feedSliceInitialState } from '../services/slices/feed/feedSlice';
import { initialState as ingredientsSliceInitialState } from '../services/slices/ingredients/ingredientsSlice';
import { initialState as orderSliceInitialState } from '../services/slices/order/orderSlice';
import { initialState as orderModalSliceInitialState } from '../services/slices/orderModal/orderModalSlice';
import { initialState as userSliceInitialState } from '../services/slices/user/userSlice';

export const initialStateRootReducer = {
  feeds: feedSliceInitialState,
  ingredients: ingredientsSliceInitialState,
  user: userSliceInitialState,
  constructorBurger: consctructorSliceInitialState,
  order: orderSliceInitialState,
  orderModal: orderModalSliceInitialState
};

describe('rootReducer', () => {
  it('Проверка инициализации rootReducer', () => {
    const action = { type: '@@INIT' };
    const state: RootState = rootReducer(undefined, action);
    expect(state).toEqual(initialStateRootReducer);
  });
});
