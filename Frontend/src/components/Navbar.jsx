import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { setUserData } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import api from "../utils/api.js";
import { IoMdPerson } from "react-icons/io";

const Navbar = () => {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      await api.post("/api/auth/logout");
      dispatch(setUserData(null));
      toast.success("Logout successful");
      setOpen(false);
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full bg-white">
      <nav className="max-w-6xl mx-auto h-20 px-6 flex items-center justify-center gap-60">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Regium Innovations" className="w-11 h-11" />
          <span className="text-black font-semibold tracking-widest text-sm">
            REGIUM INNOVATIONS
          </span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-8 text-sm uppercase tracking-wide relative">

          {[
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
            { name: "Service", path: "/service" },
          ].map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `
                relative pb-1 text-black
                after:absolute after:left-0 after:-bottom-0.5
                after:h-px after:w-0 after:bg-black
                after:transition-all after:duration-300
                hover:after:w-full
                ${isActive ? "after:w-full" : ""}
              `
              }
            >
              {item.name}
            </NavLink>
          ))}

          {/* Auth Section */}
          {!userData ? (
            <Link
              to="/login"
              className="ml-4 px-4 py-1.5 border border-black rounded-full hover:bg-black hover:text-white transition"
            >
              Login
            </Link>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <IoMdPerson
                className="size-6 cursor-pointer rounded-full hover:bg-gray-200 p-1"
                onClick={() => setOpen((prev) => !prev)}
              />

              {/* Dropdown */}
              {open && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-md z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setOpen(false)}
                  >
                    My Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </nav>
    </header>
  );
};

export default Navbar;
