myApp.controller('ProductController', function(ProductService) {
    console.log('ProductController created');
    var self = this;
    self.ProductService = ProductService;
    self.newProduct = {};
    self.productToEdit = {};
    ProductService.getProduct();

    self.openEdit = function(product) {
        product.editMode = true;

        self.productToEdit = {
            id: product.id,
            product_number: product_number,
            vendor: vendor,
            price: price,
            unit: unit,
            unit_measure
        }

    }

    self.cancelEdit = function(product) {
        product.editMode = false;
        self.productToEdit = {};
    }

    self.addProduct = function() {
        console.log('addproduct button was clicked', self.newProduct);
        ProductService.addProduct(self.newProduct);
    };

    self.deleteProduct = function(productId) {
        ProductService.deleteProduct(productId);
    };

    self.editProduct = function(productId) {
        ProductService.editProduct(productId);

        product.editMode = false;
        self.productToEdit = {};
        self.getProduct();
    };



});