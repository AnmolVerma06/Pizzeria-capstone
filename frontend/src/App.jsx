import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import OrderPizza from './pages/OrderPizza';
import BuildPizza from './pages/BuildPizza';
import CartPage from './pages/Cart';
import { fetchCart } from './store/cartSlice';

const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order-pizza" element={<OrderPizza />} />
          <Route path="/build-pizza" element={<BuildPizza />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const App = () => (
  <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <AppContent />
  </Router>
);

export default App;
