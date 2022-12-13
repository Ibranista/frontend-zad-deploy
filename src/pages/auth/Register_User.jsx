import React from "react";
import "../../index.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// api
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
// assets
import messageIcon from "../../assets/icons/message-icon.svg";
import keyIcon from "../../assets/icons/key-icon.svg";

function Register_User() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    role: "",
    password: "",
  });
  const { firstName, lastName, email, phoneNumber, role, password } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //  api
  // the initial states
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );
  const x = useSelector((state) => state);
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      navigate("/login");
    }
    dispatch(reset());
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
      firstName,
      lastName,
      email,
      phoneNumber,
      role,
      password,
    };
    dispatch(register(userData));
  };
  // password eyetoggler
  const [open, setOpen] = useState(false);
  const eyeToggle = () => {
    setOpen(!open);
  };

  if (isLoading) {
    return <h1>loading...</h1>;
  }
  return (
    <>
      <main className="mx-auto px-10 md:px-0 h-screen md:flex md:gap-10 whole-container">
        <section className="relative image hidden md:flex justify-center items-center bg-loginhero h-full bg-cover w-1/2 px-10">
          <div className="blur-background absolute inset-0 backdrop-blur-sm"></div>
          <div className="absolute">
            <h1 className="font-aladin color-brand sm:hero-text text-center">
              ZAD <span className="text-white">Bakery</span> &{" "}
              <span className="text-white">Caffeteria</span>{" "}
            </h1>
          </div>
        </section>
        <section className="intro md:mr-36 pt-7 md:pt-0 self-center md:ml-16">
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
                Sign-up Now!
              </span>

              <div className="flex-grow h-px bg-gray-400"></div>
            </div>
            <form action="" onSubmit={onSubmit}>
              <div className="form-container flex flex-col items-center md:items-start pt-2">
                <div className="name-wrapper md:flex md:gap-10 md:w-full">
                  {/* ################################################### */}
                  <div className="input-container relative mb-5">
                    <input
                      id="first-name"
                      name="firstName"
                      type="text"
                      value={firstName}
                      onChange={onChange}
                      className="peer input md:w-full
                "
                      placeholder=" "
                    />
                    <FontAwesomeIcon
                      icon={"user"}
                      className="absolute
                              top-4
                              left-3
                              input-faIcon
                              "
                    />
                    <label
                      htmlFor="first-name"
                      className="label-with-icon
           
                "
                    >
                      First Name
                    </label>
                  </div>
                  {/* ################################################### */}

                  <div className="input-container relative mb-5">
                    <input
                      id="last-name"
                      name="lastName"
                      value={lastName}
                      onChange={onChange}
                      type="text"
                      className="peer input w-full
                "
                      placeholder=" "
                    />
                    <FontAwesomeIcon
                      icon={"user"}
                      className="absolute
                              top-4
                              left-3
                              input-faIcon
                              "
                    />
                    <label
                      htmlFor="last-name"
                      className="label-with-icon
                "
                    >
                      Last Name
                    </label>
                  </div>
                  {/* ################################################### */}
                </div>
                <div className="input-container relative mb-5">
                  <input
                    id="email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    type="email"
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
                    htmlFor="email"
                    className="label-with-icon
                "
                  >
                    email
                  </label>
                </div>
                {/* ################################################### */}

                <div className="input-container relative mb-5">
                  <input
                    id="phone"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={onChange}
                    type="number"
                    className="peer input
                "
                    placeholder=" "
                  />
                  <FontAwesomeIcon
                    icon={"phone"}
                    className="absolute
                  top-4
                  left-3
                  input-faIcon
                  "
                  />
                  <label
                    htmlFor="phone"
                    className="label-with-icon
                "
                  >
                    Phone Number
                  </label>
                </div>
                {/* ################################################### */}
                <div className="input-container relative mb-5">
                  <input
                    id="role"
                    name="role"
                    type="text"
                    value={role}
                    onChange={onChange}
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
                    role
                  </label>
                </div>
                {/* ################################################### */}

                <div className="input-container relative">
                  <input
                    id="password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    type={open === false ? "password" : "text"}
                    className="peer input 
                "
                    placeholder=" "
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
                <div className="pb-2 flex px-8 mt-3">
                  <input
                    type="checkbox"
                    name="agreement"
                    id=""
                    className="mx-3"
                    required
                  />
                  <label htmlFor="checkbox" className="text-sm welcome-font ">
                    Creating an account means you’re okay with our Terms of
                    Service, Privacy Policy
                  </label>
                </div>
                <button className="active:bg-orange-600 py-2 rounded-md text-white text-lg bg-orange-500 w-56 md:w-full welcome-font mb-1">
                  Create Account
                </button>
                <p className="welcome-font text-lg font-medium">
                  Already have an account?{" "}
                  <Link to={"/login"} href="http://" className="underline">
                    Sign in
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

export default Register_User;
