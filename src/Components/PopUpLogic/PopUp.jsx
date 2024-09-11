import React, { useEffect, useRef } from "react";
import "../Styles.css";
import { motion } from "framer-motion";

function PopUp({ x, y, onClose, imageId }) {
  const popupRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        onClose(); // Close the popup if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }} // Added the animate prop
      transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
      ref={popupRef}
      style={{
        position: "absolute",
        top: y,
        left: x - 70 + "px",
        padding: "10px",
        zIndex: 1000,
      }}
      className="glass-effect"
    >
      <ul style={{ color: "black" }}>
        <li
          onClick={() => console.log(`Editing image ${imageId}`)}
          className="cursor-pointer listItems"
        >
          Edit
        </li>
        <li
          onClick={() => console.log(`Deleting image ${imageId}`)}
          className="cursor-pointer listItems"
        >
          Delete
        </li>
        <li onClick={onClose} className="cursor-pointer listItems">
          Close
        </li>
      </ul>
    </motion.div>
  );
}

export default PopUp;
