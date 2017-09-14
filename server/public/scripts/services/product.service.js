myApp.service('ProductService', ['$http', function($http) {
    console.log('productService loaded');
    var self = this;

    self.product = { list: [] };

    // sending new product input to server
    self.addProduct = function(newProduct) {
        // console.log(newProduct);
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

    self.editProduct = function(productId) {
        console.log('editProduct hit', productId);
    }
}]);