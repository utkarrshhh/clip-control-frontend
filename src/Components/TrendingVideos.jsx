import React from "react";

function TrendingVideos() {
  return (
    <div className="bg-gray-800 p-8">
      <h1 className="text-3xl font-bold text-white text-center mb-4">
        Images you could try your hands on.
      </h1>
      <p className="text-gray-400 text-center mb-8">
        Check out the latest and most popular Images on ClipControl. Discover
        new creators and get inspired.
      </p>
      <hr />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-900 rounded-lg shadow-md p-4">
          <img
            src="https://placehold.co/600x400"
            alt="Video thumbnail"
            className="rounded-lg mb-4"
          />
          <div className="flex justify-between items-center mb-2">
            <div>
              <p className="text-gray-400 text-sm">John Doe</p>
              <h2 className="text-lg font-bold text-white">
                How to Create a Stunning Video Intro
              </h2>
            </div>
            <div className="text-gray-400 text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              1.2K
            </div>
          </div>
          <p className="text-gray-400 text-sm">
            Learn the secrets to creating a professional-looking video intro
            that will captivate your audience.
          </p>
        </div>
        <div className="bg-gray-900 rounded-lg shadow-md p-4">
          <img
            src="https://placehold.co/600x400"
            alt="Video thumbnail"
            className="rounded-lg mb-4"
          />
          <div className="flex justify-between items-center mb-2">
            <div>
              <p className="text-gray-400 text-sm">Jane Smith</p>
              <h2 className="text-lg font-bold text-white">
                Vlogging Tips for Beginners
              </h2>
            </div>
            <div className="text-gray-400 text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              5.7K
            </div>
          </div>
          <p className="text-gray-400 text-sm">
            Get started with vlogging and learn the essential tips and tricks to
            create engaging content.
          </p>
        </div>
        <div className="bg-gray-900 rounded-lg shadow-md p-4">
          <img
            src="https://placehold.co/600x400"
            alt="Video thumbnail"
            className="rounded-lg mb-4"
          />
          <div className="flex justify-between items-center mb-2">
            <div>
              <p className="text-gray-400 text-sm">Alex Johnson</p>
              <h2 className="text-lg font-bold text-white">
                Filmmaking Techniques for Beginners
              </h2>
            </div>
            <div className="text-gray-400 text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              3.4K
            </div>
          </div>
          <p className="text-gray-400 text-sm">
            Discover the essential filmmaking techniques to elevate your video
            production skills.
          </p>
        </div>
      </div>
    </div>
  );
}

export default TrendingVideos;
