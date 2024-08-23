// import "./App.css";
import AppSecond from "./AppSecond";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import VideoUploadForm from "./Components/Upload/VideoUploadForm";
import { LoginProvider } from "./Context/LoginContext";
import DashBoard from "./Components/DashBoard/DashBoard";
import Explore from "./Components/Explore/Explore";
import { ImageDetailsProvider } from "./Context/ImageDetailsContext";
import ImageDetail from "./Components/DashBoard/ImageDetails";
import { UserProvider } from "./Context/UserContext";
import Navbar from "./Components/Navbar";
function App() {
  return (
    <>
      <LoginProvider>
        <ImageDetailsProvider>
          <UserProvider>
            <Navbar />
            <BrowserRouter>
              {/* <AppSecond /> */}
              <Routes>
                <Route path="/signIn" element={<AppSecond />} />
                <Route exact path="/" element={<Home />} />
                <Route path="/upload" element={<VideoUploadForm />} />
                <Route path="/dashboard" element={<DashBoard />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/image/:id" element={<ImageDetail />} />
              </Routes>
            </BrowserRouter>
          </UserProvider>
        </ImageDetailsProvider>
      </LoginProvider>
    </>
  );
}

export default App;
