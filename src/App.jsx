import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./css/style.css";

import "./charts/ChartjsConfig";

// Import pages
import Dashboard from "./pages/Dashboard";
import Login_User from "./pages/auth/Login_User";
import Register_User from "./pages/auth/Register_User";
import ManageIngredients from "./pages/ingredients/ManageIngredients";
//bakery
import AddBakeryProduct from "./components/AddBakeryProduct";
import FetchBakeryProducts from "./components/FetchBakeryProducts";
import ProductsDashboard from "./components/ProductsDashboard";
// ingredient
import FetchIngredientItems from "./components/FetchIngredientItems";
import AddIngredients from "./components/ingredientComponent/AddIngredient";
import FormCheck from "./components/FormCheck";
// pos
import ItemSell from "./components/pos/ItemSell";
import SoldItemLists from "./pages/pos/SoldItemLists";
function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/form" element={<FormCheck />} />
        <Route exact path="/" element={<Register_User />} />
        <Route exact path="/login" element={<Login_User />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/addProduct" element={<AddBakeryProduct />} />
        <Route exact path="/fetchProduct" element={<FetchBakeryProducts />} />
        <Route exact path="/sellItems" element={<ItemSell />} />
        <Route exact path="/sold-items" element={<SoldItemLists />} />
        <Route
          exact
          path="/fetchIngredient"
          element={<FetchIngredientItems />}
        />
        <Route exact path="/AddIngredient" element={<AddIngredients />} />
        <Route
          exact
          path="/productsDashboard"
          element={<ProductsDashboard />}
        />
        <Route
          exact
          path="/manage-ingredients"
          element={<ManageIngredients />}
        />
      </Routes>
    </>
  );
}

export default App;
