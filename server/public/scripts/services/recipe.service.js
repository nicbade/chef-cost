myApp.service('RecipeService', ['$http', function($http) {
    console.log('RecipeService loaded');
    var self = this;
    self.recipe = { list: [] };
    self.currentRecipe = { details: {} };
    self.newRecipe = {
        name: '',
        type: '',
        yield: '',
        yield_amount: ''
    };

    self.addRecipe = function(newRecipe) {
        console.log(newRecipe);
        self.newRecipe = newRecipe;
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

    self.getDeets = function(recipeId) {
        $http({
            mehtod: 'GET',
            url: '/addRecipe/recipe',
            params: {
                id: recipeId
            }
        }).then(function(response) {
            self.currentRecipe.details = response.data;
        });
    };

    self.updateRecipe = function(recipeId) {
        console.log('updateRecipe hit', recipeId);
        $http.put('/addRecipe/' + recipeId.id, recipeId).then(function(response) {
            self.getRecipe();
        });
    };
}]);