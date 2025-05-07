import React, { useEffect, useState } from 'react'
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link, matchPath } from 'react-router-dom'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import {NavbarLinks} from "../../data/navbar-links"
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaAngleDown } from "react-icons/fa";
import ProfileDropdown from '../Core/Auth/ProfileDropdown';
import { apiConnector } from '../../Services/apiConnector';
import { categories } from '../../Services/APIs';
import { ACCOUNT_TYPE } from '../../utils/constans';

const NavBar = () => {

  // const sublinks = [
  //     {
  //        title : "Python",
  //        link : "/catalog/Python"
  //     },
  //     {
  //       title : "Web-DevelopMent",
  //       link : "/catalog/Web-DevelopMent"
  //    }
  // ]

  // Inmporrt the thing From Reducers  
  const {token} = useSelector((state) => state.auth)
  const {user} = useSelector ((state) => state.profile)
  const {totalItems} = useSelector((state) => state.cart)

  const location = useLocation()

  const [sublinks, setsubLinks] = useState([])

  useEffect(() => {
      
    const fetchCategories = async() => {
        try{
            const result =  await apiConnector("GET" ,categories.CATEGORIES_API )
            setsubLinks(result.data.allCategorys)
            
        }
        catch(error) {
            console.log("Error While Fetching Categories" , error);
            
        }
    }

    fetchCategories();
  },[])


  


  const matchRoute = (route) => {
     return matchPath( {path : route} ,location.pathname )
  }
  
 
  
  



  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-richblack-700 '>
      <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
          
          {/* Image */}
          <Link to ="/">
                <img
                  src= {logo} 
                  width={160}
                  height={42}
                  loading='lazy'
                  alt='LOGO'
                />
          </Link>

          {/* {Navbar} */}
          <nav>
             <ul className='flex gap-x-6 text-richblack-500'>
                 {
                    NavbarLinks.map((link , index) => {
                        return <li key={index}>
                                    {
                                        link.title === "Catalog" ? (
                                          <div className=' relative flex gap-x-1 items-center group'>
                                              <p>{link.title}</p>
                                              <FaAngleDown />

                                              <div 
                                                className=' z-[1000] invisible absolute left-[-95%] top-[50%] opacity-0 translate-y-[50%] transition-all duration-200
                                                flex flex-col rounded-md bg-richblack-5 p-7 group-hover:visible group-hover:opacity-100 lg:w-[300px]'
                                              >

                                                    <div className=' absolute h-6 w-6 bg-richblack-5 rotate-45 left-[50%] top-0 translate-x-[-85%] translate-y-[-30%]'></div>
                                                        {
                                                          sublinks.length ? 
                                                             (
                                                                sublinks.map((sublink , index) => (
                                                                      <Link to={`${link.path}`} key={index}>
                                                                          <p>{sublink.name}</p>
                                                                      </Link>
                                                                ))
                                                             ) 
                                                            : (<h1>Hello</h1>) 
                                                            
                                                        }

                                              
                                              </div>      
                                          
                                          </div>


                                             
                                        ) : (
                                          <Link  to={link?.path}>
                                                <p className = {`${matchRoute(link?.path) ? ("text-yellow-25") : ("text-richblack-500") }`}>
                                                  {link.title}
                                                </p>
                                          </Link>
                                        ) 
                                    }
                              </li>
                    })
                  }
             </ul>
          </nav>

          {/* LOgin/Signup/DashBoard */}
          <div className='flex gap-x-3 items-center '>
                
                {
                  user && user?.accountType !==  ACCOUNT_TYPE.INSTRUCTOR && (
                    
                    <Link to={'/dashboard/cart'} className='relative'>
                      <AiOutlineShoppingCart  className="text-2xl text-richblack-100"  />
                        {
                          
                          totalItems > 0 && (
                            <span  className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                                {totalItems}
                            </span>
                          )
                       
                        }
                    </Link>
                  )
                }

                {
                  token === null && (
                    <Link to={'/login'}>
                        <button 
                            className='text-white  text-bold  border-[1px] border-richblack-800 rounded-lg
                          bg-richblack-800 px-[12px] py-[8px] hover:bg-richblack-500 transition-all duration-200 '>
                            Login 
                        </button>
                    </Link> 
                  ) 
                }

                {
                  token === null && (
                    <Link to={'/signup'}>
                        
                        <button 
                           className='text-white  text-bold  border-[1px] border-richblack-800 rounded-lg
                           bg-richblack-800 px-[12px] py-[8px] hover:bg-richblack-500 transition-all duration-200 '
                        >
                            SignUp 
                        </button>
                    </Link> 
                  ) 
                }

                {
                  token !== null && <ProfileDropdown/>
                }
          </div>

      </div>
    </div>
  )
}

export default NavBar
