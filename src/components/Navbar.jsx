import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold cursor-pointer">MyWebsite</div>

        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <ul
          className={`${
            menuOpen ? 'block' : 'hidden'
          } md:flex space-y-4 md:space-y-0 md:space-x-6 items-center mt-4 md:mt-0 transition-all duration-300`}
        >
          <li>
            <a href="#" className="hover:text-red-500 transition duration-200">Home</a>
          </li>
          <li>
            <a href="#" className="hover:text-red-200 transition duration-200">About</a>
          </li>
          <li>
            <a href="#" className="hover:text-red-200 transition duration-200">Services</a>
          </li>

          <li className="text-sm text-gray-200">
            {user?.name ?? 'Guest'}
          </li>

          {user && (
            <li>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition duration-200"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;