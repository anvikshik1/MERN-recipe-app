import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useGetUserID } from '../hooks/useGetUserID';
import axios from 'axios';

const CreateRecipe = () => {
  const userID = useGetUserID("userId");

  console.log(userID);
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    const ingredients = [...recipe.ingredients];
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  };
 
  const handleAddIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(recipe);
    try {
      await axios.post(
        "http://localhost:3001/recipes",
        { ...recipe },
      ).then((res) =>{
        console.log(res);
        alert("Recipe Created");
        navigate("/");
      })

      
    } catch (error) {
      console.error(error);
    }
  };

  console.log(recipe);

  return (
    <div className="container mt-5 mb-5 justify-content-center">
      <form className="col-6 bg-box rounded p-5 flex-column d-flex" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label for="name" 
            className="form-label text-light text-start">
              name
          </label>
          <input 
            type="text" 
            className="form-control" 
            id="name" 
            name="name"
            value={recipe.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label for="description" className="form-label text-light text-start">Description</label>
          <input 
            type="text" 
            className="form-control " 
            id="description" 
            name="description"
            value={recipe.description}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label for="ingrediance" className="form-label text-light text-start">Ingredients</label>
          {recipe?.ingredients?.map((ingredient,index) =>(
            <input 
              key={index}
              type="text" 
              className="form-control mb-1" 
              id="ingredients" 
              name="ingredients"
              value={ingredient}
              onChange={(event) => handleIngredientChange(event, index)}
            />
          ))}
          
        </div>
        <button type="button" onClick={handleAddIngredient} className='btn btn-success'>
          Add Ingredient
        </button>
        <div className="mb-3">
          <label for="instructions" className="form-label text-light text-start">instructions</label>
          <textarea 
            type="text" 
            className="form-control" 
            id="instructions" 
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label for="imageUrl" className="form-label text-light text-start">image URL</label>
          <input 
            type="text" 
            className="form-control" 
            id="imageUrl" 
            name="imageUrl"
            value={recipe.imageUrl}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label for="cookingTime" className="form-label text-light text-start">Cooking Time (minutes)</label>
          <input 
            type="text" 
            className="form-control" 
            id="cookingTime" 
            name="cookingTime"
            value={recipe.cookingTime}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default CreateRecipe