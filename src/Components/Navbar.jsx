import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../Context/LoginContext";
import { delay, easeInOut, motion } from "framer-motion";
const Navbar = () => {
  let token2 = localStorage.getItem("token");
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userInfo");
    window.location.href = "/";
  };
  const { token, setToken } = useContext(LoginContext);
  useEffect(() => {
    console.log("useEffect ");
  }, [token]);

  // const { token } = useContext(LoginContext);

  const svgVariants = {
    hidden: {
      rotate: -180,
    },
    visible: {
      rotate: 0,
      transition: { duration: 1, delay: 2, scale: 2 },
    },
  };
  const pathVariants = {
    hidden: {
      opacity: 0,
      pathLength: 0,
    },
    visible: {
      opacity: 1,
      pathLength: 1,
      transition: { delay: 2.1, duration: 2, easeInOut: true },
    },
  };

  return (
    <>
      <motion.nav
        initial={{ y: "-50vh" }}
        animate={{ y: 0 }}
        transition={{
          delay: 0,
          duration: 1.5,
          type: "spring",
          stiffness: "120",
        }}
        className="sticky top-0 z-10 bg-gray-900 text-white px-4 py-3 md:px-6 md:py-4"
      >
        <div className=" mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              variants={svgVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 10l4.553-2.276C18.31 7.904 18 7.141 17.346 6.654L12 2.004l-5.346 4.65A7.024 7.024 0 0112 12c0 1.12.347 2.19.968 3.074L12 17.996l5.346-4.65A7.024 7.024 0 0112 12z"
                variants={pathVariants}
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
                    // className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    // onClick={handleLogout}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Sign In
                  </motion.button>
                </Link>
                <Link to="/signIn">
                  <motion.button
                    whileHover={{
                      boxShadow: "0 0 8px rgba(59,130,246)",
                      scale: 1.1,
                      origin: 0,
                    }}
                    // className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    // onClick={handleLogout}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
        <hr></hr>
      </motion.nav>
    </>
  );
};

export default Navbar;
