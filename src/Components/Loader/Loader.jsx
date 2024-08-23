import React from "react";
import { motion } from "framer-motion";
import "./loader.css";
const Loader = () => {
  const loaderVariants = {
    hidden: {
      x: [-20, 20],
      y: [0, -30],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "reverse", // Replaces yoyo
          duration: 0.5,
        },
        y: {
          repeat: Infinity,
          repeatType: "reverse", // Replaces yoyo
          duration: 0.25,
          ease: "easeOut",
        },
      },
    },
  };

  return (
    <motion.div
      className="loader"
      variants={loaderVariants}
      animate="hidden"
    ></motion.div>
  );
};

export default Loader;
