import React from 'react'
import { useSelector } from 'react-redux'
import IconButton from '../../../Common/IconButton'

const RendertotalAmount = () => {
  const {total} = useSelector((state) => state.cart)

  const handleBuyCourse = () => {
      console.log("Payment Wala Route Main Jana Hai ");
      
  }
  
  return (
    <div>
      <p> Total : </p>
      <p>Rs {total}</p>

      <IconButton
        text={"Buy Know"}
        onclick={handleBuyCourse}
        customClasses={'w-full justify-center'}
      />
    </div>
  )
}

export default RendertotalAmount
