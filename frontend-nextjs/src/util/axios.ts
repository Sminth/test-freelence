import axios from "axios";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export default axios.create({
  baseURL: `${serverUrl}/api/`,
});
