import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import TrendingVideos from "./TrendingVideos";
import Navbar from "./Navbar";
function Home() {
  return (
    <>
      <div className="bg-gray-900 text-white">
        {/* <Navbar /> */}
        <div className=" mx-auto py-16">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Share Your Videos with the World
              </h1>
              <p className="text-lg mb-6">
                VidShare is the ultimate platform for video sharing and
                collaboration. Upload, share, and discover amazing content with
                ease.
              </p>
              <div className="flex space-x-4">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Get Started
                </button>
                <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
                  Learn More
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
