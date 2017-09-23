myApp.controller('ProductController', ['ProductService', 'RecipeService', '$routeParams', function(ProductService, RecipeService, $routeParams) {
    console.log('ProductController created');
    var self = this;
    self.ProductService = ProductService;
    self.RecipeService = RecipeService;

    self.recipeProduct = ProductService.recipeProduct;
    self.toggle = false;

    ProductService.getProduct();
    // self.newProduct = {
    //     product: '',
    //     productNumber: '',
    //     price: '',
    //     vendor: '',
    //     caseSize: '',
    //     unitMeasure: '',
    //     cost_oz: '',
    //     amount: '',
    //     created_at: ''
    // };


    // adds new products to the db
    self.addProduct = function() {
        console.log('addproduct button was clicked', self.newProduct);
        recipeConvert();
        ProductService.addProduct(self.newProduct);
        self.newProduct = {};
    };

    // deletes product from db
    self.deleteProduct = function(productId) {
        ProductService.deleteProduct(productId);
    };
    // adds a product to a recipe
    self.selectProduct = function() {
        console.log('selectProduct button was clicked', self.recipeProduct);
        ProductService.selectProduct(self.recipeProduct);
    };

    // edit product on addProduct.html
    self.updateProduct = function(productId) {
        console.log('updateProduct button was clicked', productId);
        // TESTING to see if it will convert the updated costs / oz
        ProductService.updateProduct(productId);
        // recipeConvert();
        // closes edit
        self.toggle = false;
    };
    // trying to convert all of the unitmeasures to ounces ie. pounds = 16 oz  Easier to cost later
    recipeConvert = function(unitMeasure) {
        console.log('recipeConvert called');
        var unit = self.newProduct
        console.log('unit.unitMeasure', unit.unitMeasure);
        if ((unit.unitMeasure == 'Pound')) {
            unit.cost_oz = unit.price / (unit.caseSize * 16);
        } else if ((unit.unitMeasure == 'Ea')) {
            unit.cost_oz = unit.price / unit.caseSize;
        } else if ((unit.unitMeasure == 'Gallon')) {
            unit.cost_oz = unit.price / (unit.caseSize * 128);
        } else if ((unit.unitMeasure == 'Quart')) {
            unit.cost_oz = unit.price / (unit.caseSize * 32);
        } else if ((unit.unitMeasure == 'Pint')) {
            unit.cost_oz = unit.price / (unit.caseSize * 16);
        } else if ((unit.unitMeasure == 'Cup')) {
            unit.cost_oz = unit.price / (unit.caseSize * 8);
        } else if ((unit.unitMeasure == 'Ounce')) {
            unit.cost_oz = unit.price / unit.caseSize;
        } else if ((unit.unitMeasure == 'Liter')) {
            unit.cost_oz = unit.price / (unit.caseSize * 33.814);
        } else if ((unit.unitMeasure == 'ml')) {
            unit.cost_oz = unit.price / (unit.caseSize * 0.033814)
        } else if ((unit.unitMeasure == 'Gram')) {
            unit.cost_oz = unit.price / (unit.caseSize * 0.035274)
        }
    };

}]);