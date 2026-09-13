import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {ProductList} from './features/products/components/ProductList';
import Box from '@mui/material/Box';
import './App.css';
import { NavBar } from './components/layout/Navbar';
import { AddProductForm } from './features/products/components/AddProductForm';
import { CartPage } from './features/Cart/pages/CartPage';
import { OrderPage } from './features/Orders/pages/OrderPage';
import { PaymentPage } from './features/Payment/pages/PaymentPage';
import { AuthPage } from './features/Auth/pages/AuthPage';
import { NotificationSlider } from './components/layout/NotificationSlider';

function App() {

  return (
    <Router>
      <Box sx={{ flexGrow: 1, p: 4, bgcolor: '#f8f9fa', minHeight: '100vh' }}>
        <NotificationSlider>
          <NavBar />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Routes>
              <Route path='/auth' element={<AuthPage/>} />
              <Route path="/products" element={<ProductList/>} />
              <Route path="/products/add" element={<AddProductForm/>} />
              <Route path="/cart" element={<CartPage/>} />
              <Route path="/orders" element={<OrderPage/>} />
              <Route path='/checkout' element={<PaymentPage/>} />
            </Routes>
          </Box>
        </NotificationSlider>
      </Box>
    </Router>
  )
}

export default App
