myApp.service('RecipeService', ['$http', function($http) {
    console.log('RecipeService loaded');
    var self = this;
    self.recipe = { list: [] };

    self.addRecipe = function(newRecipe) {
        console.log(newRecipe);
        $http.post('/addRecipe', newRecipe).then(function(response) {
            console.log('service post reponse: ', response);
            self.getRecipe();
        });
    };

    self.getRecipe = function() {
        $http.get('/addRecipe').then(function(response) {
            console.log('getroute addRecipe: ', response.data);
            self.recipe.list = response.data;
        });
    };

    self.deleteRecipe = function(recipeId) {
        console.log('deleteRecipe hit', recipeId);
        $http.delete('/addRecipe/' + recipeId).then(function(response) {
            self.getRecipe();
        });
    };
}]);