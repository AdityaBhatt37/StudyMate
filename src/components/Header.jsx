import React from "react";
import { useSelector } from "react-redux";
import { auth } from "../Utils/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { useDispatch } from "react-redux";
import { removeAdminEmailAndPassword } from "../Utils/Redux/adminSlice";

function Header() {
  const userData = useSelector((appStore) => appStore?.user);
  const adminData = useSelector ((appStore) => appStore?.admin?.adminEmailAndPassword);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {});
  };

  const handleAdminLogin = () => {
    navigate("/adminlogin");
  };

  const handleAdminLogout = () =>{

    navigate("/")
    dispatch(removeAdminEmailAndPassword());

  }

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-indigo-600">
          Study<span className="text-yellow-500">Mate</span>
        </div>

        {/* Nav Links */}
        {userData ? (
          <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
            <Link to="/home" className="hover:text-indigo-600 transition">
              Home
            </Link>
            <Link to="/progress" className="hover:text-indigo-600 transition">
              progress
            </Link>
            <Link to="/quiz" className="hover:text-indigo-600 transition">
              Quiz
            </Link>
            <a href="#contact" className="hover:text-indigo-600 transition">
              Contact
            </a>
          </nav>
        ) : null}

        {/* CTA Button */}

        <div className="hidden md:block">
          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition"
            onClick={userData ? (handleSignOut) :( (adminData) ? handleAdminLogout : handleAdminLogin)}
          >
            {userData ? ("LogOut") :( (adminData) ? "Admin Logout" : "Admin Login")}
          </button>
        </div>

        {/* Mobile Menu (optional) */}
        <div className="md:hidden">
          <button className="text-gray-600 hover:text-indigo-600">
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
