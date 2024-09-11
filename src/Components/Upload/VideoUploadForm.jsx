import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../Navbar";
import { LoginContext } from "../../Context/LoginContext";
import { UserContext } from "../../Context/UserContext";
function VideoUploadForm() {
  const token2 = useContext(LoginContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageURL, setImageURL] = useState("https://placehold.co/600x400.png");

  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleTagsChange = (event) => setTags(event.target.value);
  const handleCategoryChange = (event) => setCategory(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
    setImageURL(URL.createObjectURL(file));
  };
  const handleClearImage = () => {
    setImageFile(null);
    setImageURL("https://placehold.co/600x400.png");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signIn");
    }
    // console.log(token2.token.token);
    // console.log(user.user.name);
  }, [navigate]);

  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signIn");
      return;
    }
    const role = localStorage.getItem("role");

    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("title", title);
    formData.append("tags", tags);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("role", role);
    formData.append("uploaderName", user.name);

    try {
      const response = await fetch(
        "http://192.168.37.195:5000/api/upload" ||
          "http://localhost:5000/api/upload",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const result = await response.json();
      console.log(result);
      if (result.success) {
        alert("Image uploaded successfully!");
        // handleClearImage();
        navigate("/");
      } else {
        alert("Failed to upload image! Try again.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="bg-gray-900 text-white p-8 rounded-lg shadow-md max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Upload Image</h1>
        <p className="mb-6">Add your image content and metadata.</p>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-400"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            className="mt-1 p-2 w-full rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-E68369 focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <div className="flex justify-between">
            <div className="w-1/2 mr-2">
              <label
                htmlFor="tags"
                className="block text-sm font-medium text-gray-400"
              >
                Tags
              </label>
              <input
                type="text"
                id="tags"
                value={tags}
                onChange={handleTagsChange}
                className="mt-1 p-2 w-full rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-E68369 focus:outline-none"
              />
            </div>
            <div className="w-1/2">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-400"
              >
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={handleCategoryChange}
                className="mt-1 p-2 w-full rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-E68369 focus:outline-none"
              >
                <option value="">Select a category</option>
                <option value="nature">Nature</option>
                <option value="technology">Technology</option>
                <option value="people">People</option>
              </select>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-400"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            className="mt-1 p-2 w-full rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-E68369 focus:outline-none"
            rows="4"
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-400"
          >
            Image
          </label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            className="mt-1 p-2 w-full rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-E68369 focus:outline-none"
          />
          <button
            id="clear-image"
            onClick={handleClearImage}
            className="mt-2 px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-E68369"
          >
            Clear Image
          </button>
        </div>
        {imageFile && (
          <div className="relative w-full h-48 rounded-md overflow-hidden mb-4">
            <img
              id="image-preview"
              className="w-full h-full object-cover"
              src={imageURL}
              alt="Selected"
            />
          </div>
        )}
        <button
          onClick={handleImageSubmit}
          className="px-6 py-3 rounded-md bg-E68369 hover:bg-ECCEAE focus:outline-none focus:ring-2 focus:ring-E68369"
        >
          Upload Image
        </button>
      </div>
    </>
  );
}

export default VideoUploadForm;
