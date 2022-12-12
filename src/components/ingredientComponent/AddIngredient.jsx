import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  AddIngredients,
  reset,
} from "../../features/ingredients/ingredientSlice";

import React from "react";

function AddIngredient() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    ingredientName: "",
    ingredientPrice: "",
    ingredientWeight: "",
    deliveryPayment: "",
  });
  let { ingredientName, ingredientPrice, ingredientWeight, deliveryPayment } =
    formData;
  let { ingredients, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.ingredient
  );

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let ingredientItem = {
      ingredientName,
      ingredientPrice,
      ingredientWeight,
      deliveryPayment,
    };
    dispatch(AddIngredients(ingredientItem));
  };

  useEffect(() => {
    if (isError) {
      toast.error("አልተሳካም");
    }
    
    if(isSuccess){
      toast(ingredientName +' ተሳክቷል 😊')
    }
    return () => {
      dispatch(reset());
    };
  }, [isError, message,isSuccess]);

  useEffect(()=>{
    
  })

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <main className="mx-auto px-10 md:px-0 h-screen md:flex md:gap-10 whole-container">
        <section className="relative image hidden md:flex justify-center items-center bg-ingredient h-full bg-cover w-1/2 px-10">
          <div className="blur-background absolute inset-0 backdrop-blur-sm bg-slate-700 opacity-80"></div>
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
                Register Ingredients
              </span>

              <div className="flex-grow h-px bg-gray-400"></div>
            </div>
            <form action="" onSubmit={onSubmit}>
              <div className="form-containe flex flex-col items-center md:items-start pt-2">
                <div className="input-container relative mb-5">
                  <input
                    id="ingredientName"
                    name="ingredientName"
                    value={ingredientName}
                    type="text"
                    className="peer input
                "
                    placeholder=" "
                    onChange={onChange}
                  />
                  {/* <img
                    src={messageIcon}
                    alt=""
                    srcSet=""
                    className="absolute top-3 left-3"
                  /> */}
                  <FontAwesomeIcon
                    icon={"bowl-food"}
                    className="absolute top-4 left-3"
                  />
                  <label
                    htmlFor="ingredientName"
                    className="label-with-icon
                "
                  >
                    Ingredient Name
                  </label>
                </div>
                {/* price */}
                <div className="input-container relative mb-5">
                  <input
                    id="ingredientPrice"
                    name="ingredientPrice"
                    value={ingredientPrice}
                    type="number"
                    className="peer input
                "
                    placeholder=" "
                    onChange={onChange}
                  />
                  {/* <img
                    src={messageIcon}
                    alt=""
                    srcSet=""
                    className="absolute top-3 left-3"
                  /> */}
                  <FontAwesomeIcon
                    icon={"bowl-food"}
                    className="absolute top-4 left-3"
                  />
                  <label
                    htmlFor="ingredientPrice"
                    className="label-with-icon
                "
                  >
                    Ingredient Price
                  </label>
                </div>
                {/* Weight */}
                <div className="input-container relative mb-5">
                  <input
                    id="ingredientWeight"
                    name="ingredientWeight"
                    value={ingredientWeight}
                    type="number"
                    className="peer input
                "
                    placeholder=" "
                    onChange={onChange}
                  />
                  {/* <img
                    src={messageIcon}
                    alt=""
                    srcSet=""
                    className="absolute top-3 left-3"
                  /> */}
                  <FontAwesomeIcon
                    icon={"bowl-food"}
                    className="absolute top-4 left-3"
                  />
                  <label
                    htmlFor="ingredientWeight"
                    className="label-with-icon
                "
                  >
                    Ingredient Weight
                  </label>
                </div>
                {/* DeliveryPayment */}
                <div className="input-container relative mb-5">
                  <input
                    id="deliveryPayment"
                    name="deliveryPayment"
                    value={deliveryPayment}
                    type="number"
                    className="peer input
                "
                    placeholder=" "
                    onChange={onChange}
                  />
                  {/* <img
                    src={messageIcon}
                    alt=""
                    srcSet=""
                    className="absolute top-3 left-3"
                  /> */}
                  <FontAwesomeIcon
                    icon={"bowl-food"}
                    className="absolute top-4 left-3"
                  />
                  <label
                    htmlFor="deliveryPayment"
                    className="label-with-icon
                "
                  >
                    Delivery Payment
                  </label>
                </div>

                <button className="mt-5 active:bg-orange-600 py-2 rounded-md text-white text-lg bg-orange-500 w-56 md:w-full welcome-font mb-1">
                  ADD Ingredient
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>{" "}
    </>
  );
}

export default AddIngredient;
