import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Nav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Transactions', path: '/transactions' },
  ];

  return (
    <nav className="bg-[#0B1E3A] text-white fixed w-full z-10 shadow-md">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold flex items-center">
          <span className="text-white">Investment</span>
          <span className="text-blue-500 ml-1">Tool</span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 items-center text-lg">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`transition-all transform hover:scale-110 ${
                  location.pathname === item.path
                    ? 'text-blue-400 underline underline-offset-4'
                    : 'hover:text-blue-400'
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Hamburger Icon for Mobile */}
        <button onClick={toggleMenu} className="text-2xl md:hidden focus:outline-none">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <ul className="flex flex-col md:hidden absolute top-full left-0 w-full bg-[#0B1E3A] border-t border-gray-700">
            {navItems.map((item) => (
              <li key={item.name} className="border-b border-gray-700">
                <Link
                  to={item.path}
                  onClick={toggleMenu}
                  className={`flex items-center py-4 px-6 ${
                    location.pathname === item.path ? 'bg-gray-800' : ''
                  } hover:bg-gray-700 transition-all`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Nav;
