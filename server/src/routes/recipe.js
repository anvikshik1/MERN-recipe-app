import { recipeModel } from "../models/Recipe.js";
import express from 'express'
import { userModel } from "../models/Users.js";

const router = express.Router();

router.get("/", async (req,res) =>{
    try {
        const getRecipes = await recipeModel.find();
        res.status(200).json(getRecipes)
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
})

router.post("/", async (req,res) =>{
    try {
        const postRecipes = await recipeModel(req.body);
        const saveItem = await postRecipes.save()
        res.status(200).json(saveItem)
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
    
})

router.put("/", async (req,res) =>{
    const recipe = await recipeModel.findById(req.body.recipeID);
    const user = await userModel.findById(req.body.userID);
    try {
        user.savedRecipe.push(recipe);
        await user.save();
        res.status(201).json({ savedRecipes: user.savedRecipe });
    } catch (err) {
        res.status(500).json(err);
    }
})
router.delete("/", async (req,res) =>{
    // const recipe = await recipeModel.findById(req.body.recipeID);
    // const user = await userModel.findById(req.body.userID);
    // try {
    //     user.savedRecipe.push(recipe);
    //     await user.save();
    //     res.status(201).json({ savedRecipes: user.savedRecipe });
    // } catch (err) {
    //     res.status(500).json(err);
    // }
})

router.get("/savedRecipes/ids/:userID", async (req,res) => {
    try {
        const user = await userModel.findById(req.params.userID);
        res.status(200).json({savedRecipe: user?.savedRecipe})
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
})

router.get("/savedRecipes/:userID", async (req,res) => {
    try {
        const user = await userModel.findById(req.params.userID);
        const savedRecipes = await recipeModel.find({
        _id: { $in: user.savedRecipe },
        });
        res.status(201).json({ savedRecipes });
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
})

export {router as recipeRouter}

