app.directive('addForm', function () {
    return {
        templateUrl: '../views/addForm.html',
        restrict: 'E',
        scope:{
            formClose: '=',
            formSubmit: '='
        },
        link: function(scope, element, attrs) {

            scope.submit = function (form) {
                if (form.$valid) {
                    var newContact = {
                        name: scope.name,
                        phone: scope.phone,
                        email: scope.email || ''
                    };
                    scope.formSubmit(newContact);
                    scope.refreshForm();
                    scope.isSuccessAdd = true;
                }
            };

            scope.refreshForm = function () {
                scope.name = '';
                scope.phone = '';
                scope.email = '';
            };

            scope.isSuccessAdd = false;
        }
    };
});
