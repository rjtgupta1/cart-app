import React , { useState, useEffect} from 'react';
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Home from '../pages/Home';
import Products from '../pages/products'
import SingleProduct from '../pages/SingleProduct'
import cart from '../pages/cart';
import Navigation from './Navigation';
import { CartContext } from '../CartContext'

const App = () => {

  const [ Cart, setCart ] = useState(!window.localStorage.getItem('Cart') ? {} : JSON.parse(window.localStorage.getItem('Cart')) )

  useEffect(()=>{
    const Cart = window.localStorage.getItem('Cart')
    // console.log(JSON.parse(Cart))
    setCart(JSON.parse(Cart))
  },[])

  useEffect(()=>{
    window.localStorage.setItem('Cart',JSON.stringify(Cart))
  },[Cart])

  return (
    <>
      <Router>
        <CartContext.Provider value={{ Cart,setCart }}>
          <Navigation />
          <Routes>
            <Route path='/' Component={Home}></Route>
            <Route path='/Products' Component={Products}></Route>
            <Route path='/Products/:_id' Component={SingleProduct}></Route>
            <Route path='/cart' Component={cart}></Route>
          </Routes>
          </CartContext.Provider>
      </Router>
    </>
  )
}

export default App
