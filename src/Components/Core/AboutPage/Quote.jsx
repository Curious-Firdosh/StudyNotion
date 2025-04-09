import React from 'react'
import HighlightText from '../HomePage/HighlightText'

const Quote = ({text}) => {
  return (
    <div>
        <header className='text-white lg:text-[28px]  text-center w-[70%] '>
            We are passionate about revolutionizing the way we learn.
            Our innovative platform 
            <HighlightText text={"combines technology"}/>,
            <span className='bg-gradient-to-r from-[#FF512F] to-[#F09819] bg-clip-text font-extrabold text-transparent'>
                {""} expertise
             </span>,
            and community to create an
            <span className='bg-gradient-to-r from-[#E65C00]  to-[#F9D423] bg-clip-text font-extrabold text-transparent'>{""} unparalleled educational experience.</span>
        </header>
        
    </div>
  )
}

export default Quote
