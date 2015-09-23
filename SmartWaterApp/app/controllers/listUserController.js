app.controller('UserListCtrl', function($scope,$http,$rootScope,$location,$routeParams) {

  $rootScope.activetab = $location.path();
  $rootScope.pageTitle = 'User List';

  findAllUsers($scope,$http,$location);

  $scope.confirmDelete = function(user) {
    $scope.userToDelete = user;

    $('#modalRemove').modal('show');

  };

  $scope.deleteUser = function(userToDelete) {
    $http.delete('api/user/'+userToDelete.cpf).success(function(data) {
      findAllUsers($scope,$http);
    });
    $('#modalRemove').modal('hide');
  };

});

function findAllUsers($scope,$http) {

  $http.get('api/user/users/').success(function(data) {
    $scope.users = data;
  });

};
