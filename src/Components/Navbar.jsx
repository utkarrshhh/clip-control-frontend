import React, { useContext, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../Context/LoginContext";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const token2 = localStorage.getItem("token");

  const handleLogout = (e) => {
    e.preventDefault();
    Object.keys(localStorage).forEach((key) => {
      localStorage.removeItem(key);
    });
    window.location.href = "/";
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      !buttonRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: "-50vh" }}
        animate={{ y: 0 }}
        transition={{
          delay: 0,
          duration: 1.5,
          type: "spring",
          stiffness: 120,
        }}
        className="sticky top-0 z-10 bg-gray-900 text-white px-4 py-3 md:px-6 md:py-4"
      >
        <div className="mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 10l4.553-2.276C18.31 7.904 18 7.141 17.346 6.654L12 2.004l-5.346 4.65A7.024 7.024 0 0112 12c0 1.12.347 2.19.968 3.074L12 17.996l5.346-4.65A7.024 7.024 0 0112 12z"
              />
            </motion.svg>
            <span className="font-bold text-lg">ClipControl</span>
          </Link>
          <motion.div
            initial={{ x: "70vw" }}
            animate={{ x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="hidden md:flex space-x-6"
          >
            <Link to="/explore" className="hover:text-gray-400">
              Explore
            </Link>
            <Link to="/trending" className="hover:text-gray-400">
              Trending
            </Link>
            <Link to="/upload" className="hover:text-gray-400">
              Upload
            </Link>
            {token2 && (
              <Link to="/dashboard" className="hover:text-gray-400">
                Dashboard
              </Link>
            )}
          </motion.div>
          <div className="md:hidden flex items-center">
            <button
              ref={buttonRef}
              onClick={handleToggle}
              className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded mr-4"
            >
              ☰
            </button>
          </div>
          <motion.div
            initial={{ x: "90vw" }}
            animate={{ x: 0 }}
            transition={{
              delay: 1,
              duration: 0.5,
              type: "spring",
              stiffness: 70,
            }}
            className="flex space-x-4"
          >
            {!token2 ? (
              <>
                <Link to="/signIn">
                  <motion.button
                    whileHover={{
                      boxShadow: "0 0 8px rgba(59,130,246)",
                      scale: 1.1,
                      origin: 0,
                    }}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded"
                  >
                    Sign In
                  </motion.button>
                </Link>
                <Link to="/signUp">
                  <motion.button
                    whileHover={{
                      boxShadow: "0 0 8px rgba(59,130,246)",
                      scale: 1.1,
                      origin: 0,
                    }}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded"
                  >
                    Sign Up
                  </motion.button>
                </Link>
              </>
            ) : (
              <motion.button
                whileHover={{
                  boxShadow: "0 0 8px rgba(59,130,246)",
                  scale: 1.1,
                  origin: 0,
                }}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleLogout}
              >
                Logout
              </motion.button>
            )}
          </motion.div>
        </div>
        {isOpen && (
          <motion.div
            ref={menuRef}
            initial={{ y: "-20%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-20%", opacity: 0 }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
            className="border-white absolute top-full left-0 w-full bg-gray-900 text-white flex flex-col items-center justify-between space-y-4 py-2 z-10"
          >
            <Link
              to="/explore"
              className="hover:text-gray-400"
              onClick={() => setIsOpen(false)}
            >
              Explore
            </Link>
            <Link
              to="/trending"
              className="hover:text-gray-400"
              onClick={() => setIsOpen(false)}
            >
              Trending
            </Link>
            <Link
              to="/upload"
              className="hover:text-gray-400"
              onClick={() => setIsOpen(false)}
            >
              Upload
            </Link>
            {token2 && (
              <Link
                to="/dashboard"
                className="hover:text-gray-400"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
            )}
          </motion.div>
        )}
      </motion.nav>
    </>
  );
};

export default Navbar;
