import React, { useState, useEffect } from "react";
import AppContext from "./Context";
import axios from "axios";

function AppProvider({ children }) {
  // ---------------------- AUTH ----------------------
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const isAuthenticated = !!token;

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(storedToken);
  }, []);

  const loginSuccess = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem("token", jwtToken);
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
  };

  const auth = { user, token, isAuthenticated, loginSuccess, logout };

  // ---------------------- CATEGORY ----------------------
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    const res = await axios.get("http://localhost:9999/categories");
    setCategories(res.data.data);
  };

  const createCategory = async (name) => {
    const res = await axios.post("http://localhost:9999/categories/create", {
      name,
    });
    fetchCategories();
    return res.data;
  };

  const updateCategory = async (id, name) => {
    await axios.put(`http://localhost:9999/categories/update/${id}`, { name });
    fetchCategories();
  };

  const deleteCategory = async (id) => {
    await axios.delete(`http://localhost:9999/categories/delete/${id}`);
    fetchCategories();
  };

  const category = {
    categories,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  };

  // ---------------------- PROVINCE ----------------------
  const [provinces, setProvinces] = useState([]);

  const fetchProvinces = async () => {
    const res = await axios.get("http://localhost:9999/provinces");
    setProvinces(res.data.data);
  };

  const createProvince = async (provinceData) => {
    const res = await axios.post(
      "http://localhost:9999/provinces/create",
      provinceData
    );
    fetchProvinces();
    return res.data;
  };

  const updateProvince = async (id, provinceData) => {
    await axios.put(
      `http://localhost:9999/provinces/update/${id}`,
      provinceData
    );
    fetchProvinces();
  };

  const deleteProvince = async (id) => {
    await axios.delete(`http://localhost:9999/provinces/delete/${id}`);
    fetchProvinces();
  };

  const province = {
    provinces,
    fetchProvinces,
    createProvince,
    updateProvince,
    deleteProvince,
  };

  // ---------------------- SPOT ----------------------
  const [spots, setSpots] = useState([]);

  const fetchSpots = async () => {
    const res = await axios.get("http://localhost:9999/spots");
    setSpots(res.data.data);
  };

  const createSpot = async (spotData) => {
    const res = await axios.post(
      "http://localhost:9999/spots/create",
      spotData
    );
    fetchSpots();
    return res.data;
  };

  const updateSpot = async (id, spotData) => {
    await axios.put(`http://localhost:9999/spots/update/${id}`, spotData);
    fetchSpots();
  };

  const deleteSpot = async (id) => {
    await axios.delete(`http://localhost:9999/spots/delete/${id}`);
    fetchSpots();
  };

  const spot = {
    spots,
    fetchSpots,
    createSpot,
    updateSpot,
    deleteSpot,
  };

  // ---------------------- REVIEW ----------------------
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    const res = await axios.get("http://localhost:9999/reviews");
    setReviews(res.data.data);
  };

  const createReview = async (reviewData) => {
    const res = await axios.post(
      "http://localhost:9999/reviews/create",
      reviewData
    );
    fetchReviews();
    return res.data;
  };

  const updateReview = async (id, reviewData) => {
    await axios.put(`http://localhost:9999/reviews/update/${id}`, reviewData);
    fetchReviews();
  };

  const deleteReview = async (id) => {
    await axios.delete(`http://localhost:9999/reviews/delete/${id}`);
    fetchReviews();
  };

  const review = {
    reviews,
    fetchReviews,
    createReview,
    updateReview,
    deleteReview,
  };

  // ---------------------- SUGGEST ----------------------
  const [suggests, setSuggests] = useState([]);

  const fetchSuggests = async () => {
    const res = await axios.get("http://localhost:9999/suggests");
    setSuggests(res.data.data);
  };

  const createSuggest = async (suggestData) => {
    const res = await axios.post(
      "http://localhost:9999/suggests/create",
      suggestData
    );
    fetchSuggests();
    return res.data;
  };

  const updateSuggest = async (id, suggestData) => {
    await axios.put(`http://localhost:9999/suggests/update/${id}`, suggestData);
    fetchSuggests();
  };

  const deleteSuggest = async (id) => {
    await axios.delete(`http://localhost:9999/suggests/delete/${id}`);
    fetchSuggests();
  };

  const suggest = {
    suggests,
    fetchSuggests,
    createSuggest,
    updateSuggest,
    deleteSuggest,
  };

  // ---------------------- USER ----------------------
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:9999/users");
    setUsers(res.data.data);
  };

  const createUser = async (userData) => {
    const res = await axios.post(
      "http://localhost:9999/users/create",
      userData
    );
    fetchUsers();
    return res.data;
  };

  const updateUser = async (id, userData) => {
    await axios.put(`http://localhost:9999/users/update/${id}`, userData);
    fetchUsers();
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:9999/users/delete/${id}`);
    fetchUsers();
  };

  const userFind = {
    users,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
  };

  // ---------------------- FAVOURITE ----------------------
  const [favourites, setFavourites] = useState([]);

  const fetchFavourites = async () => {
    const res = await axios.get("http://localhost:9999/favourites");
    setFavourites(res.data.data);
  };

  const fetchFavouritesByUser = async (userId) => {
    const res = await axios.get(`http://localhost:9999/favourites/${userId}`);
    return res.data;
  };

  const addToFavourite = async (data) => {
    const res = await axios.post("http://localhost:9999/favourites/add", data);
    fetchFavourites();
    return res.data;
  };

  const deleteFavourite = async (userId, spotId) => {
    await axios.delete(`http://localhost:9999/favourites/${userId}/${spotId}`);
    fetchFavourites();
  };

  const favourite = {
    favourites,
    fetchFavourites,
    fetchFavouritesByUser,
    addToFavourite,
    deleteFavourite,
  };

  // ---------------------- CONTEXT PROVIDER ----------------------
  return (
    <AppContext.Provider
      value={{
        auth,
        category,
        province,
        spot,
        review,
        suggest,
        userFind,
        favourite,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
