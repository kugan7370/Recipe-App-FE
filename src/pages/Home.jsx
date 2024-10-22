import { useEffect, useState } from "react";
import { getAllCategories, getRecipesByCategory } from "../api/Recipe";
import Category from "../components/Category";
import Recipe from "../components/Recipe";
import Loader from "../components/Loader";
import { useDispatch } from "react-redux";
import { fetchFavorite } from "../features/recipeslicer";

function Home() {
  const [categories, setCategories] = useState([]);
  const [recipeByCategory, setRecipeByCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Beef");

  const [isLoadingCategories, setIsLoadingCategories] = useState(true); 
  const [isLoadingRecipes, setIsLoadingRecipes] = useState(true); 

  const dispatch = useDispatch();


  useEffect(() => {
    const getCategories = async () => {
      try {
        setIsLoadingCategories(true);
        const response = await getAllCategories();
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      } finally {
        setIsLoadingCategories(false);
      }
    };
    getCategories();
  }, []);

  useEffect(() => {
    const getRecipeByCategory = async () => {
      try {
        setIsLoadingRecipes(true); 
        const response = await getRecipesByCategory(selectedCategory);
        setRecipeByCategory(response.data);
      } catch (error) {
        console.error("Failed to fetch recipes by category", error);
      } finally {
        setIsLoadingRecipes(false);
      }
    };
    getRecipeByCategory();
  }, [selectedCategory]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    dispatch(fetchFavorite());
  }, [dispatch]);

  return (
    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 mt-28">
      {/* categories btns */}
      <div className="flex items-center gap-8 mt-6 overflow-x-scroll hide-scrollbar">
        <div className="flex gap-8 py-2 relative">
          {isLoadingCategories ? (
           <Loader/>
          ) : (
            categories.length > 0 &&
            categories.map((category) => (
              <Category
                key={category.idCategory}
                category={category.strCategory}
                isSelected={selectedCategory === category.strCategory}
                onSelect={handleCategorySelect}
              />
            ))
          )}
        </div>
      </div>

      {/* recipes */}
      <div className="grid md:grid-cols-5 md:gap-12 grid-cols-2 gap-8 mt-10">
        {isLoadingRecipes ? (
       <Loader/>
        ) : (
          recipeByCategory?.length > 0 &&
          recipeByCategory?.map((recipe) => (
            <Recipe key={recipe?.idMeal} recipe={recipe} />
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
