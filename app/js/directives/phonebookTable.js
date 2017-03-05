app.directive('phonebookTable',  function () {
    return {
        templateUrl: '../views/phonebookTable.html',
        restrict: 'E',
        scope:{
            phonebook: '=',
            filterString: '='
        },
        link: function(scope, element, attrs) {
            scope.sortData = {
                property: 'name',
                reverse: false
            };
            scope.sortBy = function (property) {
                scope.sortData.reverse = (scope.sortData.property === property) ? !scope.sortData.reverse : false;
                console.log(property);
                scope.sortData.property = property;
            };
        }
    };
});
