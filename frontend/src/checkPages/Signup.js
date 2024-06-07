import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import background from "../assets/background1.jpg";

const Signup = ({ setUser }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    phone_number: "",
    password: "",
    name: "",
    domains: [],
  });
  const [message, setMessage] = useState("");

 const handleChange = (e) => {
   const { name, value, type, checked } = e.target;
   if (type === "checkbox") {
     let updatedDomains = [...formData.domains];
     if (checked) {
       if (updatedDomains.length < 3) {
         updatedDomains.push(value);
       } else {
         toast.error("You can select up to 3 domains only");
       }
     } else {
       updatedDomains = updatedDomains.filter((domain) => domain !== value);
     }
     setFormData({
       ...formData,
       domains: updatedDomains,
     });
   } else {
     setFormData({
       ...formData,
       [name]: value,
     });
   }
 };


 const handleSubmit = async (e) => {
   e.preventDefault();

   if (formData.domains.length < 1 || formData.domains.length > 3) {
     toast.error("Please select between 1 and 3 domains");
     return;
   }

   try {
     const response = await axios.post(
       "http://localhost:4000/api/auth/signup",
       formData
     );
     console.log(formData);
     setMessage(response.data.message);
     toast.success(response.data.message);

     navigate("/home");
   } catch (error) {
     setMessage(error.response.data.error);
     toast.error(error.response.data.error);
   }
 };


  const handleGoLogin = () => {
    navigate("/login");
  };

  return (
    <div className="relative h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-md"
        style={{
          backgroundImage: `url(${background})`,
        }}
      ></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-700 bg-opacity-50 rounded-md p-8 w-11/12 sm:w-2/3 md:w-1/2 lg:w-2/5 h-auto">
        <h2 className="text-2xl font-bold text-center mb-6 text-white text-[43.89px] font-['Archivo'] leading-[65.83px]">
          Signup
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col sm:flex-row items-center">
            <div className="text-white w-full sm:w-52 text-[30.89px] font-normal font-['Ruda'] leading-[65.83px] px-6">
              Phone No :
            </div>
            <input
              type="text"
              name="phone_number"
              placeholder="Type here"
              value={formData.phone_number}
              onChange={handleChange}
              className="input input-ghost w-full max-w-xs border-solid border-b-2 border-b-gray-300 px-6"
            />
          </div>
          <div className="mb-4 flex flex-col sm:flex-row items-center">
            <div className="text-white w-full sm:w-52 text-[30.89px] font-normal font-['Ruda'] leading-[65.83px] px-6">
              Password :
            </div>
            <input
              type="password"
              name="password"
              placeholder="Type here"
              value={formData.password}
              onChange={handleChange}
              className="input input-ghost w-full max-w-xs border-solid border-b-2 border-b-gray-300 px-6"
            />
          </div>
          <div className="mb-4 flex flex-col sm:flex-row items-center">
            <div className="text-white w-full sm:w-52 text-[30.89px] font-normal font-['Ruda'] leading-[65.83px] px-6">
              Name :
            </div>
            <input
              type="text"
              name="name"
              placeholder="Type here"
              value={formData.name}
              onChange={handleChange}
              className="input input-ghost w-full max-w-xs border-solid border-b-2 border-b-gray-300 px-6"
            />
          </div>
          <div className="mb-4 flex flex-col text-white text-[30.89px] font-normal font-['Ruda'] leading-[65.83px] px-6">
            Domains:
            <div className="ml-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="domains"
                  value="DSA"
                  checked={formData.domains.includes("DSA")}
                  onChange={handleChange}
                />
                <span>DSA</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="domains"
                  value="AI-ML"
                  checked={formData.domains.includes("AI-ML")}
                  onChange={handleChange}
                />
                <span>AI-ML</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="domains"
                  value="Web Development"
                  checked={formData.domains.includes("Web Development")}
                  onChange={handleChange}
                />
                <span>Web Development</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="domains"
                  value="App Development"
                  checked={formData.domains.includes("App Development")}
                  onChange={handleChange}
                />
                <span>App Development</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="domains"
                  value="Design"
                  checked={formData.domains.includes("Design")}
                  onChange={handleChange}
                />
                <span>Design</span>
              </label>
            </div>
          </div>
          <button className="w-full sm:w-auto h-[44px] bg-amber-300 rounded-[35px] shadow border border-rose-50 mx-auto mt-6 text-black text-[25.89px] font-bold font-['Archivo']">
            Signup
          </button>
        </form>
        <div className="mt-6 text-center text-white">
          Already have an account?{" "}
          <button
            onClick={handleGoLogin}
            className="text-blue-400 hover:underline"
          >
            Login
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
