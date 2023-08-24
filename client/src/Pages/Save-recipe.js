import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";

const SaveRecipe = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);

  const userID = useGetUserID("userId");

  const fetchSavedRecipes = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/recipes/savedRecipes/${userID}`
      );
      console.log(response?.data?.savedRecipes);
      setSavedRecipes(response?.data?.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSavedRecipes();
  }, []);


  return (
    <div className="container mt-2 d-flex flex-wrap justify-content-evenly">
    {savedRecipes?.map((data,i) =>(
      <div className="card mb-3" style={{width: "18rem"}} key={i}>
        <img src={data?.imageUrl} className="card-img-top" alt={data?.imageUrl} style={{width: "100%",height:"180px"}}/>
        <div className="card-body">
          <h5 className="card-title">{data?.name}</h5>
          <p className="card-text">{data?.description}</p>
          <p className="card-text">{data?.cookingTime}</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">An item</li>
          <li className="list-group-item">A second item</li>
          <li className="list-group-item">A third item</li>
        </ul>
        {/* <div className="card-body">
          <button href="#" className="btn btn-primary" onClick={ () => {!savedRecipes?.includes(data?._id) && handleSavedRecipes(data._id)}}>
          {savedRecipes?.includes(data?._id) ? "saved" : "save"}</button>
        </div> */}
      </div>
    ))}
    </div>
  )
}

export default SaveRecipe