import React from 'react'

function HighlightText( {text}) {
  return (
     <span className=' font-extrabold bg-gradient-to-r from-[#1FA2FF] to-[#12D8FA] via-[#A6FFCB]  bg-clip-text text-transparent'>
            {" "}
        {text}
     </span>
  )
}

export default HighlightText
