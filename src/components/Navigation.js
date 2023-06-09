import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import { CartContext } from '../CartContext'

const Navigation = () => {
    const cartStyle = {
        background:'#F59E0D',
        display:'flex',
        padding:'6px 12px',
        borderRadius: '50px'
    }

    const { Cart } = useContext(CartContext);
    // console.log(Cart.totalItems);
  return (
    <>
      <nav className='container mx-auto flex justify-between items-center py-4'>
            <Link to="/">
                <img style={{height:45}} src='/images/logo.png' alt="logo" className='logo'></img>
            </Link>
            <ul className='flex items-center'>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li className='m-5'>
                    <Link to="/Products">Products</Link>
                </li>
                <li>
                    <Link to="/cart">
                        <div style={cartStyle}>
                            <span>{ !Cart.totalItems ? 0 : Cart.totalItems }</span>
                            <img className='ml-2' src="/images/cart.png" alt="cart-logo"></img>
                        </div>
                    </Link>
                </li>
            </ul>
        </nav>
    </>
  )
}

export default Navigation
