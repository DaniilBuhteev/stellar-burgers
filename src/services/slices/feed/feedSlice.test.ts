import { SerializedError } from '@reduxjs/toolkit';
import { feedsSlice, FeedsState, initialState } from './feedSlice';
import { getFeedsThunk } from './feedThunk';

describe('feedSlice', () => {
  it('test getFeedsThunk.pending', () => {
    const action = { type: getFeedsThunk.pending.type };
    const state = feedsSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(true);
  });

  it('test getFeedsThunk.fulfilled', () => {
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
      ],
      total: 150,
      totalToday: 30,
      isLoading: false
    };

    const state = feedsSlice.reducer(
      initialState,
      getFeedsThunk.fulfilled(mockOrders, '')
    );
    expect(state.isLoading).toBe(mockOrders.isLoading);
    expect(state.orders).toEqual(mockOrders.orders);
    expect(state.total).toBe(mockOrders.total);
    expect(state.totalToday).toBe(mockOrders.totalToday);
  });

  it('test getFeedsThunk.rejected', () => {
    const state = feedsSlice.reducer(
      initialState,
      getFeedsThunk.rejected({ name: '', message: 'error' }, '')
    );
    expect(state.isLoading).toBe(false);
    expect(state.error).toEqual('error');
  });
});
