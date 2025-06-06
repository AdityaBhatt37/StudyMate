import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch} from "react-redux";
import {addAdminEmailAndPassword,removeAdminEmailAndPassword} from "../Utils/Redux/adminSlice";

// Predefined Admin Credentials
const ADMIN_USERS = [
  { email: "admin1@example.com", password: "admin123" },
  { email: "admin2@example.com", password: "admin456" }
];

const AdminLogin = () => {
  const email = useRef(null);
  const password = useRef(null);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = () => {
    const enteredEmail = email.current.value.trim();
    const enteredPassword = password.current.value.trim();

    const matchedAdmin = ADMIN_USERS.find(
      (admin) =>
        admin.email.toLowerCase() === enteredEmail.toLowerCase() &&
        admin.password === enteredPassword
    );

    if (matchedAdmin) {
      localStorage.setItem("isAdmin", "true");
      dispatch(addAdminEmailAndPassword({email:email.current.value,password:password.current.value}));
      navigate("/admin"); // Redirect to admin panel
    } else {
      setErrorMsg("❌ Invalid admin credentials!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 pt-20">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          Welcome to <span className="text-yellow-500">StudyMate Admin Panel</span>
        </h2>

        <div className="mb-4">
          <input
            ref={email}
            type="email"
            placeholder="Admin Email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-6">
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errorMsg && <p className="text-red-500 mt-2">{errorMsg}</p>}
        </div>

        <button
          onClick={handleLogin }
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
        >
          Admin Sign In
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
