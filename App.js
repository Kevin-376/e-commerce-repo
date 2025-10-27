import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import ErrorBoundary from './Components/ErrorBoundary';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import banner_mens from './Components/Assets/banner_mens.png';
import banner_women from './Components/Assets/banner_women.png';
import banner_kids from './Components/Assets/banner_kids.png';

const ShopCategory = lazy(() => import('./Pages/ShopCategory'));
const Cart = lazy(() => import('./Pages/Cart'));
const LoginSignup = lazy(() => import('./Pages/LoginSignup'));
const Product = lazy(() => import('./Pages/Product'));
const Shop = lazy(() => import('./Pages/shop'));
const Contact = lazy(() => import('./Pages/Contact'));

function App() {
  return (
    <ErrorBoundary>
      <div>
        <BrowserRouter>
          <Navbar/>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path='/' element={<LoginSignup/>}/>
              <Route path='/shop' element={<Shop/>}/>
              <Route path='/mens' element={<ShopCategory banner={banner_mens} category="men" />} />
              <Route path='/women' element={<ShopCategory banner={banner_women} category="women" />} />
              <Route path='/kids' element={<ShopCategory banner={banner_kids} category="kid" />} />
              <Route path='/product' element={<Product/>}/>
              <Route path='/product/:productId' element={<Product/>}/>
              <Route path='/cart' element={<Cart/>}/>
              <Route path='/login' element={<LoginSignup/>}/>
              <Route path='/contact' element={<Contact/>}/>
            </Routes>
          </Suspense>
          <Footer/>
        </BrowserRouter>
      </div>
    </ErrorBoundary>
  );
}

export default App;
