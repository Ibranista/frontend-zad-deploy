import axios from "axios";

const API_URL = "/api/signup";

// Register user
const Register = async (userData) => {
   const response = await axios.post(API_URL, userData)
    if (response.data) {
      window.localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
  }
  const LOGIN_API = "/api/login";

// Login user
const Login = async (userData) => {
  const response = await axios.post(LOGIN_API,userData)
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

// logout user
const Logout = async() => {
   localStorage.removeItem('user')
}

const authService = {
    Register,
    Login,
    Logout
}

export default authService