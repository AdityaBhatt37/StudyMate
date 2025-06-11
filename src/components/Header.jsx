import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../Utils/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { removeAdminEmailAndPassword } from "../Utils/Redux/adminSlice";

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const userData = useSelector((appStore) => appStore?.user);
  const adminData = useSelector((appStore) => appStore?.admin?.adminEmailAndPassword);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    signOut(auth).then(() => {}).catch((error) => {});
  };

  const handleAdminLogin = () => {
    navigate("/adminlogin");
  };

  const handleAdminLogout = () => {
    navigate("/");
    dispatch(removeAdminEmailAndPassword());
  };

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-indigo-600">
          Study<span className="text-yellow-500">Mate</span>
        </div>

        {/* Desktop Nav Links */}
        {userData && (
          <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
            <Link to="/home" className="hover:text-indigo-600 transition">
              Home
            </Link>
            <Link to="/progress" className="hover:text-indigo-600 transition">
              Progress
            </Link>
            <Link to="/quiz" className="hover:text-indigo-600 transition">
              Quiz
            </Link>
            <Link to="/contact" className="hover:text-indigo-600 transition">
              Contact
            </Link>
          </nav>
        )}

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition"
            onClick={
              userData
                ? handleSignOut
                : adminData
                ? handleAdminLogout
                : handleAdminLogin
            }
          >
            {userData
              ? "LogOut"
              : adminData
              ? "Admin Logout"
              : "Admin Login"}
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden">
          <button
            className="text-gray-600 hover:text-indigo-600 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {isMobileMenuOpen && userData && (
        <div className="md:hidden bg-white px-4 pt-2 pb-4 space-y-2 shadow-md">
          <Link to="/home" className="block text-gray-700 hover:text-indigo-600">
            Home
          </Link>
          <Link to="/progress" className="block text-gray-700 hover:text-indigo-600">
            Progress
          </Link>
          <Link to="/quiz" className="block text-gray-700 hover:text-indigo-600">
            Quiz
          </Link>
          <a href="#contact" className="block text-gray-700 hover:text-indigo-600">
            Contact
          </a>
          <button
            className="w-full text-left mt-2 bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition"
            onClick={
              userData
                ? handleSignOut
                : adminData
                ? handleAdminLogout
                : handleAdminLogin
            }
          >
            {userData
              ? "LogOut"
              : adminData
              ? "Admin Logout"
              : "Admin Login"}
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
