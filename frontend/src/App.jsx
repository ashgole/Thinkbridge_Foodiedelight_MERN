// src/App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import RestaurantList from "./components/RestaurantList";
import EditRestaurant from "./components/EditRestaurant";
import AddRestaurant from "./components/AddRestaurant";
import Header from "./components/Header";
import useLoadData from "./utils/useLoadData";
import Report from "./components/Report";

function App() {
  const loadData = useLoadData();
  return (
    <div className="bg-gray-100">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<RestaurantList />} />
          <Route path="/add" element={<AddRestaurant />} />
          <Route path="/edit" element={<EditRestaurant />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
