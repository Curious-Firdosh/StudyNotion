import "./App.css";
import { Route , Routes } from "react-router-dom";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup"
import NavBar from "./Components/Common/NavBar";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import VerifyEmail from "./Pages/VerifyEmail";
import AboutPage from "./Pages/AboutPage";
import MyProfile  from "./Components/Core/Dashboard/MyProfile"
import DashBoard from "./Pages/DashBoard";
import Error from "./Pages/Error"
import PrivateRoute from "./Components/Core/Auth/PrivateRoute"
import EnrolledCourse from "./Components/Core/Dashboard/EnrolledCourse";
import ContactForm from "./Components/Core/AboutPage/ContactForm";
import Cart from "./Components/Core/Dashboard/Cart"
import OpenRoute from "./Components/Core/Auth/OpenRoute"
import { ACCOUNT_TYPE } from "./utils/constans";
import { useSelector } from "react-redux";
import Setting from "./Components/Core/Dashboard/Settings"


function App() {

    const {user} = useSelector((state) => state.profile)


  return (
     
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
        
        <NavBar/>
        
        <Routes>


           <Route path="/" element ={<Home/>}/>
           
           <Route path = "login"  
                    element= {
                        <OpenRoute >
                            <Login/>
                        </OpenRoute>
                    } />
           <Route path = "signup"  
                        element= {
                            <OpenRoute>
                                <Signup/>
                            </OpenRoute>
                        }/>

           <Route 
               path="forgot-password" 
               element ={
                    <OpenRoute>
                        <ForgotPassword/>
                    </OpenRoute>
               }
            />

            <Route
                path="update-password/:id" 
                element ={
                        <OpenRoute>
                            <ResetPassword/>
                        </OpenRoute>
                }
            />
            <Route
                path="verify-email" 
                element ={
                    <OpenRoute>
                        <VerifyEmail/>
                    </OpenRoute>
                }
            />

            <Route
                path="/about"
                element = {<AboutPage/>}
            />

            <Route
                path="/contact"
                element = {<ContactForm/>}
            />
            
            <Route
                element = {
                    <PrivateRoute>
                        <DashBoard/>
                    </PrivateRoute>
                 }
            >
                <Route path="/dashboard/my-profile" element = {<MyProfile/>}  />
                <Route path="/dashboard/settings" element = {<Setting/>} />
               
               {
                    user?.accountType === ACCOUNT_TYPE.STUDENT && (
                        <>
                            <Route path="/dashboard/cart" element = {<Cart/>}  />
                            
                            <Route path="/dashboard/enrolled-courses" element = {<EnrolledCourse/>}  />
                        </>
                    )
               }


                   
           

            </Route>



            <Route
                path="*"
                element = {<Error/>}
            />
            
        
         
        </Routes>
     </div>
  );
}

export default App;
