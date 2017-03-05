app.controller('PhonebookPageCtrl', ['$scope', 'phonebookFactory', function($scope, phonebookFactory) {
    $scope.phonebook = phonebookFactory.getPhonebook();

    $scope.isOpenAddForm = false;

    $scope.switchAddForm = function () {
        $scope.isOpenAddForm = !$scope.isOpenAddForm;
    };
    $scope.addRecord = function (newContact) {
        if (newContact) {
            $scope.phonebook.push(newContact);
            phonebookFactory.setPhonebook($scope.phonebook);
        }
    };

}]);
