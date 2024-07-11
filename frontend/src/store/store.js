import { configureStore, combineReducers } from '@reduxjs/toolkit';
import restaurantsSlice from '../features/restaurent/restaurantSlice';



export const store = configureStore({
    reducer: restaurantsSlice,
})