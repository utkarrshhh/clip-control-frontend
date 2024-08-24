import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import VideoUploadForm from "./Components/Upload/VideoUploadForm";
import DashBoard from "./Components/DashBoard/DashBoard";
import Explore from "./Components/Explore/Explore";
import ImageDetail from "./Components/DashBoard/ImageDetails";
import AppSecond from "./AppSecond";
import Navbar from "./Components/Navbar";
import { LoginProvider } from "./Context/LoginContext";
import { ImageDetailsProvider } from "./Context/ImageDetailsContext";
import { UserProvider } from "./Context/UserContext";

function App() {
  return (
    <BrowserRouter>
      <LoginProvider>
        <ImageDetailsProvider>
          <UserProvider>
            {/* Navbar will be rendered on every page */}
            {/* <Navbar /> */}
            <Routes>
              {/* Routes change, but Navbar stays */}
              <Route path="/signIn" element={<AppSecond />} />
              <Route exact path="/" element={<Home />} />
              <Route path="/upload" element={<VideoUploadForm />} />
              <Route path="/dashboard" element={<DashBoard />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/image/:id" element={<ImageDetail />} />
            </Routes>
          </UserProvider>
        </ImageDetailsProvider>
      </LoginProvider>
    </BrowserRouter>
  );
}

export default App;
