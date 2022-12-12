import axios from "axios";

const API_URL = "/ing/browse-ingredients";


// Register ingredients
const Register_API = "/ing/add-ingredient";

const RegisterIngredients = async (Data,myToken) => {
  console.log('servicePage: ',myToken)
  const config = {
    headers: {
      Authorization: `Bearer ${myToken}`
    },
  }
  const response = await axios.post(Register_API,Data,{
    headers: {
      Authorization: `Bearer ${myToken}`
    }
  })
   if(!response.data){
    console.log('when registering ingredient no response from service.')
   }
   return response.data
 }
// Get ingredients
const FetchIngredients = async (token) => {
  const HeaderConfig = {
  
  };

  const response = await axios.get(API_URL,{  headers: {
      Authorization: `Bearer ${token}`,
    }} );
  console.log("fetch-response",response);

  return response.data;
};
const ingredientService = {
  FetchIngredients,
  RegisterIngredients,
};

export default ingredientService;
