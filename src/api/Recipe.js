import { privateRequest, publicRequest } from "../services/AxiosInstance";

const getAllCategories = async () => {
    try {
        const url = "/recipe/getAllCategories";
        const method = "GET";
    
        const response = await publicRequest(url, method);
        return response;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};

const getRecipesByCategory = async (category) => {
    try {
        const url = `/recipe/getRecipeByCategory/${category}`;
        const method = "GET";
    
        const response = await publicRequest(url, method);
        return response;
    } catch (error) {
        console.error("Error fetching recipes by category:", error);
        throw error;
    }
}

const getRecipeById = async (id) => {
    try {
        const url = `/recipe/getRecipeById/${id}`;
        const method = "GET";
    
        const response = await publicRequest(url, method);
        return response;
    } catch (error) {
        console.error("Error fetching recipe by id:", error);
        throw error;
    }
}

const addFavoriteRecipe = async (recipeId) => {
    try {
        const url = `/recipe/addFavoriteRecipe/${recipeId}`;
        const method = "PUT";
        const data = { recipeId };
    
        const response = await privateRequest(url, method, data);
        return response;
    } catch (error) {
        console.error("Error adding favorite recipe:", error);
        throw error;
    }
}

const removeFavoriteRecipe = async (recipeId) => {
    try {
        const url = `/recipe/removeFavoriteRecipe/${recipeId}`;
        const method = "PUT";
        const data = { recipeId };
    
        const response = await privateRequest(url, method, data);
        return response;
    } catch (error) {
        console.error("Error removing favorite recipe:", error);
        throw error;
    }
}

const getFavoriteRecipes = async () => {
    try {
        const url = "/recipe/getFavoriteRecipes";
        const method = "GET";
    
        const response = await privateRequest(url, method);
        return response;
    } catch (error) {
        console.error("Error fetching favorite recipes:", error);
        throw error;
    }
}

export { getAllCategories, getRecipesByCategory, getRecipeById, addFavoriteRecipe, removeFavoriteRecipe, getFavoriteRecipes };


