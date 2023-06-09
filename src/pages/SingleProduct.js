import {React, useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const img_Style = {
    "width":"270px",
    "height":"270px"
}

const SingleProduct = () => {

    const navigate = useNavigate()

    const [product , setProduct ] = useState({})
    const params = useParams()
    // console.log(params)


    useEffect(()=>{
        fetch(`/api/products/${params._id}`)
        .then(res => {
            const abc = res.json()
           return(abc)
        })
        .then(product => {
            // console.log(product)
            setProduct(product)
        })
    },[params._id])

  return (
    <div className='container mx-auto mt-12'>
        <button className='mb-12 font-bold' onClick={ () => { navigate(-1) } }>Back</button>
        <div className='flex'>
            {/* <img scr={ product.image } alt={ product.name } /> */}
            <img style={img_Style} src={product.image} alt={product.name} />
            <div className='ml-16'>
                <h1 className='text-xl font-bold'> {product.name} </h1>
                <div className='text-md'>{product.size}</div>
                <div className='font-bold mt-2'>₹{product.price}</div>
                <button className='bg-yellow-500 rounded-full py-1 px-8 mt-4 font-bold'>Add to cart</button>
            </div>
        </div>
    </div>
  )
}

export default SingleProduct
