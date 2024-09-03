import React from "react";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";
import TrendingVideos from "./TrendingVideos";
import Navbar from "./Navbar";
function Home() {
  const navigate = useNavigate();
  const handleGetStarted = (e) => {
    e.preventDefault();
    navigate("/signIn");
  };

  return (
    <>
      <div className="bg-gray-900 text-white">
        {/* <Navbar /> */}
        <div className=" mx-auto py-16">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Share Your Images with the World
              </h1>
              <p className="text-lg mb-6">
                Platform to connect with your editors, upload images and watch
                them get edited by them in no time
              </p>
              <div className="flex space-x-4">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleGetStarted}
                >
                  Get Started
                </button>
                <button
                  className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                  // onClick={learnMore}
                >
                  <Link
                    to="https://github.com/utkarrshhh/clip-control-frontend"
                    target="_blank"
                  >
                    Learn More
                  </Link>
                </button>
              </div>
            </div>
            <div className="md:ml-10">
              <img
                src="./artboard.png"
                alt="Video sharing platform"
                className="rounded-lg shadow-lg logo"
              />
            </div>
          </div>
        </div>
      </div>
      <TrendingVideos />
    </>
  );
}

export default Home;
