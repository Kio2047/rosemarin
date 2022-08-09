import express from "express";

import userController from "./controllers/userController";
import recipeController from "./controllers/recipeController";
import fileMiddleware from "./middlewares/uploadFileMiddleware";
import shoppingListController from "./controllers/shoppingListController";
import authMiddleware from "./middlewares/authMiddleware";

const router = express.Router();

/***** USER *****/
router.get("/logout", authMiddleware, userController.logoutUser);
router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);

/***** RECIPES *****/
router.get("/recipes", authMiddleware, recipeController.getUserRecipes);
router.post("/recipes", fileMiddleware, authMiddleware, recipeController.createRecipe);
router.put("/recipes/:id", fileMiddleware, authMiddleware, recipeController.updateRecipe);
router.delete("/recipes", authMiddleware, recipeController.removeRecipe);

/***** SHOPPINGLIST ITEMS *****/
router.get("/items", authMiddleware, shoppingListController.getAllItems);
router.post("/items", authMiddleware, shoppingListController.addItem);
router.put("/items", authMiddleware, shoppingListController.updateItem);
router.delete("/items", authMiddleware, shoppingListController.removeItem);

router.get("*", function (_, res) {
  res
    .status(404)
    .send(
      "<h1 style='margin: 50px auto; display: flex; justify-content: center'>Page Not found</h1>"
    );
});

export default router;
