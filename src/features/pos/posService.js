import axios from "axios";

let API_URL = "/pos/sellProducts";

// register bakeryProduct
const registerSell = async (productData, token) => {
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

let fetch_URL = "/pos/soldProducts"
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

let posService = {
  registerSell,
  fetchProduct
};

export default posService;
