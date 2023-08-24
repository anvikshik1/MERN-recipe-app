import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState();

  const userID = useGetUserID("userId");

  const fetchSavedRecipes = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
      );
       setSavedRecipes(response?.data?.savedRecipe);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRecipes = async () => {
    try {
      const response = await axios.get("http://localhost:3001/recipes");
      setRecipes(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    fetchRecipes();
    fetchSavedRecipes();
  }, []);


  const handleSavedRecipes = async (recipeID) => {
    try {
      const response = await axios.put("http://localhost:3001/recipes", {
        recipeID,
        userID,
      })
        setSavedRecipes(response.data.savedRecipes);
        fetchSavedRecipes()
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = () => {

  }
  return (
    <div className="container mt-2 d-flex flex-wrap justify-content-evenly">
    {recipes?.map((data,i) =>(
      <div className="card mb-3" style={{width: "18rem"}} key={i}>
        <img src={data?.imageUrl} className="card-img-top" alt={data?.imageUrl} style={{width: "100%",height:"180px"}}/>
        <div className="card-body">
          <h5 className="card-title">{data?.name} - {data?.cookingTime} min</h5>
          {/* <p className="card-text">{data?.description}</p> */}
          <p className="card-text">{data?.instructions}</p>
        </div>
        {data.ingredients.length > 0 && <ul className="list-group list-group-flush">
        {data.ingredients?.map((data,i) =>(
          <li className="list-group-item" key={i}>{data}</li>
        ))}
        </ul>}
        <div className="card-body">
          <button href="#" className="btn btn-primary ">
            Edit
          </button>
          <button href="#" className="btn btn-success ms-2" onClick={ () => {!savedRecipes?.includes(data?._id) && handleSavedRecipes(data._id)}}>
          {savedRecipes?.includes(data?._id) ? "saved" : "save"}</button>
          <button href="#" className="btn btn-danger ms-2" onClick={() => handleDelete()}>
            Delete
          </button>
        </div>
      </div>
    ))}
    </div>
  )
}

export default Home