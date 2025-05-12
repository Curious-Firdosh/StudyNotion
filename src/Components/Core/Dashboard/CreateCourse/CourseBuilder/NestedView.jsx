import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const NestedView = () => {

    const {course} = useSelector((state) => state.course)
    const {token} = useSelector((state) => state.auth)

    const dispatch = useDispatch()

    const [addSubsection, setaddSubsection] = useState(null)
    const [viewSubsection, setViewSubsection] = useState(null)
    const [editSubsection, seteditSubsection] = useState(null)

    const [confirmationModal , setConfirmationModal] = useState(null)

  return (
    <div>
        <div>
            {
                course?.courseContent
            }
        </div>
    </div>
  )
}

export default NestedView
