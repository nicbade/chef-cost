myApp.controller('RecipeController', ['RecipeService', 'ProductService', '$routeParams', '$location', function(RecipeService, ProductService, $routeParams, $location) {
    console.log('RecipeController created');
    var self = this;
    self.RecipeService = RecipeService;
    // self.newRecipe = RecipeService.newRecipe;
    console.log('$routeParams ', $routeParams);
    self.currentRecipe = RecipeService.currentRecipe;
    // if route params is undefined, don't make get request
    RecipeService.getDetails($routeParams.id);
    self.toggle = false;

    self.newRecipe = {
        name: '',
        type: '',
        yield: '',
        yield_amount: ''
    };

    RecipeService.getRecipe();
    // console.log(self.RecipeService);
    // adds recipe to db
    self.addRecipe = function() {
        // console.log('addRecipe button was clicked', self.newRecipe);
        RecipeService.addRecipe(self.newRecipe);
        console.log(RecipeService.currentRecipe);
        // $location.path("recipeDisplay/" + RecipeService.newRecipe.id);
    };
    // deletes recipe from db
    self.deleteRecipe = function(recipeId) {
        // console.log('deleteRecipe button clicked', recipeId)
        RecipeService.deleteRecipe(recipeId);
    };
    // updates recipe to db
    self.updateRecipe = function(recipeId) {
        // console.log('updateRecipe button was clicked', recipeId);
        RecipeService.updateRecipe(recipeId);
        self.toggle = false;
    };


}]);