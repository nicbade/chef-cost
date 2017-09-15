myApp.controller('ProductController', function(ProductService) {
    console.log('ProductController created');
    var self = this;
    self.ProductService = ProductService;
    self.recipeProduct = ProductService.recipeProduct;
    console.log(self.recipeProduct);
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
        ProductService.selectProduct(product);
        console.log(self.recipeProduct);
    };



});