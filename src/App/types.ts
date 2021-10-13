import axios from "axios";

export default {
  fetch: (): Promise<User> =>
    axios
      .get<User>("https://coding-challenge-api.aerolab.co/user/me", {
        headers: {
          Authorization: "Bearer " + apikey,
        },
      })
      .then(({data}) => {
        return data;
      })
      .catch((error) => {
        return error;
      }),
  points: {
    add: (amount: number): Promise<number> =>
      axios.post(
        "https://coding-challenge-api.aerolab.co/user/points",
        {amount: amount},
        {headers: {Authorization: "Bearer " + apikey}},
      ),
  },
  addProduct: (productId: string): Promise<string> =>
    axios.post(
      "https://coding-challenge-api.aerolab.co/redeem",
      {productId: productId},
      {
        headers: {Authorization: "Bearer " + apikey},
      },
    ),
};

export interface User {
  id: string;
  name: string;
  points: number;
  radeemHistory: Product[];
  createDate: string;
}

export interface Product {
  name: string;
  _id: string;
  category: string;
  cost: number;
  img: Objimg;
}
interface Objimg {
  url: string;
  hdURl: string;
}

export const apikey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTVmMTRjOTUyOTUzZDAwMWE1OGM3NjkiLCJpYXQiOjE2MzM2MjExOTN9.-9rWB1s9R7cY8sMFbCnhRdFhr4c3uEc5fU5nACrNpKo";
