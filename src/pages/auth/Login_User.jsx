import React from "react";
import "../../index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// assets
import messageIcon from "../../assets/icons/message-icon.svg";
import keyIcon from "../../assets/icons/key-icon.svg";
import { Login, reset } from "../../features/auth/authSlice";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";

function Login_User() {
  const [open, setOpen] = useState(false);
  const eyeToggle = () => {
    setOpen(!open);
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });
  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/dashboard");
    }

    dispatch(reset);
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(Login(userData));
  };

  if (isLoading) {
    return <h1>Loding...</h1>;
  }

  return (
    <>
      <main className="mx-auto px-10 md:px-0 h-screen md:flex md:gap-10 whole-container">
        <section className="relative image hidden md:flex justify-center items-center bg-coffeGif h-full bg-cover w-1/2 px-10">
          <div className="blur-background absolute inset-0 backdrop-blur-sm"></div>
          <div className="absolute">
            <h1 className="font-aladin color-brand sm:hero-text text-center lg:translate-x-0 md:rotate-90 lg:rotate-0 md:-translate-x-28">
              ZAD <span className="text-white">Bakery</span> &{" "}
              <span className="text-white">Caffeteria</span>{" "}
            </h1>
          </div>
        </section>
        <section className="intro md:mr-36 pt-20 sm:pt-7 md:pt-0 self-center md:ml-16">
          <div className="main-section flex flex-col justify-center">
            <h1 className="welcome-brand welcome-font text-3xl text-center md:text-left">
              Welcome to <br />
              <span className="color-brand">ZAD Bakery</span> &{" "}
              <span className="color-brand"> Caffeteria</span>
            </h1>
            <p className="color-greyish-blue mt-2 text-center md:text-left">
              Your everyday choice !
            </p>
            <div className="hidden sm:flex items-center py-4 px-16">
              <div className="flex-grow h-px bg-gray-400"></div>

              <span className="flex-shrink text-sm color-greyish-blue px-4">
                Login Now
              </span>

              <div className="flex-grow h-px bg-gray-400"></div>
            </div>
            <form onSubmit={onSubmit}>
              <div className="form-containe flex flex-col items-center md:items-start pt-2">
                <div className="input-container relative mb-5">
                  <input
                    id="email"
                    name="email"
                    value={email}
                    type="email"
                    className="peer input
                "
                    placeholder=" "
                    onChange={onChange}
                  />
                  <img
                    src={messageIcon}
                    alt=""
                    srcSet=""
                    className="absolute top-3 left-3"
                  />
                  <label
                    htmlFor="email"
                    className="label-with-icon
                "
                  >
                    Email
                  </label>
                </div>
                {/* ################################################### */}
                <div className="input-container relative mb-5">
                  <input
                    id="role"
                    name="role"
                    type="text"
                    className="peer input
                "
                    placeholder=" "
                  />
                  <img
                    src={messageIcon}
                    alt=""
                    srcSet=""
                    className="absolute top-3 left-3"
                  />
                  <label
                    htmlFor="role"
                    className="label-with-icon
                "
                  >
                    Role
                  </label>
                </div>
                {/* ################################################### */}

                <div className="input-container relative">
                  <input
                    id="password"
                    name="password"
                    type={open === false ? "password" : "text"}
                    className="peer input 
                "
                    value={password}
                    placeholder=" "
                    onChange={onChange}
                  />
                  <div className="text-2xl absolute top-0 left-52">
                    {open === false ? (
                      <FontAwesomeIcon
                        icon={"eye"}
                        className="absolute
                                  top-3
                                  left-10
                                  md:left-72
                                  input-faIcon
                                  text-black
                                  "
                        onClick={eyeToggle}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={"eye-slash"}
                        className="absolute
                                  top-3
                                  left-10
                                  md:left-72
                                  input-faIcon
                                  "
                        onClick={eyeToggle}
                      />
                    )}
                  </div>
                  <img
                    src={keyIcon}
                    alt=""
                    srcSet=""
                    className="absolute top-3 left-3"
                  />
                  <label
                    htmlFor="password"
                    className="label-with-icon
                "
                  >
                    Password
                  </label>
                </div>

                <button
                  type="submit"
                  className="mt-5 active:bg-orange-600 py-2 rounded-md text-white text-lg bg-orange-500 w-56 md:w-full welcome-font mb-1"
                >
                  Login
                </button>
                <p className="welcome-font text-lg font-medium">
                  Don't have an account?{" "}
                  <Link to={"/"} className="underline">
                    Create Account
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </section>
      </main>{" "}
    </>
  );
}

export default Login_User;
