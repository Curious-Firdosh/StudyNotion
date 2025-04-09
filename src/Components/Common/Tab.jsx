import React from 'react'

const Tab = ({tabData ,field , setField }) => {
  return (
       <div 
          className='bg-richblack-800 flex p-1 my-6 rounded-full max-w-max gap-x-1'
          style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
        >
            {
               tabData.map((tab) => {
                 return <button
                           key={tab.id}
                           onClick={() => {
                              console.log("Selected Type: ", tab.type);
                              setField(tab.type)
                           }}
                           className={`${
                                field === tab.type
                                  ? "bg-richblack-900 text-richblack-5"
                                  : "bg-transparent text-richblack-200"
            } py-2 px-5 rounded-full transition-all duration-200`}
                         >
                          {tab?.tabName}
                        </button>
               })
            }
       </div>
  )
}

export default Tab
