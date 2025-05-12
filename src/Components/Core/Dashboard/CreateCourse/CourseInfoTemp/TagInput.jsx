import React, { useEffect, useState } from 'react'

import { RxCross2 } from "react-icons/rx";

const TagInput = ({label , name, placeholder ,register , setValue , getValues }) => {


  const [tags , setTags] = useState([])
  const [inputValue , setInputValue] = useState('')




  useEffect(() => {
      setValue(name ,tags )
  },[tags])

  useEffect(() => {
     register(name , { required : true , validate : (value) => value.length > 0  }) 
  })

  const handleOnKeyDown = (e) => {

    if(e.key === "Enter" && inputValue.trim() !== '' ) {
      e.preventDefault();
      if(!tags.includes(inputValue.trim())){
           setTags([...tags,inputValue.trim()])
           setInputValue('')
      }
    }
  }

  const handleOnRemove = (index) => {
    const updatedTags = [...tags]
    updatedTags.splice(index , 1)
    setTags(updatedTags)
  }

  


  return (
    <div>

        <div>

             {
              tags.length > 0 && (

                <div 
                    className='flex flex-wrap items-center mb-3 mt-3 gap-3'
                >
                    {
                      tags.map((tag , index) => (
                        <div
                          key={index}
                          className=' rounded-xl flex items-center bg-yellow-200 text-richblack-900 w-fit px-3 py-1'
                        >
                            <span>{tag}</span>
                            <RxCross2 onClick={() => handleOnRemove(index)}/>

                        </div>
                      ))
                    }
                </div>
              )
            }



            <label htmlFor={name}> {label} <sup>*</sup></label>
            <input
              placeholder="Type and press Enter"
              id={name}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className='w-full text-black'
              onKeyDown={handleOnKeyDown}
            />


           
        </div>
    </div>
  )
}

export default TagInput
