import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addProduct, reset } from "../features/bakeryProducts/bakerySlice";
import { BrowseIngredients } from "../features/ingredients/ingredientSlice";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// function component

export default function AddBakeryProduct(props) {
  const [formData, setFormData] = useState([
    {
      productName: "",
      sellingPrice: "",
      productWeight: "",
      ingredientLists: [],
    },
  ]);
  let [selectedOptions, setSelectedOptions] = useState();
  console.log(selectedOptions);

  let addForm = () => {
    let formObject = {
      productName: "",
      sellingPrice: "",
      productWeight: "",
      ingredientLists: [],
    };
    setFormData([...formData, formObject]);
  };

  let state = useSelector((state) => state.BakeryProduct);

  const { productName, sellingPrice, productWeight, ingredientLists } =
    formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { bakeryProduct, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.BakeryProduct
  );
  let { ingredients } = useSelector((state) => state.ingredient);
  const optionList = ingredients.map((items) => ({
    value: items.ingredientName,
    label: items.ingredientName,
  }));
  function handleSelect(data) {
    setSelectedOptions(data);
  }

  useEffect(() => {
    dispatch(BrowseIngredients());
  }, [dispatch]);

  const onChange = (e, index) => {
    let data = [...formData];
    data[index][e.target.name] = e.target.value;
    setFormData(data);
  };
  if (selectedOptions) {
    console.log(
      "selected: ",
      selectedOptions.map((items) => items.value)
    );
  }
  const onSubmit = (e) => {
    e.preventDefault();
    let productData = formData.map((item) => item);
    productData.forEach(
      (obj) =>
        (obj.ingredientLists = selectedOptions
          ? selectedOptions.map((items) => items.value)
          : "")
    );
    console.log("productdata: ", productData);
    dispatch(addProduct(productData));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      toast("registered successfully!");
    }
    return () => {
      dispatch(reset());
    };
  }, [isError, message, isSuccess]);

  if (isLoading) {
    return <h1>Loading ...</h1>;
  }

  let theId = 0;
  theId = formData.length;
  return (
    <>
      <button
        onClick={props.toggler}
        className={
          props.toggler
            ? "bg-orange-600 text-white font-bold rounded-md px-5 py-2 flex align-middle items-center gap-2 absolute bottom-3 left-5 z-60"
            : "hidden"
        }
      >
        <FontAwesomeIcon icon={"circle-arrow-left"} className="text-5xl" />
        Go Back
      </button>
      <button
        onClick={props.toggler}
        className={props.toggler ? "absolute top-3 right-5" : "hidden"}
      >
        <FontAwesomeIcon icon={"times"} className="text-gray text-5xl" />
      </button>
      <div className="mx-auto px-10 md:px-0 h-screen md:flex md:gap-10 whole-container align-middle items-center">
        <section className="relative image hidden md:flex justify-center items-center bg-[url('../src/assets/images/3977.jpg')] h-full bg-cover md:bg-right w-1/2 px-10">
          <div className="blur-background absolute inset-0 backdrop-blur-sm"></div>
          <div className="absolute">
            <h1 className="font-aladin color-brand sm:hero-text text-center lg:translate-x-0 md:rotate-90 lg:rotate-0 md:-translate-x-28">
              <span className="text-white">Register Products</span>
            </h1>
          </div>
        </section>
        {/* <h1>Register bakeryProduct Items</h1> */}
        <form action="" onSubmit={onSubmit}>
          {formData.map((form, index) => {
            return (
              <div
                key={index}
                className=" p-5 form-containe flex flex-col items-center md:items-start pt-5 mr-5 border-3 shadow-md mb-1"
              >
                <section className="md:flex gap-3">
                  <div className="input-container relative mb-5">
                    <input
                      id={theId + 1}
                      className="peer product-input"
                      type="text"
                      placeholder=" "
                      value={productName}
                      name="productName"
                      onChange={(e) => onChange(e, index)}
                    />
                    <label
                      className="label peer-focus:-top-3 peer-focus:w-full"
                      htmlFor={theId + 1}
                    >
                      Product Name
                    </label>
                  </div>
                  <div className="input-container relative mb-5">
                    <input
                      id={(theId += 2)}
                      className="peer product-input"
                      type="number"
                      placeholder=" "
                      value={sellingPrice}
                      name="sellingPrice"
                      onChange={(e) => onChange(e, index)}
                    />
                    <label className="label" htmlFor={theId}>
                      Selling Price
                    </label>
                  </div>
                  <div className="input-container relative mb-5">
                    <input
                      id={(theId += 3)}
                      className="peer product-input 
                  "
                      type="number"
                      placeholder=" "
                      value={productWeight}
                      name="productWeight"
                      onChange={(e) => onChange(e, index)}
                    />
                    <label
                      className="label peer-focus:-top-3 peer-focus:w-full left-1"
                      htmlFor={theId}
                    >
                      Product Weight
                    </label>
                  </div>
                </section>
                <Select
                  closeMenuOnSelect={false}
                  options={optionList}
                  placeholder="select ingredients"
                  value={selectedOptions}
                  onChange={handleSelect}
                  isSearchable={true}
                  isMulti
                  name="ingredientLists"
                  className="w-full"
                />
                <section className="buttonwrapper flex justify-between w-full">
                  <button className="btn bg-orange-500 text-white text-xl hover:shadow-md active:bg-orange-800 mt-2">
                    Add product
                  </button>
                </section>
              </div>
            );
          })}
        </form>
        <button
          className="fixed right-0 btn bg-orange-500 text-white text-xl hover:shadow-md active:bg-orange-800 mt-2"
          onClick={addForm}
        >
          Add More Fields
        </button>
      </div>
    </>
  );
}
