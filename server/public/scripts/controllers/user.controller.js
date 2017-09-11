myApp.controller('UserController', function(UserService) {
    console.log('UserController created');
    var self = this;
    self.userService = UserService;
    self.userObject = UserService.userObject;

    self.addProduct = () => {
        console.log('addProduct button was clicked');
    }
    self.addRecipe = () => {
        console.log('addRecipe button was clicked');
    }


});