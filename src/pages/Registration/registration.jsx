import {useForm} from "react-hook-form" 
import *as yup from "yup" 
import {yupResolver}from "@hookform/resolvers/yup" 
import useTheme from '../../app/theme/theme-context';
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosRequest from "../../api/axiosRequest";
import { Link, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import google from '../../app/assets/google.png'
import { Eye, EyeOff } from "lucide-react";

function Registration() {
    const {theme}=useTheme();
    const schema=yup.object().shape({
        userName:yup.string().min(6).required(), 
        email:yup.string().email().required().test(value=>value&&value.split("@")[0].length>=7), 
        password:yup.string().required().min(4).matches(/^(?=.*[A-Za-z])(?=.*\d).+$/,"password must consist of letters and numbers."),
        phoneNumber:yup.string().required("Phone number is required").matches(/^\d{9}$/, "Phone number must be exactly 9 digits")
     }) 
     const {register,handleSubmit,formState:{errors},watch}=useForm({
        resolver:yupResolver(schema)
     })
     const password=watch("password","") 
     const phoneValue = watch("phoneNumber", "")
     const [showPassword, setShowPassword] = useState(false);
     const [loading,setLoading]=useState(false) 
     
     const navigate=useNavigate() 
     const token=localStorage.getItem("token")  

     useEffect(()=>{ 
        if(token){ 
            navigate("/") 
        } },[navigate]) 

     async function CreateAccount(user){
        setLoading(true)

        try {
            const {data}=await axiosRequest.post(`/Account/registration`,{
                userName:user.userName,
                email: user.email,
                password: user.password,
                phoneNumber: user.phoneNumber,
            })
            
            if(data?.message) {
                toast.success("Account created");
                navigate("/sign-in")
            } else{
                toast.error("Invalid response from server.")
            }
        } catch (error) {
            console.error("Login error:",error.message); 
            toast.error(error.message) 
        } finally {
            setLoading(false)
        }
     }   

    return (
        <div className={`max-h-screen pt-[58px] pb-[58px] flex items-center justify-center ${theme ? "bg-gray-900" : "bg-gray-100"}`}>
            <Box className={`w-full max-w-md rounded-2xl shadow-lg p-8 ${theme ? "bg-gray-800" : "bg-white"}`}>
                <h1 className={`text-2xl font-bold ${theme ? "text-white" : "text-gray-900"}`}>Create an account</h1>
                <p className={`${theme ? "text-gray-400" : "text-gray-500"} text-sm mt-2`}>Enter your details below</p>

                <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit(CreateAccount)}>
                    <input
                        type="text"
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none ${theme ? "border-gray-600 bg-gray-700 placeholder-gray-400 text-gray-100" : "border-gray-300 bg-white placeholder-gray-500 text-gray-900"}`}
                        placeholder="UserName"
                        {...register("userName")}
                    />
                    {errors.userName&&(
                        <p className="text-red-500">{errors.userName.message}</p>
                    )}

                    <input
                        {...register("email")}
                        type="email"
                        placeholder="Email or phone number"
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none ${theme ? "border-gray-600 bg-gray-700 placeholder-gray-400 text-gray-100" : "border-gray-300 bg-white placeholder-gray-500 text-gray-900"}`}
                    />
                    {errors.email && (
                        <p className="text-red-500">{errors.email.message}</p>
                    )}
                    
                    <Box className="relative flex items-center">
                        <span className={`absolute left-3 top-2.5 text-[15px] font-sans select-none ${theme?`text-gray-400`:"text-gray-500"}`}>+992</span>
                        <input
                            type="tel"
                            maxLength={9}
                            className={`w-full pl-14 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none ${theme ? "border-gray-600 bg-gray-700 placeholder-gray-400 text-gray-100" : "border-gray-300 bg-white placeholder-gray-500 text-gray-900"}`}
                            {...register("phoneNumber")}
                            onInput={e =>e.target.value=e.target.value.replace(/\D/g,"")}
                        />
                    </Box>
                    <Box className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none ${theme ? "border-gray-600 bg-gray-700 placeholder-gray-400 text-gray-100" : "border-gray-300 bg-white placeholder-gray-500 text-gray-900"}`}
                            {...register("password")}
                        />
                        {password&&(
                          <button type="button" onClick={() => setShowPassword(!showPassword)} className={`absolute inset-y-0 right-3 flex items-center cursor-pointer ${theme ? "text-gray-300" : "text-gray-500"}`}>
                            {showPassword ?(
                                <EyeOff size={18} /> 
                            ) :(
                                <Eye size={18} />
                            ) 
                            }
                          </button>
                        )}
                    </Box>
                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}

                    <button type="submit" disabled={loading} className="w-full bg-red-500 text-white font-medium py-2 rounded-lg hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed">Create Account</button>

                    <div className="flex items-center gap-2 my-4">
                       <hr className={`flex-grow ${theme ? "border-gray-400" : "border-gray-300"}`} />
                       <span className={`${theme ? "text-gray-500" : "text-gray-400"} text-sm`}>or</span>
                       <hr className={`flex-grow ${theme ? "border-gray-400" : "border-gray-300"}`} />
                    </div>

                    <button type="button" className={`w-full flex items-center justify-center gap-4 py-2 rounded-lg transition border ${theme ? "border-gray-600 text-gray-200 bg-gray-700 hover:bg-gray-600" : "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"}`}>
                        <img src={google} alt="Google" className="w-5 h-5" />
                        <span>Sign up with Google</span>
                    </button>
                </form>

                 <p className={`text-center text-sm mt-6 flex justify-center gap-2 flex-wrap ${theme ? "text-gray-600" : "text-gray-400"}`}>
                    Already have an account?
                    <Link to="/sign-in" className="text-red-500 hover:underline font-medium">
                        Log in
                    </Link>
                 </p>
            </Box>
        </div>
    )
}

export default Registration
