import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080/api",
  httpsAgent: null,
  proxy: false,
  timeout: 60000,
});
