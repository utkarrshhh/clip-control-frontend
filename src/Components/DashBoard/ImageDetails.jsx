import React, { useContext, useState, useEffect } from "react";
import { ImageDetailsContext } from "../../Context/ImageDetailsContext";
import { Link, useParams } from "react-router-dom";
import "./dashboard.css";
import Navbar from "../Navbar";
import { UserContext } from "../../Context/UserContext";

const ImageDetail = () => {
  const { images } = useContext(ImageDetailsContext);
  const user = useContext(UserContext);
  const { id } = useParams();
  const [image, setImage] = useState(null);

  // Function to clear local storage keys starting with "image_", except the current image
  const clearOldImageData = (currentImageId) => {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("image_") && key !== `image_${currentImageId}`) {
        localStorage.removeItem(key);
      }
    });
  };

  useEffect(() => {
    clearOldImageData(id);

    const cachedImage = JSON.parse(localStorage.getItem(`image_${id}`));
    if (cachedImage) {
      setImage(cachedImage);
    }

    if (images.length > 0 && !cachedImage) {
      const foundImage = images.find((img) => img._id === id);
      if (foundImage) {
        setImage(foundImage);
        localStorage.setItem(`image_${id}`, JSON.stringify(foundImage));
      }
    }
  }, [images, id]);

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
      <div className="min-h-screen bg-[#111827] flex flex-col items-center justify-center p-4 glass-effect">
        <div className="flex flex-col items-left justify-center w-full md:w-3/4">
          <div className="glass-effect" style={{ border: "1px solid white" }}>
            <img
              src={`data:image/png;base64,${image.image}`}
              alt={image.title}
              className="w-full h-auto rounded-lg shadow-lg mb-4 md:mb-0 animate-slide-in-left"
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
          className="flex flex-col text-imageDetails glass-effect mt-6"
          style={{ border: "1px solid white", padding: "10px 20px !important" }}
        >
          <h2 className="text-2xl text-white mb-2 animate-slide-in-left">
            Title : {image.title}
          </h2>
          <p className="text-white-600 mb-4 animate-slide-in-left">
            {image.description}
          </p>
          <p className="text-white-600 mb-2 animate-slide-in-left">
            Author: <span>{user?.user?.name}</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default ImageDetail;
