import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import SignUp from './pages/SignUp.jsx'
import { Provider } from 'react-redux'
import { store } from '../src/store/store.js'
import AdminPanel from './pages/AdminPanel.jsx'
import AllUsers from './pages/AllUsers.jsx'
import AllProducts from './pages/AllProducts.jsx'
import CategoryBooks from './pages/CategoryBooks.jsx'
import BookDetails from './pages/BookDetails.jsx'
import ViewCart from './pages/ViewCart.jsx'
import Search from './pages/Search.jsx'
import Success from './pages/Success.jsx'
import Cancel from './pages/Cancel.jsx'
import OrderPage from './pages/OrderPage.jsx'
import AllBooks from './pages/AllBooks.jsx'
import AboutUs from './pages/AboutUs.jsx'
import AdminOrder from './pages/AdminOrders.jsx'
import ViewFavs from './pages/ViewFavs.jsx'


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>

      <Routes>
        <Route path='/' element={<App />}>
          <Route path='' element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='catalog' element={<AllBooks />} />
          <Route path='about-us' element={<AboutUs />} />

          <Route path='forgot-passowrd' element={<ForgotPassword />} />
          <Route path='sign-up' element={<SignUp />} />

          <Route path='book-category/:categoryName' element={<CategoryBooks />} />
          <Route path='book/:id' element={<BookDetails />} />

          <Route path='search' element={<Search />} />
          <Route path='product-category' element={<CategoryBooks/>}/>

          <Route path='admin-panel' element={<AdminPanel />}>
            <Route path="all-users" element={<AllUsers />} />
            <Route path="all-products" element={<AllProducts />} />
          </Route>
          
        </Route>

        <Route path='cart' element={<ViewCart />} />
        <Route path='favorites' element={<ViewFavs />} />
        <Route path='success' element={<Success />} />
        <Route path='cancel' element={<Cancel />} />
        <Route path='order' element={<OrderPage />} />
        <Route path='adminOrders' element={<AdminOrder />} />


      </Routes>
    </BrowserRouter>
  </Provider>
)

