myApp.controller('RecipeController', function(RecipeService) {
    console.log('RecipeController created');
    var self = this;
    self.newRecipe = RecipeService.newRecipe;
    self.RecipeService = RecipeService; // RecipeService.getRecipe();
    // console.log(self.RecipeService);
    // adds recipe to db
    self.addRecipe = function() {
        console.log('addRecipe button was clicked', self.newRecipe);
        RecipeService.addRecipe(self.newRecipe);
    };
    // deletes recipe from db
    self.deleteRecipe = function(recipeId) {
        console.log('deleteRecipe button clicked', recipeId)
        RecipeService.deleteRecipe(recipeId);
    };
    // updates recipe to db
    self.updateRecipe = function(recipeId) {
        console.log('updateRecipe button was clicked', recipeId);
        RecipeService.updateRecipe(recipeId);
    }


});