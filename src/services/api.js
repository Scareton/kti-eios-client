import axios from "axios";
export default () => {
  return axios.create({
    baseURL: "http://sundear.ru/api/"
  });
};