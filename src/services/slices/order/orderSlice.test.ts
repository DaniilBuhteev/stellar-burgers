import { orderSlice, initialState } from './orderSlice';
import { getOrdersThunk } from './orderThunk';

describe('orderSlice', () => {
  it('test getOrdersThunk.pending', () => {
    const action = { type: getOrdersThunk.pending.type };
    const state = orderSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(true);
  });

  it('test getOrdersThunk.fulfilled', () => {
    const mockOrders = [
      {
        _id: '66bdd48d119d45001b4ffbff',
        ingredients: ['643d69a5c3f7b9001cfa093e', '643d69a5c3f7b9001cfa093d'],
        status: 'done',
        name: 'Флюоресцентный люминесцентный бургер',
        createdAt: '2024-08-15T10:12:29.082Z',
        updatedAt: '2024-08-15T10:12:29.635Z',
        number: 49719
      },
      {
        _id: '66bdd46a119d45001b4ffbfd',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa0940',
          '643d69a5c3f7b9001cfa0943'
        ],
        status: 'done',
        name: 'Space флюоресцентный метеоритный бургер',
        createdAt: '2024-08-15T10:11:54.614Z',
        updatedAt: '2024-08-15T10:11:55.175Z',
        number: 49718
      }
    ];

    const state = orderSlice.reducer(
      initialState,
      getOrdersThunk.fulfilled(mockOrders, '')
    );

    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(mockOrders);
  });

  it('test getOrdersThunk.rejected', () => {
    const state = orderSlice.reducer(
      initialState,
      getOrdersThunk.rejected({ name: '', message: 'error' }, '')
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toEqual('error');
  });
});
