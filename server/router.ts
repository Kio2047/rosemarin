import express from "express";

import userController from "./controllers/userController";
import recipeController from "./controllers/recipeController";
import fileMiddleware from "./middlewares/uploadFileMiddleware";
import shoppingListController from "./controllers/shoppingListController";
import authMiddleware from "./middlewares/authMiddleware";

const router = express.Router();

router.get("/logout", authMiddleware, userController.logoutUser);
router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);

router.get("/recipes", authMiddleware, recipeController.getAllRecipes);
router.post("/recipes", fileMiddleware, authMiddleware, recipeController.createRecipe);
router.put("/recipes/:id", fileMiddleware, authMiddleware, recipeController.updateRecipe);
router.delete("/recipes", authMiddleware, recipeController.removeRecipe);

router.get("/items", shoppingListController.getAllItems);
router.post("/items", shoppingListController.addItem);
router.put("/items", shoppingListController.updateItem);
router.delete("/items", shoppingListController.removeItem);

router.get("*", function (_, res) {
  res
    .status(404)
    .send(
      "<h1 style='margin: 50px auto; display: flex; justify-content: center'>Page Not found</h1>"
    );
});

export default router;
