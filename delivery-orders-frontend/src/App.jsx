import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { CreateOrderPage } from './pages/CreateOrderPage/CreateOrderPage';
import { OrdersListPage } from './pages/OrdersListPage/OrdersListPage';
import { OrderDetailsPage } from './pages/OrderDetailsPage/OrderDetailsPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/orders/new" replace />} />
        <Route path="orders" element={<OrdersListPage />} />
        <Route path="orders/new" element={<CreateOrderPage />} />
        <Route path="orders/:orderId" element={<OrderDetailsPage />} />
        <Route path="*" element={<Navigate to="/orders" replace />} />
      </Route>
    </Routes>
  );
}
