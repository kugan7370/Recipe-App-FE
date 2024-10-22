import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Recipe from "../components/Recipe";
import Loader from "../components/Loader";
import { fetchFavorite } from "../features/recipeslicer"; 

function Favourite() {
  const dispatch = useDispatch();
  const { loading,favourite, error } = useSelector((state) => state.recipe);

  useEffect(() => {
    dispatch(fetchFavorite());
  }, [dispatch]);

  return (
    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 mt-28">
      {loading ? (
        <Loader />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          {/* Recipes */}
          <div className="grid md:grid-cols-5 md:gap-12 grid-cols-2 gap-8 mt-10">
            {favourite?.length > 0 ? (
              favourite.map((recipe) => (
                <Recipe key={recipe?.idMeal} recipe={recipe} />
              ))
            ) : (
              <p>No favorite recipes yet!</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Favourite;
