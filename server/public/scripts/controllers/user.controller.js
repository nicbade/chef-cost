myApp.controller('UserController', function(UserService) {
    console.log('UserController created');
    var self = this;
    self.userService = UserService;
    self.userObject = UserService.userObject;

    self.addRecipe = function() {
        console.log('addRecipe button was clicked');
    }
});