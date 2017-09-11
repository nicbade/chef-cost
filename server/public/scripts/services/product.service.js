myApp.service('ProductService', ['$http', function($http) {
    console.log('productService loaded');
    var self = this;

    self.Product = { list: [] };

    // sending new product input to server
    self.addProduct = function(newProduct) {
        // console.log(newProduct);
        $http.post('/addProduct', newProduct).then(function(response) {
            console.log('service post reponse: ', response);
        });
    };


}]);