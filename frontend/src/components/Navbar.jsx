import { Link } from 'react-router-dom';
import { useAuth } from '../context/ContextProvider';

const Navbar = ({ setQuery }) => {

  const handleLogout = () => {
    
    login(null);
    localStorage.removeItem("token");
    location.reload();

  }


  const {user, login} = useAuth();

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="text-xl font-bold">
        <Link to="/">NoteApp</Link>
      </div>

      <input 
        type="text"
        placeholder="Search"
        className="w-1/3 border-1 px-4 py-2 rounded-sm bg-gray-600"
        onChange={(e) => setQuery(e.target.value)}
      />

      <div>

        {(!user) ? (
          <>
            <Link to="/login" className="px-4 py-2 rounded-sm mr-4 bg-blue-500 hover:bg-blue-600 tansition duration-200">Login</Link>
            <Link to="/signup" className="px-4 py-2 rounded-sm mr-4 bg-green-500 hover:bg-green-600 transition duration-200">Signup</Link>
          </>
        ):(
          <>
            <span className="mr-4">{user.name}</span>
            <button onClick={handleLogout} className="px-4 py-2 rounded-sm bg-red-500 hover:bg-red-600 transition duration-200 cursor-pointer">
              Logout
            </button>
          </>
        )}
        
      </div>
    </nav>
  )
}

export default Navbar;
