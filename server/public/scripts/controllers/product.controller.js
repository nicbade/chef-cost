myApp.controller('ProductController', function(ProductService) {
    console.log('ProductController created');
    var self = this;
    self.ProductService = ProductService;
    self.newProduct = {};
    // self.productToEdit = {};
    ProductService.getProduct();

    // adds new products to the db
    self.addProduct = function() {
        console.log('addproduct button was clicked', self.newProduct);
        ProductService.addProduct(self.newProduct);
    };
    // deletes product from db
    self.deleteProduct = function(productId) {
        ProductService.deleteProduct(productId);
    };
    // adds a product to a recipe
    self.selectProduct = function(product) {
        console.log('selectProduct button was clicked', product);
        // ProductService.updateProduct(product);
    };



});