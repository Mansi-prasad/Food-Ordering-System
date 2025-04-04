import { Navbar } from "./Components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import { Home } from "./Components/Pages/Home/Home";
import { Cart } from "./Components/Pages/Cart/Cart";
import { PlaceOrder } from "./Components/Pages/PlaceOrder/PlaceOrder";
import { Footer } from "./Components/Footer/Footer";
import { useState } from "react";
import { LoginPopUp } from "./Components/LoginPopUp/LoginPopUp";
import { Verify } from "./Components/Pages/verify/verify";
import { MyOrders } from "./Components/Pages/myorders/myOrders";
import Search from "./Components/Pages/search/Search";
import { ToastContainer } from "react-toastify";

function App() {
  const [showlogin, setShowLogin] = useState(false);
  return (
    <>
      {showlogin ? <LoginPopUp setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <ToastContainer />
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
