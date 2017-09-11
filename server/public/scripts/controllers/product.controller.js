myApp.controller('ProductController', function(ProductService) {
    console.log('ProductController created');
    var self = this;
    self.ProductService = ProductService;
    self.newProduct = {};
    ProductService.getProduct();

    self.addProduct = function() {
        console.log('addproduct button was clicked', self.newProduct);
        ProductService.addProduct(self.newProduct);
    };


});