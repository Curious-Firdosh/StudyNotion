import { useSelector } from "react-redux"
import RenderCartCourses from "./RenderCartCourses"
import RendertotalAmount from "./RendertotalAmount"

export default function Cart () {

  const {totalItems} = useSelector((state) => state.cart)
  const {total} = useSelector((state) => state.cart)

  return (
    <div className=" text-white">
        <h1 className="text-white text-4xl ">Your Cart </h1>
        <p className="text-4xl">{totalItems} Course In Cart</p>
        {
          total > 0
          ? (<div>
                <RenderCartCourses/>
                <RendertotalAmount/>
           </div>)
          : (<p>Your Cart is Empty</p>)
        }
    </div>
  )
}
