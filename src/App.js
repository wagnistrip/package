import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Test from "./Test";
import HotelListpage from "./pages/HotelListpage";
import HotelDetailspage from "./pages/HotelDetailspage";
import Checkoutpage from "./pages/Checkoutpage";
import NoteFound from "./components/NoteFound";
import { useDispatch } from "react-redux";
import { loadSession } from "./redux/actions/authActions";
import ScrollToTop from "./components/ScrollToTop";
function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  useEffect(() => {
    const images = document.images;
    let loadedImages = 0;
    const totalImages = images.length;

    if (totalImages === 0) {
      setTimeout(() => setLoading(false), 2000); // If no images, hide loader after 1 sec
    } else {
      Array.from(images).forEach((img) => {
        img.onload = () => {
          loadedImages++;
          if (loadedImages === totalImages) {
            setTimeout(() => setLoading(false), 2000);
          }
        };
      });
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timeout);
  }, [location]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSession()); // Load session on app start
  }, [dispatch]);

  const isNotFoundPage =
    location.pathname !== "/" &&
    location.pathname !== "/packages/" &&
    location.pathname !== "/package-list" &&
    !location.pathname.startsWith("/packages/") &&
    location.pathname !== "/test";

  return (
    <>

    {loading && <LoadingScreen />}
      {!isNotFoundPage && <Navbar />}
       <ScrollToTop />
      <Routes>
        <Route path="/package-list" element={<HotelListpage />}></Route>
        <Route path="/packages/:id" element={<HotelDetailspage />}></Route>
        <Route path="/packages/:id/checkout" element={<Checkoutpage />}></Route>
        <Route path="/test" element={<Test />}></Route>
        <Route path="*" element={<NoteFound />}></Route>
      </Routes>
      {!isNotFoundPage && <Footer />}
    </>
  );
}

export default App;
const LoadingScreen = () => {
  return (
    <div className="loading-container">
    {[...Array(3)].map((_, i) => (
      <span key={i} className="dot" style={{ animationDelay: `${i * 0.1}s` }}></span>
    ))}
  </div>
  );
}