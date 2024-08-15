import { orderModalSlice, initialState } from './orderModalSlice';
import { orderModalThunk, getOrderByNumberThunk } from './orderModalThunk';

describe('orderModalSlice', () => {
  it('test orderModalThunk.pending', () => {
    const action = {
      type: orderModalThunk.pending.type
    };
    const state = orderModalSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(true);
  });

  const mockOrders = {
    success: true,
    orders: [
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
    ]
  };

  it('test orderModalThunk.fulfilled', () => {
    const mockNewOrder = {
      order: mockOrders.orders[0],
      name: '',
      success: true
    };
    const state = orderModalSlice.reducer(
      initialState,
      orderModalThunk.fulfilled(mockNewOrder, '', [])
    );

    expect(state.isLoading).toBe(false);
    expect(state.order).toEqual(mockOrders.orders[0]);
  });

  it('test orderModalThunk.rejected', () => {
    const state = orderModalSlice.reducer(
      initialState,
      orderModalThunk.rejected(
        {
          name: '',
          message: 'error'
        },
        '',
        []
      )
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toEqual('error');
  });

  it('test getOrderByNumberThunk.pending', () => {
    const action = {
      type: getOrderByNumberThunk.pending.type
    };
    const state = orderModalSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(true);
  });

  it('test getOrderByNumberThunk.fulfilled', () => {
    const state = orderModalSlice.reducer(
      initialState,
      getOrderByNumberThunk.fulfilled(mockOrders, '', 0)
    );

    expect(state.isLoading).toBe(false);
    expect(state.order).toEqual(mockOrders.orders[0]);
  });

  it('test getOrderByNumberThunk.rejected', () => {
    const state = orderModalSlice.reducer(
      initialState,
      getOrderByNumberThunk.rejected(
        {
          name: '',
          message: 'error'
        },
        '',
        0
      )
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toEqual('error');
  });
});
