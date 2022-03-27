import axios from "axios";

const client = axios.create({
  withCredentials: true,
});

client.defaults.baseURL =
  process.env.NODE_ENV === `development`
    ? "http://localhost:5000"
    : "https://test.com";
export default client;
