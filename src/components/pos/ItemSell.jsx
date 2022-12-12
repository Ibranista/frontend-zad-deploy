import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerSell, reset } from "../../features/pos/posSlice";
import { Link } from "react-router-dom";
// import Sidebar, Banner and Header
import Sidebar from "../../partials/Sidebar";
import Banner from "../../partials/Banner";
import Header from "../../partials/Header";

import React from "react";
import { fetchProduct } from "../../features/bakeryProducts/bakerySlice";
function ItemSell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState([
    {
      productName: "",
      itemsSold: "",
    },
  ]);

  // const { productName, itemsSold } = formData;

  const dispatch = useDispatch();

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.pos
  );
  let { bakeryProduct } = useSelector((state) => state.BakeryProduct);

  const onChange = (e, index) => {
    let data = [...formData];
    data[index][e.target.name] = e.target.value;
    setFormData(data);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let soldItems = formData.map((item) => item);

    dispatch(registerSell(soldItems));
    console.log(soldItems);
  };

  let addForm = () => {
    let formObject = {
      productName: "",
      itemsSold: "",
    };
    setFormData([...formData, formObject]);
  };

  let removeForm = (index) => {
    let data = [...formData];
    let reducedData = data.filter((item) => item !== data[index]);
    setFormData(reducedData);
  };

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      toast("sold");
    }
    return () => {
      dispatch(reset());
    };
  }, [isError, message, isSuccess]);
  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="bg-white p-8 rounded-md w-full">
            <div className="flex items-center justify-between pb-6">
              <div className="flex items-center justify-between">
                <div className="flex bg-gray-50 items-center p-2 rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <input
                    className="bg-gray-50 outline-none ml-1 block "
                    type="text"
                    name=""
                    id=""
                    placeholder="search..."
                  />
                </div>
                <div className="lg:ml-40 ml-10 space-x-8">
                  <button className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">
                    <Link to={"/sold-items"}>View Sold Items</Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <form
                  action=""
                  className="flex flex-col justify-center w-full items-center p-5"
                >
                  {formData.map((form, index) => {
                    return (
                      <div key={index} className="mb-5">
                        <select
                          id={index}
                          name="productName"
                          onChange={(e) => onChange(e, index)}
                          className="input w-[18em]"
                        >
                          <option>Please choose one option</option>
                          {bakeryProduct.map((items, index) => (
                            <option value={items.productName} key={index}>
                              {items.productName}
                            </option>
                          ))}
                        </select>
                        <input
                          className="input w-[12em] ml-3"
                          type="number"
                          placeholder="ዛሬ የተሸጠ ብዛት"
                          value={form.itemsSold}
                          name="itemsSold"
                          onChange={(e) => onChange(e, index)}
                        />
                      </div>
                    );
                  })}
                  <button
                    onClick={onSubmit}
                    className="btn bg-orange-500 text-white text-xl hover:shadow-md active:bg-orange-800 mt-2 w-1/2"
                  >
                    Sell
                  </button>
                </form>
                <button
                  type="button"
                  onClick={addForm}
                  className="fixed top-60 right-10 btn bg-orange-500 text-white text-xl hover:shadow-md active:bg-orange-800 mt-2 w-fit"
                >
                  Add More Fields
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ItemSell;
