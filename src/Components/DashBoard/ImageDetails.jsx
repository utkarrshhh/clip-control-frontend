import React, { useContext, useState, useEffect } from "react";
import { ImageDetailsContext } from "../../Context/ImageDetailsContext";
import { Link, useParams } from "react-router-dom";
import "./dashboard.css";
import Navbar from "../Navbar";
import { UserContext } from "../../Context/UserContext";

const ImageDetail = () => {
  const { images } = useContext(ImageDetailsContext);
  let { user } = useContext(UserContext);
  let finalResult = useContext(ImageDetailsContext);
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const [editedImage, setEditedImage] = useState(null);

  // Function to clear local storage keys starting with "image_", except the current image
  const clearOldImageData = (currentImageId) => {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("image_") && key !== `image_${currentImageId}`) {
        localStorage.removeItem(key);
      }
    });
  };

  useEffect(() => {
    const editedUpload = async () => {
      let editedImageId = "";

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith("image")) {
          editedImageId = JSON.parse(localStorage.getItem(key)).editedImage;
          console.log(`Key: ${key}, Value: ${editedImageId}`);
          break;
        }
      }

      const userId = JSON.parse(localStorage.getItem("userInfo"))?.id;
      if (!userId || !editedImageId) {
        console.warn("User ID or edited image ID not found in localStorage.");
        return;
      }

      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/UploadedEdited`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId, editedImageId: editedImageId[0] }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        data.success
          ? localStorage.setItem("status", "ok")
          : localStorage.setItem("status", "Bad");
      } catch (e) {
        console.error("Failed to fetch uploaded image data:", e.message);
      }
    };

    clearOldImageData(id);

    const cachedImage = JSON.parse(localStorage.getItem(`image_${id}`));
    if (cachedImage) {
      setImage(cachedImage);
    } else if (images.length > 0) {
      const foundImage = images.find((img) => img._id === id);
      if (foundImage) {
        setImage(foundImage);
        localStorage.setItem(`image_${id}`, JSON.stringify(foundImage));
      }
    }
    console.log(user);
    editedUpload();
  }, [images, id, editedImage]);

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = `data:image/png;base64,${image.image}`;
    link.download = `${image.title}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleEdit = () => {
    // Logic for handling edit functionality goes here
    console.log("Edit button clicked");
  };

  if (!image) {
    return (
      <div className="min-h-screen bg-[#111827] flex flex-col items-center justify-center p-4">
        <h2 className="text-white">Loading...</h2>
      </div>
    );
  }

  return (
    <>
      {/* <Navbar /> */}
      <div className="min-h-screen bg-[#111827] flex flex-col items-center justify-center p-4 ">
        <div className="flex flex-col items-left justify-center w-full md:w-3/4">
          <div className="glass-effect" style={{ border: "1px solid white" }}>
            <img
              src={`data:image/png;base64,${image.image}`}
              alt={image.title}
              className="w-full  rounded-lg shadow-lg mb-4 md:mb-0 animate-slide-in-left"
            />
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={downloadImage}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-300"
            >
              Download
            </button>
            {
              /* {localStorage.getItem("role") === "editor" &&  */
              <button
                onClick={handleEdit}
                className="bg-green-500 text-white font-bold py-2 px-4 rounded shadow-lg hover:bg-green-700 hover:shadow-xl transition-all duration-300"
              >
                <Link to="/editorUpload"> Upload Edited Image </Link>
              </button>
            }
          </div>
        </div>
        <div
          className="flex flex-col text-imageDetails  mt-6"
          style={{
            border: "1px solid white",
            color: "white",
            padding: "10px 20px",
          }}
        >
          <h2 className="text-2xl text-white mb-2 animate-slide-in-left">
            Title : {image.title}
          </h2>
          <p className="text-white-600 mb-4 animate-slide-in-left">
            {image.description}
          </p>
          <p className="text-white-600 mb-2 animate-slide-in-left">
            Author: <span>{image ? image.uploaderName : "Anonymous"}</span>
          </p>
        </div>
      </div>
      <div className="flex flex-col w-full bg-gray-800 p-4 rounded-md">
        <h2 className="text-white text-xl font-bold mb-4">
          Your Uploads (if any)
        </h2>
        {localStorage.getItem("status") == "ok" ? (
          <div className="flex flex-col w-full bg-gray-900 p-4 rounded-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white text-lg font-bold">
                you have something uploaded
              </h3>
              <div className="flex items-center">
                <button className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded mr-2">
                  View
                </button>
                <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col w-full bg-gray-900 p-4 rounded-md">
            <div className="flex items-center justify-between  align-center">
              <h3 className="text-white text-lg font-bold">WOW SO EMPTY</h3>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ImageDetail;
