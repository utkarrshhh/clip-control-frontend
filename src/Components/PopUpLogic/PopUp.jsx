import React, { useEffect, useRef } from "react";
import "../Styles.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import deleteImage from "../utils"; // Assuming this is your utility function for deleting the image
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PopUp({ x, y, onClose, imageId }) {
  // const imageId = imageId;
  const popupRef = useRef();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId2 = JSON.parse(localStorage.getItem("userDetails"));
  const userId = userId2._id;
  const role = localStorage.getItem("role");
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

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

  const handleEdit = async (e, imageId) => {
    e.preventDefault();
    if (!token) {
      toast("You are logged out, Login to perform the operation");
      navigate("/signIn");
      return;
    }

    try {
      localStorage.setItem("imageId", imageId);
      localStorage.setItem("from", "popup");
      navigate("/editorUpload", { state: { imageId, from: "popup" } });
      localStorage.removeItem("imageId");
      localStorage.removeItem("from");
    } catch (e) {
      console.error(e.message);
    }
  };

  const handleDelete = async (imageId) => {
    if (!token) {
      toast("You are logged out, Login to perform the operation");
      navigate("/signIn");
      return;
    }

    try {
      const result = await deleteImage(imageId, token, userId, role);
      console.log(result);
      if (result.success) {
        toast("Image Deleted successfully");

        onClose();
        window.location.reload();
      } else {
        toast(result.message);
        console.error("Error from PopUp line 60", result.message);
      }
    } catch (error) {
      console.error("Delete failed:", error.message);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
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
        {console.log(imageId)}
        <ul style={{ color: "black" }}>
          <li
            onClick={(e) => handleEdit(e, imageId)}
            className="cursor-pointer listItems"
          >
            Edit
          </li>
          {console.log(userDetails.imageUpload.includes(imageId))}
          {userDetails.imageUpload.includes(imageId) && (
            <li
              onClick={() => handleDelete(imageId)}
              className="cursor-pointer listItems"
            >
              Delete
            </li>
          )}
          <li onClick={onClose} className="cursor-pointer listItems">
            Close
          </li>
        </ul>
      </motion.div>
    </>
  );
}

export default PopUp;
