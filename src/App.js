import './App.css';
import { useEffect, useState } from 'react';
import Header from "./component/layout/Header/Header.js";
import Footer from './component/layout/Footer/Footer.js';
import Home from "./component/Home/Home.js"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WebFont from "webfontloader"
import React from "react";
import Productdetails from './component/Product/Productdetails.js';
import Products from "./component/Product/Products.js"
import Search from './component/Product/Search';
import LoginSignUp from './component/User/LoginSignUp.js';
import store from "./store.js"
import { loadUser } from './actions/useractions';
import { useSelector } from 'react-redux';
import UserOptions from "./component/layout/Header/UserOptions.js"
import ProtectedRoute from "./component/Route/ProtectedRoute";
import Profile from "./component/User/Profile.js"
import UpdateProfile from './component/User/UpdateProfile';
import UpdatePassword from './component/User/UpdatePassword';
import ForgotPassword from './component/User/ForgotPassword.js';
import ResetPassword from "./component/User/ResetPassword.js"
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js"
import ConfirmOrder from './component/Cart/ConfirmOrder';
import Payment from "./component/Cart/Payment.js"
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess.js"
import MyOrders from './component/Order/MyOrders';
import OrderDetails from "./component/Order/OrderDetails.js"
import axios from 'axios';
import Dashboard from "./component/admin/Dashboard"
import ProductList from "./component/admin/ProductList.js"
import NewProduct from './component/admin/NewProduct';
import UpdateProduct from './component/admin/UpdateProduct';
import OrderList from './component/admin/OrderList';
import ProcessOrder from './component/admin/ProcessOrder';
import UsersList from './component/admin/UsersList';
import UpdateUser from './component/admin/UpdateUser';
import ProductReviews from './component/admin/ProductReviews';
import About from './component/layout/About/About';
import Contact from './component/layout/Contact/Contact';
import BackToLogin from "./component/User/BackToLogin.js"

// function Home() {
//   return (
//     <div>
//       <p>Hi</p>
//     </div>
//   )

// }

function App() {

  const { isAuthenticated, user } = useSelector((state) => state.user)
  let role = ""
  if (user) {
    role = user.role
  }


  const [stripeapikey, setStripeapikey] = useState("")

  //const loggedIn = window.localStorage.getItem("isLoggedIn")

  async function getstripeapikey() {
    const { data } = await axios.get("/api/v1/stripeapikey")

    setStripeapikey(data.stripeApiKey)
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });


    //store.dispatch(loadUser());


    // console.log(Object.keys(user).length)
    getstripeapikey()
  }, [])

  window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}



      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/product/:id" element={<Productdetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/products/:keyword" element={<Products />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/login" element={<LoginSignUp />} />
        <Route exact path="/account" element={isAuthenticated ? <Profile /> : <BackToLogin />} />
        <Route exact path="/me/update" element={isAuthenticated ? <UpdateProfile /> : <BackToLogin />} />
        <Route exact path="/password/update" element={isAuthenticated ? <UpdatePassword /> : <BackToLogin />} />
        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route exact path="/password/reset/:token" element={<ResetPassword />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/login/shipping" element={isAuthenticated ? <Shipping /> : <BackToLogin />} />
        <Route exact path="/order/confirm" element={isAuthenticated ? <ConfirmOrder /> : <BackToLogin />} />
        {stripeapikey && (
          <Route
            exact path="/order/payment"
            element={(
              <Elements stripe={loadStripe(stripeapikey)}>
                <Payment />
              </Elements>
            )}
          />
        )}

        <Route exact path="/success" element={isAuthenticated ? <OrderSuccess /> : <BackToLogin />} />
        <Route exact path="/orders" element={isAuthenticated ? <MyOrders /> : <BackToLogin />} />
        <Route exact path="/order/:id" element={isAuthenticated ? <OrderDetails /> : <BackToLogin />} />
        <Route excat path="/admin/dashboard" element={isAuthenticated && role === "admin" ? <Dashboard /> : <BackToLogin />} />
        <Route excat path="/admin/products" element={isAuthenticated && role === "admin" ? <ProductList /> : <BackToLogin />} />
        <Route excat path="/admin/product" element={isAuthenticated && role === "admin" ? <NewProduct /> : <BackToLogin />} />
        <Route excat path="/admin/product/:id" element={isAuthenticated && role === "admin" ? <UpdateProduct /> : <BackToLogin />} />
        <Route excat path="/admin/orders" element={isAuthenticated && role === "admin" ? <OrderList /> : <BackToLogin />} />
        <Route excat path="/admin/order/:id" element={isAuthenticated && role === "admin" ? <ProcessOrder /> : <BackToLogin />} />
        <Route excat path="/admin/users" element={isAuthenticated && role === "admin" ? <UsersList /> : <BackToLogin />} />
        <Route excat path="/admin/user/:id" element={isAuthenticated && role === "admin" ? <UpdateUser /> : <BackToLogin />} />
        <Route excat path="/admin/reviews" element={isAuthenticated && role === "admin" ? <ProductReviews /> : <BackToLogin />} />
      </Routes>

      <Footer />
    </Router >
  )
}

export default App;
