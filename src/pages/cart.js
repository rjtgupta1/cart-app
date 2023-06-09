import { React, useContext, useEffect, useState} from 'react'
import { CartContext } from '../CartContext'

const Cart = () => {
  const { Cart , setCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  let total = 0;
  useEffect(()=>{
    if(!Cart.items){
      return;
    }
    fetch('/api/products/cart-items',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({ids:Object.keys(Cart.items)})
    })
    .then( res => {
      return res.json()
    })
    .then( products => {
      setProducts(products);
      // console.log(products.name)
    })
  },[Cart])

  const getQTY = (productId)=>{
    return Cart.items[productId]
  }

  const _cart = {...Cart}
  const increment = (product)=>{
    // console.log(_cart.items[product._id])
    _cart.items[product._id] += 1;
    _cart.totalItems += 1;
    setCart(_cart)
  }

  const decrement = (product)=>{

    if(_cart.items[product._id] === 1){
      return;
    }
    // console.log(_cart.items[product._id])
    _cart.items[product._id] -= 1;
    _cart.totalItems -= 1;
    setCart(_cart)
  }
  const getSum = (id,price)=>{
    const sum = price*getQTY(id)
    total += sum;
    return sum;
  }
  const ordered = ()=>{
    alert('Order Successful');
    window.localStorage.clear()
    setProducts([])
    setCart({})
  }
  const deleted = (productId)=>{
    const qty = getQTY(productId);
    let _cart = {...Cart}
    delete _cart.items[productId]
    _cart.totalItems -= qty;
    if(!_cart.totalItems){
      _cart = {}
    }
    setCart(_cart)
    setProducts( products.filter( (product) => product._id !== productId) )
    // alert('deleted')
  }

  return (
    Cart.items ?
    <div className='container mx-auto lg:w-1/2 w-full pb-24'>
        <h1 className='my-12 font-bold'>Cart items</h1>
        <ul>
        {
          products.map(product => 
          {
            return(
              <li className='mb-12'>
            <div>
              <div className='flex items-center'>
                <img className="h-16" src={product.image} alt='item-img'></img>
                <span className='font-bold ml-4 w-48'>{product.name}</span>
                <div>
                  <button onClick={ ()=>{ decrement(product) } } className='bg-yellow-500 font-bold text-white rounded-full w-8'>-</button>
                  <span className='font-bold px-4'>{ getQTY(product._id) }</span>
                  <button onClick={ ()=>{ increment(product) } } className='bg-yellow-500 font-bold text-white rounded-full w-8'>+</button>
                </div>
                <span className='font-bold ml-20'>₹{ getSum(product._id,product.price) }</span>
                <button onClick={ ()=> deleted(product._id) } className='bg-red-500 font-bold text-white rounded-full ml-20 w-20'>Delete</button>
              </div>
            </div>
          </li>
            )}
          )
        }
        </ul>
        <hr />
        <div className='text-right my-6'>
          <span> <b>Grand Total : </b>₹{ total }</span>
        </div>
        <div className='text-right'>
          <button onClick={ ordered } className='bg-yellow-500 text-right rounded-full px-4 py-2 font-bold text-white'>Order Now</button>
        </div>
    </div>
    : <img className='mx-auto w-1/2' src='/images/empty-cart.png' alt='empty-img'></img>
  )
}

export default Cart
