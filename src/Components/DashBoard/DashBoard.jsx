import React, { useContext, useState } from "react";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { ImageDetailsContext } from "../../Context/ImageDetailsContext";

function DashBoard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Home"); // Set "Uploads" as the default active item
  // const [sideBarName, setSidebarName] = useState("Home");

  const { user } = useContext(UserContext);
  const { images } = useContext(ImageDetailsContext);

  const navigate = useNavigate();
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleItemClick = (item) => {
    setActiveItem(item);
  };
  const handleAddVideo = (e) => {
    navigate("/upload");
  };
  console.log(user);
  console.log(images);
  let selectedImages = "";
  selectedImages = images.filter((image) =>
    user.imageUpload.includes(image._id)
  );
  console.log(selectedImages);
  return (
    <>
      {/* <Navbar /> */}
      <div className="flex bg-gray-800" style={{ minHeight: "100vh" }}>
        <div
          className={`flex flex-col bg-gray-900 text-gray-400 sidebar transition-all duration-300 ${
            sidebarOpen ? "w-64" : "w-0"
          }`}
          id="sidebar"
        >
          <div
            className={`flex items-center justify-center h-16 px-4 transition-opacity duration-300 ${
              sidebarOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            {sidebarOpen && (
              <img
                src="https://placehold.co/48x48.svg"
                alt="Profile Icon"
                className="rounded-full"
              />
            )}
          </div>
          <ul
            className={`flex flex-col mt-6 transition-opacity duration-300 ${
              sidebarOpen ? "opacity-100" : "opacity-0"
            }`}
            id="sidebar-menu"
          >
            <li
              className={`px-4 py-2 rounded-md hover:bg-gray-700 ${
                activeItem === "Home" ? "bg-gray-700 text-white" : ""
              }`}
              onClick={() => handleItemClick("Home")}
            >
              <a href="#" className="text-gray-200 hover:text-white">
                Dashboard
              </a>
            </li>
            <li
              className={`px-4 py-2 rounded-md hover:bg-gray-700 ${
                activeItem === "Uploads" ? "bg-gray-700 text-white" : ""
              }`}
              onClick={() => handleItemClick("Uploads")}
            >
              <a href="#" className="text-gray-200 hover:text-white">
                Uploads
              </a>
            </li>
            <li
              className={`px-4 py-2 rounded-md hover:bg-gray-700 ${
                activeItem === "Analytics" ? "bg-gray-700 text-white" : ""
              }`}
              onClick={() => handleItemClick("Analytics")}
            >
              <a href="#" className="text-gray-200 hover:text-white">
                Analytics
              </a>
            </li>
            <li
              className={`px-4 py-2 rounded-md hover:bg-gray-700 ${
                activeItem === "Settings" ? "bg-gray-700 text-white" : ""
              }`}
              onClick={() => handleItemClick("Settings")}
            >
              <a href="#" className="text-gray-200 hover:text-white">
                Settings
              </a>
            </li>
          </ul>
        </div>
        <div
          className={`flex flex-col w-full bg-gray-700 p-4 main-content transition-all duration-300 ${
            sidebarOpen ? "ml-0" : "ml-0"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <button
                className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded mr-4"
                onClick={toggleSidebar}
                id="sidebar-toggle"
              >
                ☰
              </button>
              {/* <h1 className="text-white text-2xl font-bold">
                {activeItem === "Home" ? "Dashboard" : activeItem}
              </h1> */}
            </div>
            <button
              className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
              onClick={handleAddVideo}
            >
              Add Video
            </button>
          </div>
          {activeItem === "Home" && (
            <div className="flex flex-col w-full bg-gray-800 p-4 rounded-md">
              <h2 className="text-white text-xl font-bold mb-4">
                Recent Uploads
              </h2>
              <div className="flex flex-col w-full bg-gray-900 p-4 rounded-md">
                {selectedImages.length == 0 ? (
                  <p style={{ color: "white", margin: "0 auto" }}>
                    wow so empty
                  </p>
                ) : (
                  selectedImages.map((value) => {
                    return (
                      <div
                        className="flex items-center justify-between mb-4"
                        key={value._id}
                      >
                        <h3 className="text-white text-lg font-bold">
                          {value.title}
                        </h3>
                        <div className="flex items-center">
                          <button className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded mr-2">
                            Edit
                          </button>
                          <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                            Delete
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default DashBoard;
