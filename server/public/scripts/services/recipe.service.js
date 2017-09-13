myApp.service('RecipeService', ['$http', function($http) {
    console.log('RecipeService loaded');
    var self = this;

    self.addRecipe = function(newRecipe) {
        console.log(newRecipe);
        $http.post('/addRecipe', newRecipe).then(function(response) {
            console.log('service post reponse: ', response);
            self.getRecipe();
        });
    };
}]);