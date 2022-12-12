import axios from "axios";

let API_URL = "/bakery/addProduct";

// register bakeryProduct
const registerProduct = async (productData, token) => {
  let response = await axios.post(API_URL, productData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.data) {
    console.log("ሲመዘገብ ሰርቪሱ ምንም ሪስፖንስ አላገኘም!");
  }

  if (response.data) {
    return response.data;
  }
};

let fetch_URL = "/bakery/bakeryItems"
// fetch bakeryProduct
const fetchProduct = async (token) => {
  let response = await axios.get(fetch_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.data) {
    console.log("ሲመዘግብ ሰርቪሱ ምንም ሪስፖንስ አላገኘም!");
  }

  if (response.data) {
    return response.data;
  }
};

let bakeryService = {
  registerProduct,
  fetchProduct
};

export default bakeryService;
