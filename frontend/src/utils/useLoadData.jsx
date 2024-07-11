import React, { useEffect } from "react";
import { getData } from "./api";
import { GET_DATA } from "../constants/constants";
import { useDispatch } from "react-redux";
import { addRestaurant } from "../features/restaurent/restaurantSlice";

const useLoadData = () => {
  const dispatch = useDispatch();

  // load data from server
  useEffect(() => {
    const loadData = async () => {
      try {
        let response = await getData(GET_DATA); // Assuming getData is an async function returning data
        if (response.statusCode === 200) {
          response.data.list.forEach((item) => {
            dispatch(addRestaurant(item));
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    loadData();
  }, []);

  return null;
};

export default useLoadData;
