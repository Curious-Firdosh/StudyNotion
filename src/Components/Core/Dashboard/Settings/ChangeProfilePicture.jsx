import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import IconButton from '../../../Common/IconButton'
import CTAButton from '../../HomePage/CTAButton'

const ChangeProfilePicture = () => {
    const {user} = useSelector((state) => state.profile)

    const [defaultImage , SetDefaultImage] = useState(user?.Image)

  return (
    <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5">
        <div >
            {/* Image*/}
                <img
                    src={user?.Image}
                     alt= {`profile ${user?.firstName}`}
                    className="aspect-square w-[78px] rounded-full object-cover"
                /> 

                <div>
                    <p>Change Profile Picture</p>

                    <div>
                        <button
                            onClick={() =>SetDefaultImage(null)}
                        >Remove</button>
                        <button>Change</button>
                    </div>
                </div>

        </div>
    </div>
  )
}

export default ChangeProfilePicture
