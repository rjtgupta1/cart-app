import { React , useContext, useState} from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../CartContext'

const imgStyle = {
  "height":"179px",
  "width":"179px"
}


const Product = (props) => {
  const [isAdded,setIsAdded] = useState(false)
  const { Cart,setCart } = useContext(CartContext)
  const addToCart = (product) => {
  let _cart = {...Cart};  // Cloning the object using spread operater
  if(!_cart.items){
    _cart.items = {}
  }
  if(_cart.items[product._id]){
    _cart.items[product._id] += 1;
  }
  else{
    _cart.items[product._id] = 1;
  }
  if(!_cart.totalItems){
    _cart.totalItems = 0;
  }
  _cart.totalItems += 1;
  setCart(_cart)
  setIsAdded(true)
  setTimeout(()=>{ setIsAdded(false) },500)

  }
  return (
      <div>
      <Link to={`/products/${props.product._id}`}>
        <img style={ imgStyle } src={props.product.image} alt={props.product.name}></img>
        <div className='text-center'>
            <h2 className='text-lg font-bold py-2'> {props.product.name} </h2>
            <span className='bg-gray-200 py-1 rounded-full text-sm px-4'> {props.product.size} </span>
        </div>
      </Link>
        <div className='flex justify-between items-center mt-4'>
            <span>₹{props.product.price} </span>
            <button disabled={isAdded} onClick={ () => { addToCart(props.product) } } className={` ${ isAdded ? "bg-green-500" : "bg-yellow-500" } rounded-full px-4 text-white font-bold`}>Add{ isAdded ? 'ed' : '' }</button>
        </div>
    </div>
  )
}

export default Product