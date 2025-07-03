import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/ContextProvider';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {login} = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login",
        { email, password }
      );
      if(res.data.success){
        alert("Login Successful.");
        login(res.data.user);
        localStorage.setItem("token", res.data.token);
        setEmail("");
        setPassword("");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Error logging in.");
    }


  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="border-hidden shadow-xl p-6 w-90 bg-white">
        <h2 className="font-bold text-2xl mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 text-gray-700">Email</label>
            <input 
              id="email"
              type="email"
              className="w-full px-3 py-2 rounded-sm border-2 border-gray-300"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block mb-1 text-gray-700">Password</label>
            <input
              id="password" 
              type="password"
              className="w-full px-3 py-2 rounded-sm border-2 border-gray-300"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-3 py-2 rounded-sm hover:bg-blue-600 transition duration-200 cursor-pointer"
          >
            Login</button>

          <p
            className="mt-4 text-gray-600 text-center text-sm"
          >
            Don't Have an Account? <Link to="/signup" className="text-blue-700 hover:underline">Register</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Login
