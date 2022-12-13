import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  BrowseIngredients,
  reset,
} from "../features/ingredients/ingredientSlice";

function FetchIngredientItems() {
  const dispatch = useDispatch();
  let { ingredients, isError, isLoading, message } = useSelector(
    (state) => state.ingredient
  );
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(BrowseIngredients());
  }, [isError]);

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      <h1>FetchIngredientItems</h1>
      {ingredients.length > 0 ? (
        <div>
          {ingredients.map((data) => (
            <div key={data._id}>{data.ingredientName}</div>
          ))}
        </div>
      ) : (
        <h1>No Ingredient Items Found!</h1>
      )}
    </>
  );
}

export default FetchIngredientItems;
