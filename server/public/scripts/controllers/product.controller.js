myApp.controller('ProductController', function(ProductService) {
    console.log('ProductController created');
    var self = this;
    self.ProductService = ProductService;
    self.recipeProduct = ProductService.recipeProduct;
    // console.log(self.recipeProduct);
    ProductService.getProduct();
    self.newProduct = {
        product: '',
        productNumber: '',
        price: '',
        vendor: '',
        caseSize: '',
        unitMeasure: '',
        cost_oz: ''
    };

    // adds new products to the db
    self.addProduct = function() {
        console.log('addproduct button was clicked', self.newProduct);
        recipeConvert();
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
    };
    // trying to convert all of the unitmeasures to ounces ie. pounds = 16 oz  Easier to cost later
    recipeConvert = function(unitMeasure) {
        console.log('recipeConvert called');
        var unit = self.newProduct
        console.log('unit.unitMeasure', unit.unitMeasure);
        if ((unit.unitMeasure == 'pound')) {
            unit.cost_oz = unit.price / (unit.caseSize * 16);
            self.newProduct.push(unit);
        }
        // do I need to push this to the object?
        console.log(unit.cost_oz);
    }

});