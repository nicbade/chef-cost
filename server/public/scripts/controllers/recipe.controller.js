myApp.controller('RecipeController', ['RecipeService', '$routeParams', function(RecipeService, $routeParams) {
    console.log('RecipeController created');
    var self = this;
    self.RecipeService = RecipeService;
    self.newRecipe = RecipeService.newRecipe;
    console.log('$routeParams ', $routeParams);

    RecipeService.getRecipe();
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


}]);