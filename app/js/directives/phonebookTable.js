app.directive('phonebookTable', function () {
    return {
        templateUrl: '../views/phonebookTable.html',
        restrict: 'E',
        scope:{
            phonebook: '='
        },
        link: function(scope, element, attrs) {

        }
    };
});
