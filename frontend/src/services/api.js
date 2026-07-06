import axios from "axios";

const API = axios.create({
  baseURL: "https://musical-trout-7vgp754xxpxq2x6jv-5000.app.github.dev/api",
});

export default API;