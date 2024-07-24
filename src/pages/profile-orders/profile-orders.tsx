import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { selectOrderUser } from '../../services/slices/order/orderSlice';
import { getOrdersThunk } from '../../services/slices/order/orderThunk';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrdersThunk());
  }, [dispatch]);
  const orders: TOrder[] = useSelector(selectOrderUser);

  return <ProfileOrdersUI orders={orders} />;
};
