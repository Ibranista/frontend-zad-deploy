import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchSoldItems, reset } from "../../features/pos/posSlice";
import { fetchProduct } from "../../features/bakeryProducts/bakerySlice";
import { BrowseIngredients } from "../../features/ingredients/ingredientSlice";
import { toast } from "react-toastify";
import Sidebar from "../../partials/Sidebar";
import Banner from "../../partials/Banner";
import Header from "../../partials/Header";
import calculationSlice from "../../features/calculations/calculationSlice";

function SoldItemLists() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { addToCalculation } = calculationSlice.actions;
  const dispatch = useDispatch();

  let { soldItems, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.pos
  );
  let { bakeryProduct } = useSelector((state) => state.BakeryProduct);
  let { ingredients } = useSelector((state) => state.ingredient);

  // collect ingredients from bakeryProduct
  if (bakeryProduct) {
    let arrayOfIngredients = bakeryProduct.map(
      (items) => items.ingredientLists
    );

    // ingredients: ['flour'] (2) ['flour', 'honey']

    let ingObject = arrayOfIngredients.map((id, index) => {
      return {
        ingredientName: id,
      };
    });
    let ingItems = ingObject.map((item) => item.ingredientName);
    let prices = [];
    let ings = [];
    for (let ingss of ingItems) {
      for (let items of ingss) {
        ings.push(items);
      }
    }
  }

  // fetch products
  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  // fetch ingredients
  useEffect(() => {
    dispatch(BrowseIngredients());
  }, [dispatch]);

  console.log(bakeryProduct);
  useEffect(() => {
    if (isError) {
      console.log("የሆነ ችግር አለ: ", message);
    }

    dispatch(fetchSoldItems());
  }, [isError]);

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  });

  const taxCalculator = (sellingPrice, qty) => {
    return (sellingPrice * qty * 15) / 100;
  };

  function arrayReceiver(data, sellingPrice, qty) {
    let prices = [];
    for (let items of data) {
      let value = ingredients.find(
        (item) => item.ingredientName === items
      ).ingredientPrice;
      prices.push(value);
    }
    let taxPayment = (sellingPrice * qty * 15) / 100;
    let calculatedTotalPrice = prices.reduce((acc, value) => acc + value);
    return sellingPrice - (taxPayment + calculatedTotalPrice);
  }
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  function totalCalculator() {
    let totalSold = [0];
    let profits = [0];
    soldItems.map((data) => {
      totalSold.push(data.itemsSold);
    });

    soldItems.map((data) => {
      profits.push(
        arrayReceiver(
          bakeryProduct.find((item) => item.productName === data.productName)
            .ingredientLists,
          bakeryProduct.find((item) => item.productName === data.productName)
            .sellingPrice,
          data.itemsSold
        )
      );
    });
    let sumOfSoldItems = totalSold.reduce((acc, value) => acc + value);
    let sumOfProfits = profits.reduce((acc, value) => acc + value);
    return {
      sumOfSoldItems: sumOfSoldItems,
      sumOfProfits: sumOfProfits,
    };
  }
  totalCalculator();
  const totals = totalCalculator().sumOfProfits;

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/*  Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* table */}
          <div className="bg-white p-8 rounded-md w-full">
            <div className=" flex items-center justify-between pb-6">
              <div>
                <h2 className="text-gray-600 font-semibold">
                  List Of Sold Products
                </h2>
                <span className="text-xs">All Sold Products</span>
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
                  <button className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">
                    <Link to="/sellItems">Sell Bakery Products</Link>
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
                          Number of Sold Items
                        </th>
                        <th className="text-center px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Selling Date
                        </th>
                        <th className="text-center px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Selling Price
                        </th>
                        <th className="text-center px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Tax
                        </th>
                        <th className="text-center px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Profit Made
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Manage
                        </th>
                      </tr>
                    </thead>
                    {soldItems.length > 0 && (
                      <tbody>
                        {soldItems.map((data) => (
                          <tr key={data._id}>
                            <td className="px-0 py-0 border-b border-gray-200  text-sm ">
                              <div className="flex items-center mr-0 p-0 w-1/2">
                                <div className="flex-shrink-0 w-10 h-10">
                                  <img
                                    className="w-full h-full rounded-full"
                                    src="https://media.istockphoto.com/id/937016542/photo/quinoa-salad-with-beet-root-and-spinach.jpg?b=1&s=170667a&w=0&k=20&c=mHCd9_8MPvP56so31JmHM1NLEmaKMEdqtt5tThDHHbg="
                                    alt=""
                                  />
                                </div>
                                <div className="ml-3">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {data.productName}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap text-center">
                                {data.itemsSold}
                              </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap text-center">
                                {new Date(data.createdAt)
                                  .toLocaleString("en-Us")
                                  .split("")
                                  .splice(0, 9)}
                              </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {
                                  bakeryProduct.find(
                                    (item) =>
                                      item.productName === data.productName
                                  ).sellingPrice
                                }
                              </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap text-center">
                                {taxCalculator(
                                  bakeryProduct.find(
                                    (item) =>
                                      item.productName === data.productName
                                  ).sellingPrice,
                                  data.itemsSold
                                )}
                              </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap text-center">
                                {arrayReceiver(
                                  bakeryProduct.find(
                                    (item) =>
                                      item.productName === data.productName
                                  ).ingredientLists,
                                  bakeryProduct.find(
                                    (item) =>
                                      item.productName === data.productName
                                  ).sellingPrice,
                                  data.itemsSold
                                )}
                              </p>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    )}
                    {soldItems.length == 0 && (
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
          <div className="flex gap-5 justify-center">
            <h1 className="bg-orange-500 p-5 rounded-sm text-xl text-white">
              ጠቅላላ የተሸጠ ምርት: {totalCalculator().sumOfSoldItems}
            </h1>
            <h1 className="bg-orange-500 p-5 rounded-sm text-xl text-white">
              ጠቅላላ ትርፍ: {totalCalculator().sumOfProfits}
            </h1>
          </div>
          <Banner />
        </div>
      </div>
    </>
  );
}

export default SoldItemLists;
