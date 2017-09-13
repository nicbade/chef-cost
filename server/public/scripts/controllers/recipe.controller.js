myApp.controller('RecipeController', function(RecipeService) {
    console.log('RecipeController created');
    var self = this;
    self.RecipeService = RecipeService;
    self.newRecipe = {};

    self.addRecipe = function() {
        console.log('addRecipe button was clicked', self.newRecipe);
        RecipeService.addRecipe(self.newRecipe);
    };
});