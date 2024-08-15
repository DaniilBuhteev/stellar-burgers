import { FC, useMemo } from 'react';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { selectOrderRequest } from '../../services/slices/order/orderSlice';
import {
  clearOrderModal,
  selectModal
} from '../../services/slices/orderModal/orderModalSlice';
import { selectConstructor } from '../../services/slices/constructor/constructorSlice';
import { useNavigate } from 'react-router-dom';
import { selectUserIsCheck } from '../../services/slices/user/userSlice';
import { orderModalThunk } from '../../services/slices/orderModal/orderModalThunk';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const constructorItems = useSelector(selectConstructor);

  const orderRequest = useSelector(selectOrderRequest);

  const orderModalData = useSelector(selectModal);
  const userCheck = useSelector(selectUserIsCheck);
  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!userCheck) {
      navigate('/login');
      return;
    }
    dispatch(
      orderModalThunk([
        constructorItems.bun._id,
        ...constructorItems.ingredients.map(
          (ingredient: TIngredient) => ingredient._id
        ),
        constructorItems.bun._id
      ])
    );
  };

  const closeOrderModal = () => {
    dispatch(clearOrderModal());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
