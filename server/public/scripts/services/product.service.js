myApp.service('ProductService', ['$http', function($http) {
    console.log('productService loaded');
    var self = this;

    self.product = { list: [] };
    self.recipeProduct = {
        id: '',
        product: '',
        price: '',
        vendor: '',
        unit: '',
        unit_measure: ''
    };

    // sending new product input to server
    self.addProduct = function(newProduct) {
        console.log(newProduct);
        $http.post('/addProduct', newProduct).then(function(response) {
            console.log('service post reponse: ', response);
            self.getProduct();
        });
    };

    self.getProduct = function() {
        $http.get('/addProduct').then(function(response) {
            console.log('getroute addProduct: ', response.data);
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

    // item selected from recipe.html search and binded to recipe view
    self.selectProduct = function(recipeProduct) {
        console.log('selectProduct hit', recipeProduct);
        self.recipeProduct.id = recipeProduct.id;

    };

}]);