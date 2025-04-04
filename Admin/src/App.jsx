import React, { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import SideBar from "./components/Sidebar/SideBar";
import Add from "./pages/Add/Add";
import Orders from "./pages/Orders/Orders";
import List from "./pages/List/List";
import Update from "./pages/Update/Update";
import AddUsers from "./pages/AddUsers/AddUsers";
import ListUsers from "./pages/ListUsers/ListUsers";
import UpdateUser from "./pages/UpdateUser/UpdateUser";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Login } from "./components/Login/Login";
const App = () => {
  const url = `${import.meta.env.VITE_BACKEND_URL}`;
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );
  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);
  return (
    <div>
      <ToastContainer />
      {token === "" ? (
        <Login url={url} setToken={setToken} />
      ) : (
        <>
          <NavBar setToken={setToken} className="NavBar" />
          <hr />
          <div className="app-content">
            <SideBar className="SideBar" />
            <Routes className="routes">
              <Route path="/add" element={<Add url={url} token={token} />} />
              <Route path="/update/:id" element={<Update token={token} />} />
              <Route path="/list" element={<List url={url} token={token} />} />
              <Route
                path="/addUsers"
                element={<AddUsers url={url} token={token} />}
              />
              <Route
                path="/listUsers"
                element={<ListUsers url={url} token={token} />}
              />
              <Route
                path="/updateUsers/:id"
                element={<UpdateUser token={token} />}
              />
              <Route
                path="/orders"
                element={<Orders url={url} token={token} />}
              />
            </Routes>
          </div>
        </>
      )}
    </div>
  );
};
export default App;

//install axios that create n/w request like get post
//install react-toastify create toast notification easily
//install react-router-dom
