import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProduct, reset } from "../features/bakeryProducts/bakerySlice";
import { toast } from "react-toastify";
// components
import Sidebar from "../partials/Sidebar";
import Banner from "../partials/Banner";
import Header from "../partials/Header";

function FetchBakeryProducts(toggler) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { bakeryProduct, isLoading, isError, message } = useSelector(
    (state) => state.BakeryProduct
  );

  useEffect(() => {
    if (isError) {
      console.log("የሆነ ችግር አለ: ", message);
    }

    dispatch(fetchProduct());
  }, [isError]);

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  });

  const taxCalculator = (sellingPrice) => {
    return (sellingPrice * 15) / 100;
  };
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* content wrapper */}
        {/* site header */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* table */}
          <div className="bg-white p-8 rounded-md w-full">
            <div className=" flex items-center justify-between pb-6">
              <div>
                <h2 className="text-gray-600 font-semibold">
                  List Of Sold Products
                </h2>
                <span className="text-xs">Bakery Products</span>
              </div>
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
                  <button
                    onClick={toggler.toggler}
                    className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
                  >
                    Create Product
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                  <table className="min-w-full leading-normal">
                    <thead>
                      <tr>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Product Name
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Selling Price
                        </th>
                        <th className="text-center px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Product Weight
                        </th>
                        <th className="text-center px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Ingredients used to create/bake this product
                        </th>
                        <th className="text-center px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Tax
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Manage
                        </th>
                      </tr>
                    </thead>
                    {bakeryProduct.length > 0 && (
                      <tbody>
                        {bakeryProduct.map((data) => (
                          <tr key={data._id}>
                            <td className="px-0 py-0 border-b border-gray-200  text-sm ">
                              <div className="flex items-center mr-0 p-0 w-1/2">
                                <div className="ml-3">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {data.productName}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap text-center">
                                {`${data.sellingPrice} birr`}
                              </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap text-center">
                                {data.productWeight}
                              </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                              <p className="text-gray-900 whitespace-no-wrap">
                                [{data.ingredientLists.join(", ")}]
                              </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap text-center">
                                {taxCalculator(
                                  bakeryProduct.find(
                                    (item) =>
                                      item.productName === data.productName
                                  ).sellingPrice
                                ) + " birr"}
                              </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap text-center">
                                CRUD
                              </p>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    )}
                    {bakeryProduct.length == 0 && (
                      <tbody>
                        <tr>
                          <td>
                            <h1>No prodcuts are sold yet!</h1>
                          </td>
                        </tr>
                      </tbody>
                    )}
                  </table>
                  <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                    <span className="text-xs xs:text-sm text-gray-900">
                      Showing 1 to 4 of 50 Entries
                    </span>
                    <div className="inline-flex mt-2 xs:mt-0">
                      <button className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l">
                        Prev
                      </button>
                      &nbsp; &nbsp;
                      <button className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FetchBakeryProducts;
