import AddBakeryProduct from "./AddBakeryProduct";
import FetchBakeryProducts from "./FetchBakeryProducts";
import { fetchProduct, reset } from "../features/bakeryProducts/bakerySlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function ProductsDashboard() {
  const dispatch = useDispatch;
  const [state, setState] = useState(true);
  let stateToggler = () => {
    setState((state) => !state);
  };

  let props = {
    toggler: stateToggler,
    state: state,
  };
  if (state) {
    return <FetchBakeryProducts {...props} />;
  }
  return <AddBakeryProduct {...props} />;
}

export default ProductsDashboard;
