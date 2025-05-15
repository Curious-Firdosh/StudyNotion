import React, { useEffect, useState } from 'react'


const RequireMentField = ({name , label , watch, register , errors , setValue , getValues}) => {

    const [requirement , setRequirement] = useState("")
    const [requirementList , setRequirementList] = useState([])

    // We Want To Register Name IN First RENDER 

    useEffect(() => {
        register(name , { required : true , validate : (value) => value.length > 0  })
    } ,[register ,name])

    useEffect(() => {
        setValue(name , requirementList)
    }, [requirementList , name , setValue])

    const handlOnAdd = () => {
       if(requirement){
        setRequirementList([...requirementList ,requirement])
        setRequirement('')
       }
    }

    // useEffect(() => {
    //     const savedRequirement = watch(name)
    //         console.log(savedRequirement);
            
    //     if(savedRequirement && savedRequirement.length > 0 ){
    //         setRequirementList(savedRequirement)
    //     }
    // },[watch, name])

    const handleRemove = (index) => {
        const updateRequireMent = [...requirementList];
        updateRequireMent.splice(index , 1)
        setRequirementList(updateRequireMent)
    }

    
  return (
    <div>
        
        <label htmlFor = {name}> {label} <sup>*</sup></label>
        <div className='text-black'>
             <input
                placeholder='Enter Requirement'
                id={name}
                value={requirement}
                onChange={(e) => setRequirement(e.target.value)}
                className='w-full p-2 text-sm rounded-md'
                
             />

             <button
                type='button'
                className='bg-yellow-25 p-2 rounded-md mt-1 font-semibold text-black'
                onClick={() => handlOnAdd()}
             >
                Add
             </button>
        </div>

        {
            requirementList.length > 0 && (
                
                <ul>
                    {
                        requirementList.map((item , index) => 
                        (
                            <li key={index} className='flex items-center'>
                                <span>{item}</span>
                                <button 
                                    type='button'
                                    className='text-richblack-500  text-sm font-semibold'
                                    onClick={( )=> handleRemove(index)}
                                >
                                    Clear
                                </button>
                            </li>
                        ))
                    }
                </ul>
            )
        }

        {
            errors[name] && (
                <span>
                    {label} is Required
                </span>
            )
        }

    </div>
  )
}

export default RequireMentField
