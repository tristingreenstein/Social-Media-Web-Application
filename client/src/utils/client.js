import axios from "axios";
const baseURL =
    process.env.NODE_ENV === "production"
        ? "https://backend-socialmediaapp.herokuapp.com/api"
        : "http://localhost:3000";

const client = axios.create({ baseURL });
export default client;
