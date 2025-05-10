import React from 'react'
import { GiNinjaStar } from 'react-icons/gi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart } from '../../../../Slices/cartSlice'
import ReactStars from "react-rating-stars-component"

const RenderCartCourses = () => {

    const {cart} = useSelector((state) => state.cart)
    const dispatch = useDispatch()

    
  return (
    <div>
        {
            cart.map((course ,index) => (
                
                <div key={index}>
                     <div>
                        <img
                            src={course?.thumbNail}
                        />
                       <div>
                            <p>{course.courseName}</p>
                            <p>{course?.category?.name}</p>
                       </div>

                       <div>
                            <span></span>
                            <ReactStars
                              count ={5}
                              size = {20}
                              edit = {false}
                              activeColor = "#ffd700"
                              emptyIcon = {<GiNinjaStar/>}
                              fullIcon = {<GiNinjaStar/>}
                            />

                          <span>{course?.ratingAndReviews?.length} Rating</span>
                       </div>

                     </div>

                     <div> 
                        <button
                          onClick={() => dispatch(removeFromCart(course._id))}
                        >
                          <RiDeleteBin6Line/>
                         <span>Remove</span>
                        </button>

                        <p>RS {course?.price}</p>
                     </div>
                
                
                </div>

            ))
        }
    </div>
  )
}

export default RenderCartCourses
