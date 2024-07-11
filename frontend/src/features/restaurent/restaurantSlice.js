import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  restaurantData: [],
  searchResults: [],
};

const restaurantsSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {
    addRestaurant: (state, action) => {
      state.restaurantData.push({ ...action.payload });
    },
    updateRestaurant: (state, action) => {
      const { id, ...restData } = action.payload;
      const existingRestaurant = state.restaurantData.find(r => r.id === id);
      if (existingRestaurant) {
        Object.assign(existingRestaurant, restData);
      }
    },
    deleteRestaurant: (state, action) => {
      state.restaurantData = state.restaurantData.filter(r => r.id !== action.payload);
    },
    searchRestaurant: (state, action) => {
      const searchTerm = action.payload.toLowerCase();
      state.searchResults = state.restaurantData.filter(
        restaurant => restaurant.name.toLowerCase().includes(searchTerm)
      );
    },
  },
});

export const { addRestaurant, updateRestaurant, deleteRestaurant, searchRestaurant } = restaurantsSlice.actions;

export default restaurantsSlice.reducer;
