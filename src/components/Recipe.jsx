import { FaHeart, FaRegHeart } from "react-icons/fa";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {  addFavRecipe, removeFavRecipe } from "../features/recipeslicer";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { useState } from "react";

function Recipe({ recipe }) {

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [isModalOpen, setModalOpen] = useState(false); 

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const { favourite} = useSelector((state) => state.recipe); 
  const { isAuthenticated } = useSelector((state) => state.user);

  const isFavorite = favourite.some((fav) => fav.idMeal === recipe.idMeal);

  const toggleFavorite = async() => {
    if (!isAuthenticated) {
      navigate("/signin", { state: { from: location } }); 
      return;
    }
    
    if (recipe?.idMeal) {
      if (isFavorite) {
        dispatch(removeFavRecipe(recipe.idMeal));      
      } else {
        dispatch(addFavRecipe(recipe.idMeal)); 
      }
    }
    
  };

  const changeTextLength = (text) => {
    return text.length > 25 ? text.substring(0, 25) + "..." : text;
  };

  
  if (!recipe || !recipe.idMeal) {
    return null;
  }

  return (
    <>
    <div className="w-[200px] h-[250px]">
      <div className="w-full rounded-xl bg-gray-300 overflow-hidden"
      onClick={openModal}
      >
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="mt-2 flex gap-4 items-center">
        <h1 className="text-xs font-poppins">
          {recipe.strCategory}
        </h1>
        <div onClick={toggleFavorite} className="cursor-pointer">
          {isFavorite ? (
            <FaHeart color="#fe5e80" size={16} />
          ) : (
            <FaRegHeart color="#fe5e80" size={16} />
          )}
        </div>
      </div>

      <div className="mt-2">
        <h1 className="text-sm font-poppins-medium">
          {changeTextLength(recipe.strMeal)}
        </h1>
      </div>
    </div>

     {/* Modal */}
 {recipe &&    <Modal isOpen={isModalOpen} onClose={closeModal} recipe={recipe} />}
    </>
  );
}

Recipe.propTypes = {
  recipe: PropTypes.shape({
    strMealThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strCategory: PropTypes.string,
    idMeal: PropTypes.string,
  }).isRequired,
 
};

export default Recipe;
