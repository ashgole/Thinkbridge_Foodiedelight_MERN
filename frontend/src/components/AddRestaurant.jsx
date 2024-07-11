import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addRestaurant } from "../features/restaurent/restaurantSlice";
import { postData } from "../utils/api";
import { POST_DATA } from "../constants/constants";

const AddRestaurant = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [imageFile, setImageFile] = useState(null);
  const [restaurant, setRestaurant] = useState({
    name: "",
    description: "",
    location: "",
    menu: [],
  });

  const [errors, setErrors] = useState({});

  // Handle changes for restaurant fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurant({ ...restaurant, [name]: value });
  };

  // Handle changes for menu items
  const handleMenuChange = (e, index) => {
    const { name, value } = e.target;
    const newMenu = [...restaurant.menu];
    newMenu[index][name] = value;
    setRestaurant({ ...restaurant, menu: newMenu });
  };

  // Add a new menu item
  const addMenuItem = () => {
    setRestaurant({
      ...restaurant,
      menu: [...restaurant.menu, { name: "", price: "" }],
    });
  };

  // Validate form fields
  const validate = () => {
    const errors = {};
    if (!restaurant.name) errors.name = "Name is required.";
    if (!restaurant.description)
      errors.description = "Description is required.";
    if (!restaurant.location) errors.location = "Location is required.";
    if (!imageFile) errors.image = "Image is required.";
    if(restaurant.menu.length===0) errors.menu = "Menu name is required.";
    restaurant.menu.forEach((item, index) => {
      if (!item.name)
        errors[`menuName${index}`] = "Menu item name is required.";
      if (!item.price)
        errors[`menuPrice${index}`] = "Menu item price is required.";
    });
    return errors;
  };

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  const formData = new FormData();
    formData.append("name", restaurant.name);
    formData.append("description", restaurant.description);
    formData.append("location", restaurant.location);
    formData.append("menu", JSON.stringify(restaurant.menu));
    if (imageFile) {
      formData.append("image", imageFile);
    }
    let response = await postData(POST_DATA, formData);
    if (response.statusCode === 201) {
      dispatch(addRestaurant(response.data));
      navigate("/");
    }
  };
  return (
    <div className="container mx-auto p-6 rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Add Restaurant</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={restaurant.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={restaurant.description}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">{errors.description}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="location"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={restaurant.location}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.location && (
            <p className="text-red-500 text-xs mt-1">{errors.location}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Upload Image:
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.image && (
            <p className="text-red-500 text-xs mt-1">{errors.image}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Menu
          </label>
          {restaurant.menu.map((item, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                name="name"
                placeholder="Dish Name"
                value={item.name}
                onChange={(e) => handleMenuChange(e, index)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={item.price}
                onChange={(e) => handleMenuChange(e, index)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors[`menuName${index}`] && (
                <p className="text-red-500 text-xs mt-1">
                  {errors[`menuName${index}`]}
                </p>
              )}
              {errors[`menuPrice${index}`] && (
                <p className="text-red-500 text-xs mt-1">
                  {errors[`menuPrice${index}`]}
                </p>
              )}
            </div>
          ))}
          <button
            type="button"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={addMenuItem}
          >
            Add Menu Item
          </button>
          {errors.menu && (
            <p className="text-red-500 text-xs mt-1">{errors.menu}</p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Restaurant
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRestaurant;
