import React from 'react'
import ContactusForm from '../../Common/ContactUs Page/ContactusForm'

const ContactForm = () => {
  return (
    <div className='mx-auto w-2/5 mb-[140px] mt-20 text-white font-inter'>
        <h1 className='font-semibold text-center text-[36px]'>Get In Touch</h1>
        <p className='text-base text-center  text-richblack-600 '>We’d love to here for you, Please fill out this form.</p>

        <div >
            <ContactusForm/>
        </div>
    </div>
  )
}

export default ContactForm
