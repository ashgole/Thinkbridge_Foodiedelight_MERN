// src/components/RestaurantList.js

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EditRestaurant from "./EditRestaurant";
import { useSelector, useDispatch } from "react-redux";
import {
  addRestaurant,
  deleteRestaurant,
  searchRestaurant,
} from "../features/restaurent/restaurantSlice";
import { deleteData } from "../utils/api";
import { DELETE_DATA, GET_DATA } from "../constants/constants";

const RestaurantList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 3;
  const dispatch = useDispatch();

  // Selector to get filtered and paginated restaurants
  const restaurants = useSelector((state) => {
    let filteredRestaurants = state.restaurantData;
    if (searchTerm) {
      filteredRestaurants = filteredRestaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    return filteredRestaurants.slice(startIndex, endIndex);
  });

  // Selector to get the total number of restaurants
  const totalRestaurants = useSelector((state) => {
    if (searchTerm) {
      return state.restaurantData.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
      ).length;
    }
    return state.restaurantData.length;
  });

  // Calculate total pages for pagination
  const totalPages = Math.ceil(totalRestaurants / recordsPerPage);

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  // Handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
    dispatch(searchRestaurant(e.target.value));
  };

  // Handle edit button click
  const handleEdit = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setShowEditModal(true);
  };

  // Handle save action in edit modal
  const handleSave = (editedRestaurant) => {
    setShowEditModal(false);
  };

  // Handle close action in edit modal
  const handleClose = () => {
    setShowEditModal(false);
  };

  // Handle page change for pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle delete action
  const handleDelete = async (id) => {
    let response = await deleteData(DELETE_DATA, { id });
    if (response.statusCode === 200) {
      dispatch(deleteRestaurant(response.data.id));
    }
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Restaurants List</h2>
          <Link
            to="/add"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Restaurant
          </Link>
        </div>

        <div className="mb-4">
          <input
            type="text"
            id="search"
            name="search"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search by name..."
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Description</th>
                <th className="py-2 px-4 border-b">Location</th>
                <th className="py-2 px-4 border-b">Menu</th>
                <th className="py-2 px-4 border-b">Image</th>
                <th className="py-2 px-4 border-b">Edit</th>
                <th className="py-2 px-4 border-b">Delete</th>
              </tr>
            </thead>
            <tbody>
              {restaurants.map((restaurant) => (
                <tr key={restaurant.id}>
                  <td className="py-2 px-4 border-b">{restaurant.id} : {restaurant.name}</td>
                  <td className="py-2 px-4 border-b">
                    {restaurant.description}
                  </td>
                  <td className="py-2 px-4 border-b">{restaurant.location}</td>
                  <td className="py-2 px-4 border-b">
                    <ul>
                      {restaurant.menu.map((item, index) => (
                        <li key={index}>
                          {item.name} - ${item.price}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="py-2 px-4 border-b">
                    {/* Display restaurant image */}
                    {restaurant.image && (
                      <img
                        src={`http://localhost:3000/${restaurant.image}`}
                        alt={restaurant.name}
                        className="h-16 w-16 object-cover"
                      />
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleEdit(restaurant)}
                      className="text-red-500 hover:underline"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleDelete(restaurant.id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center mt-4">
          <nav className="inline-flex rounded-md shadow">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-white border border-gray-300 rounded-l-md text-gray-700 hover:bg-gray-50"
            >
              Previous
            </button>
            {[...Array(totalPages).keys()].map((page) => (
              <button
                key={page + 1}
                onClick={() => handlePageChange(page + 1)}
                className={`px-4 py-2 bg-white border-t border-b border-gray-300 text-gray-700 hover:bg-gray-50 ${
                  currentPage === page + 1 ? "font-bold" : ""
                }`}
              >
                {page + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-white border border-gray-300 rounded-r-md text-gray-700 hover:bg-gray-50"
            >
              Next
            </button>
          </nav>
        </div>

        {showEditModal && (
          <EditRestaurant
            restaurant={selectedRestaurant}
            onSave={handleSave}
            onClose={handleClose}
          />
        )}
      </div>
    </>
  );
};

export default RestaurantList;
