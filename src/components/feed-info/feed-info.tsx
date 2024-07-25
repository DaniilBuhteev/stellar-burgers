import { FC, useDebugValue, useEffect } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { useDispatch, useSelector } from '../../services/store';
import { selectOrderUser } from '../../services/slices/order/orderSlice';
import {
  selectFeedsOrders,
  selectFeedsTotal,
  selectFeedsTotalToday
} from '../../services/slices/feed/feedSlice';
import { getFeedsThunk } from '../../services/slices/feed/feedThunk';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  /** TODO: взять переменные из стора */
  const orders: TOrder[] = useSelector(selectFeedsOrders);
  const total = useSelector(selectFeedsTotal);
  const totalToday = useSelector(selectFeedsTotalToday);
  const feed = { total, totalToday };

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
