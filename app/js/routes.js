app.config([
    '$locationProvider',
    '$routeProvider',
    function($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');
        // routes
        $routeProvider
        .when("/", {
            templateUrl: "../views/phonebookPage.html",
            controller: "PhonebookPageCtrl"
        })
        .otherwise({
            redirectTo: '/'
        });
    }
]);
