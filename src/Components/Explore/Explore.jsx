import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Navbar";
import "../Styles.css";
import { ImageDetailsContext } from "../../Context/ImageDetailsContext";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

function Explore() {
  const { images, setImages } = useContext(ImageDetailsContext);
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState(null); // State to track which card is expanded

  useEffect(() => {
    const fetchImages = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch("http://localhost:5000/api/explore", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }

        const result = await response.json();
        console.log(result.finalResult);
        let finalResult = result.finalResult;
        finalResult.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        console.log(finalResult);
        setImages(finalResult);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, [setImages]);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (images.length === 0) {
    return <Loader />;
  }

  const handleExploreClick = (e) => {
    e.preventDefault();

    let card = e.target;
    while (card && !card.classList.contains("exploreCard")) {
      card = card.parentElement;
    }

    if (card) {
      navigate(`/image/${card.id}`);
    }
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="bg-gray-900 text-white p-4">
        <h1 className="text-2xl font-bold mb-4">Explore</h1>
        <p className="mb-8">Browse all the images on the platform.</p>
        <div className="flex justify-end mb-8">
          <div className="relative inline-block text-left">
            <div className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-400 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
              <span>Filter by</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
          <div className="relative inline-block text-left ml-4">
            <div className="flex items-center justify-between align-center w-full px-4 py-2 text-sm font-medium text-gray-400 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
              <span>Sort by</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"></path>
              </svg>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {images.map((item) => {
            const isExpanded = expandedId === item._id;
            return (
              <div
                key={item._id}
                id={item._id}
                className="bg-gray-800 rounded-lg shadow-md p-4 exploreCard"
                onClick={handleExploreClick}
              >
                <img
                  src={`data:image/png;base64,${item.image}`}
                  alt={item.title}
                  className="rounded-lg mb-4"
                />
                <h2 className="text-xl font-bold mb-2 text-left">
                  TITLE - {item.title}
                </h2>
                <h3 className="text-lg font-bold mb-2 text-left">
                  {item.category}
                </h3>
                <p className="text-sm font-medium text-gray-400">{item.tags}</p>
                <p className="text-gray-400">
                  {isExpanded
                    ? item.description
                    : `${item.description.substring(0, 100)}...`}
                </p>
                <span
                  className="text-blue-500 underline mt-2 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents triggering the card's onClick event
                    toggleExpand(item._id);
                  }}
                >
                  {isExpanded ? "Read less" : "Read more"}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Explore;