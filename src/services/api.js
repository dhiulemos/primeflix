// Base da URL: https://api.themoviedb.org/3

// API KEY >> 7de768989c0d14dca569ab7ace39c4b2

import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export default api;
