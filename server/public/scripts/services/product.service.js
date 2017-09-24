myApp.service('ProductService', ['$http', '$routeParams', function($http, $routeParams) {
    console.log('productService loaded');
    var self = this;

    self.product = { list: [] };
    self.recipeProduct = { list: [] };

    // sending new product input to server
    self.addProduct = function(newProduct) {
        // console.log(newProduct);
        $http.post('/addProduct', newProduct).then(function(response) {
            // console.log('service post reponse: ', response);
            self.getProduct();
        });
    };

    // adding amount to product to bring recipe together
    self.addProductToRecipe = function(productId) {
        // console.log(productId);
        $http.post('/addProduct/recipeProduct', productId).then(function(response) {
            console.log(response);
            self.getProductRecipe();
        });
    };

    // DISPLAYS RECIPE ON ROUTE PARAMS
    self.getProductRecipe = function() {
        console.log('getProductRECIPE HIT');
        $http.get('/addProduct/recipeProduct').then(function(response) {
            console.log('get route addProduct/RecipeProduct', response);
            self.recipeProduct.list = response.data;
            self.filterProduct();
            // self.recipeProduct.list = response.data;
        });
    };

    // gets product to addProduct.html
    self.getProduct = function() {
        $http.get('/addProduct').then(function(response) {
            // console.log('getroute addProduct: ', response.data);
            self.product.list = response.data;
        });
    };

    self.deleteProduct = function(productId) {
        // console.log('deleteProduct hit', productId);
        $http.delete('/addProduct/' + productId).then(function(response) {
            self.getProduct();
        });
    };

    self.updateProduct = function(productId) {
        // console.log('updateProduct hit', productId);
        $http.put('/addProduct/' + productId.id, productId).then(function(response) {
            self.getProduct();
        })
    };

    // IS THIS NEEDED?
    // item selected from recipe.html search and binded to recipe view
    self.selectProduct = function(recipeProduct) {
        // console.log('selectProduct hit', recipeProduct);
        self.recipeProduct = recipeProduct;

    };

    self.filterProduct = function(recipeProduct) {
        // console.log('filterProduct hit');
        // console.log($routeParams);
        if (self.recipeProduct.recipe_id == $routeParams.id) {
            self.recipeProduct.list = response.data;
        }
    };
}]);