import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../partials/Sidebar";
import Banner from "../../partials/Banner";
import Header from "../../partials/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import AddIngredient from "../../components/ingredientComponent/AddIngredient";
import FetchIngredient from "../../components/ingredientComponent/FetchIngredient";
// importing actionCreators
import { BrowseIngredients } from "../../features/ingredients/ingredientSlice";
import { reset } from "../../features/ingredients/ingredientSlice";
// toggling element
function ManageIngredients() {
  let [myState, setState] = useState(false);
  let toggler = () => {
    setState((state) => !state);
  };
  
  let classes = `text-gray text-5xl`;
  let bottomClass = `bg-orange-600 text-white font-bold rounded-md px-5 py-2 flex align-middle items-center gap-2 absolute bottom-3 left-5 z-60`;
  return (
    <>
      <button onClick={toggler} className="absolute top-3 right-5">
        <FontAwesomeIcon
          icon={"times"}
          className={myState ? classes : "hidden"}
        />
      </button>
      <button onClick={toggler} className={myState ? bottomClass : "hidden"}>
        <FontAwesomeIcon icon={"circle-arrow-left"} className="text-5xl" />
        Back
      </button>

      {myState ? (
        <AddIngredient toggler={toggler} />
      ) : (
        <FetchIngredient toggler={toggler} />
      )}
    </>
  );
}

export default ManageIngredients;
