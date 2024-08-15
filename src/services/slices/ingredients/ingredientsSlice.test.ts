import { error } from 'console';
import { ingredientsSlice, initialState } from './ingredientsSlice';
import { getIngredientsThunk } from './ingredientsThunk';

describe('ingredientsSlice', () => {
  it('test getIngredientsThunk.pending', () => {
    const action = { type: getIngredientsThunk.pending.type };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state.requestStatus).toBe('Loading');
    expect(state.ingredients).toEqual([]);
  });

  it('test getIngredientsThunk.fulfilled', () => {
    const mockIngredients = [
      {
        _id: '1',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        __v: 0
      },
      {
        _id: '2',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        __v: 0
      },
      {
        _id: '3',
        name: 'Филе Люминесцентного тетраодонтимформа',
        type: 'main',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/meat-03.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
        __v: 0
      }
    ];

    const state = ingredientsSlice.reducer(
      initialState,
      getIngredientsThunk.fulfilled(mockIngredients, '')
    );

    expect(state.requestStatus).toBe('Success');
    expect(state.ingredients).toEqual(mockIngredients);
  });

  it('test getIngredientsThunk.rejected', () => {
    const state = ingredientsSlice.reducer(
      initialState,
      getIngredientsThunk.rejected({ name: '', message: 'error' }, '')
    );

    expect(state.requestStatus).toBe('Failed');
    expect(state.error).toEqual('error');
  });
});
