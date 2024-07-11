import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import restaurantData from "../db/index.js"



export const getData = asyncHandler(async (req, res) => {
    try {
        const restaurantList = restaurantData
        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    list: restaurantList,
                    count: restaurantList.length
                },
                "all todos fetched successfully..."
            )
        )
    } catch (error) {
        throw new ApiError(400, error?.message || 'something went wrong.')
    }
})

export const postData = asyncHandler(async (req, res) => {
    try {
        const { name, description, location, menu } = req.body;
        const image = req.file ? req.file.path : null; // Handle image upload

        if (!name || !description || !location || !menu) {
            throw new ApiError(400, "All fields are required.");
        }

        // Validate menu items
        if (!Array.isArray(JSON.parse(menu)) || JSON.parse(menu).length === 0) {
            throw new ApiError(400, "Menu must be a non-empty array.");
        }
        JSON.parse(menu).forEach(item => {
            if (!item.name || !item.price) {
                throw new ApiError(400, "Each menu item must have a name and a price.");
            }
        });
        const newRestaurant = {
            id: restaurantData.length + 1, // Generate a new ID (simple approach, for production use UUID or a similar method)
            name,
            description,
            location,
            image,
            menu: JSON.parse(menu),
        };

        restaurantData.push(newRestaurant);
        return res.status(201).json(
            new ApiResponse(
                201,
                newRestaurant,
                "Restaurant added successfully..."
            )
        );
    } catch (error) {
        throw new ApiError(400, error?.message || "Something went wrong.");
    }
});

export const updateData = asyncHandler(async (req, res) => {
    try {
        const { id, name, description, location, image, menu } = req.body;

        if (!id || !name || !description || !location || !image || !menu) {
            throw new ApiError(400, "All fields are required.");
        }

        // Validate menu items
        if (!Array.isArray(menu) || menu.length === 0) {
            throw new ApiError(400, "Menu must be a non-empty array.");
        }

        menu.forEach(item => {
            if (!item.name || !item.price) {
                throw new ApiError(400, "Each menu item must have a name and a price.");
            }
        });
        const restaurantIndex = restaurantData.findIndex(r => {
            return r.id === id
        });

        if (restaurantIndex === -1) {
            throw new ApiError(404, "Restaurant not found.");
        }

        const updatedRestaurant = {
            id,
            name,
            description,
            location,
            image,
            menu,
        };

        restaurantData[restaurantIndex] = updatedRestaurant;

        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    restaurant: updatedRestaurant,
                    count: restaurantData.length,
                },
                "Restaurant updated successfully..."
            )
        );
    } catch (error) {
        throw new ApiError(400, error?.message || "Something went wrong.");
    }
});

export const deleteData = asyncHandler(async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            throw new ApiError(400, "Restaurant ID is required.");
        }

        const restaurantIndex = restaurantData.findIndex(r => r.id === id);

        if (restaurantIndex === -1) {
            throw new ApiError(404, "Restaurant not found.");
        }

        restaurantData.splice(restaurantIndex, 1);

        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    "id": id,
                    count: restaurantData.length,
                },
                "Restaurant deleted successfully..."
            )
        );
    } catch (error) {
        throw new ApiError(400, error?.message || "Something went wrong.");
    }
});
