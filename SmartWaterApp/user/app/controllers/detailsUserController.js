app.controller('DetailsUserCtrl', function($scope,$http,$rootScope,$location,$routeParams) {

  $rootScope.activetab = $location.path();
  $rootScope.pageTitle = 'User Details';

  findUserDetails($scope,$http,$routeParams);

  $scope.confirmDelete = function(user) {
    $scope.userToDelete = user;
    $('#modalRemove').modal('show');

  };

  $scope.deleteUser = function(userToDelete) {
    $http.delete('../api/user/'+userToDelete.cpf).success(function(data) {
    });
    $('#modalRemove').modal('hide');
    $scope.activePath = $location.path('listUser');
  };

});

function findUserDetails($scope,$http,$routeParams) {

  $http.get('../api/user/'+$routeParams.cpf).success(function(data) {
    $scope.user = data;
  });

  $http.get('../api/board/user/'+$routeParams.cpf).success(function(data) {
    $scope.user.mac_address = data.mac_address;
  });

};
