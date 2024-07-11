// src/components/EditRestaurant.js

import React, { useState } from "react";
import EditModal from "./EditModal";
import { useDispatch } from "react-redux";
import { updateRestaurant } from "../features/restaurent/restaurantSlice";
import { updateData } from "../utils/api";
import { UPDATE_DATA } from "../constants/constants";

const EditRestaurant = ({ restaurant, onClose }) => {
  const dispatch = useDispatch();

  // Initialize state with the restaurant data to be edited
  const [editedRestaurant, setEditedRestaurant] = useState({ ...restaurant });

  // Handle changes to input fields (name, description, location)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedRestaurant({ ...editedRestaurant, [name]: value });
  };

  // Handle changes to the menu items
  const handleMenuChange = (e, index) => {
    const { name, value } = e.target;
    const newMenu = [...editedRestaurant.menu]; // Create a shallow copy of the menu array

    // Create a new object for the menu item at the specified index
    const updatedMenuItem = { ...newMenu[index], [name]: value };

    // Update the menu array with the updated menu item
    newMenu[index] = updatedMenuItem;

    // Update the state with the updated menu array
    setEditedRestaurant({ ...editedRestaurant, menu: newMenu });
  };

  // Handle form submission to update the restaurant data
  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = await updateData(UPDATE_DATA, editedRestaurant);
    if (response.statusCode === 200) {
      dispatch(updateRestaurant(editedRestaurant));
      onClose();
    }
  };

  return (
    <EditModal>
      <div className="bg-white rounded-lg p-6 w-full">
        <h2 className="text-2xl font-bold mb-4">Edit Restaurant</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={editedRestaurant.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              pattern=".{2,}" // Name must be at least 2 characters long
              title="Name must be at least 2 characters long"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={editedRestaurant.description}
              onChange={handleChange}
              rows="3"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              pattern=".{10,}" // Description must be at least 10 characters long
              title="Description must be at least 10 characters long"
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Location:
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={editedRestaurant.location}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              pattern=".{2,}" // Location must be at least 2 characters long
              title="Location must be at least 2 characters long"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="menu"
              className="block text-sm font-medium text-gray-700"
            >
              Menu:
            </label>
            {editedRestaurant.menu.map((item, index) => (
              <div key={index} className="flex mb-2">
                <input
                  type="text"
                  name="name"
                  value={item.name}
                  onChange={(e) => handleMenuChange(e, index)}
                  className="mr-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Item Name"
                  required
                  pattern=".{2,}" // Item name must be at least 2 characters long
                  title="Item name must be at least 2 characters long"
                />
                <input
                  type="number"
                  name="price"
                  value={item.price}
                  onChange={(e) => handleMenuChange(e, index)}
                  step="0.01"
                  className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Price"
                  required
                  min="0" // Price must be a positive number
                  title="Price must be a positive number"
                />
              </div>
            ))}
            <button
              type="button"
              className="bg-gray-300 text-gray-800 rounded-md px-3 py-1 hover:bg-gray-400 focus:outline-none"
              onClick={() =>
                setEditedRestaurant({
                  ...editedRestaurant,
                  menu: [...editedRestaurant.menu, { name: "", price: 0 }],
                })
              }
            >
              Add Menu Item
            </button>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </EditModal>
  );
};

export default EditRestaurant;
