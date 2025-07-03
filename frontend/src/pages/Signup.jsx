import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
      const res = await axios.post("http://localhost:5000/api/auth/register",
        { name, email, password }
      );
      
      if(res.data.success){
        alert("Account created successfully.");
        navigate("/login");
      }
      console.log(res);
    }catch(err){
      console.log(err.message);
    }
    setName("");
    setEmail("");
    setPassword("");
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="border-hidden shadow-xl p-6 w-90 bg-white ">
        <h2 className="font-bold text-2xl mb-4">Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-1 text-gray-700">Name</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 rounded-sm border-2 border-gray-300"
              id="name"
              value={name}
              placeholder="Enter Name"
              autoComplete="name"
              onChange={(e)=>setName(e.target.value)} 
              required/>
          </div>
          <div className="mb-4">
            <label htmlFor="Email" className="block mb-1 text-gray-700">Email</label>
            <input
              type="email" 
              className="border-2 border-gray-300 w-full px-3 py-2 rounded-sm"
              id="Email"
              value={email} 
              placeholder="Enter your email"
              autoComplete="email"
              onChange={(e)=>setEmail(e.target.value)}
              required/>
          </div>
          <div className="mb-4">
            <label htmlFor="Password" className="block mb-1 text-gray-700">Create Password</label>
            <input 
              type="password" 
              className="border-2 border-gray-300 w-full px-3 py-2 rounded-sm"
              id="Password"
              value={password} 
              placeholder="Create your Password"
              onChange={(e)=>setPassword(e.target.value)}
              minLength={8}
              autoComplete="new-password"
              required/>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-3 py-2 rounded-sm hover:bg-blue-600 transition duration-200 cursor-pointer">
              Signup
          </button>
          <p className="mt-4 text-gray-600 text-center text-sm">
            Already Have an Account? <Link to="/login" className="text-blue-700 hover:underline">Login</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Signup
