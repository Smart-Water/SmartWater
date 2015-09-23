  app.controller('UserListCtrl', function($scope,$http,$rootScope,$location,$routeParams) {

    $rootScope.activetab = $location.path();
    $rootScope.pageTitle = 'User List';

    findAllUsers($scope,$http,$location);

  if(JSON.stringify($routeParams) !== '{}') {
    deleteUser($scope,$http,$routeParams);
  }

  });

  function findAllUsers($scope,$http,$location) {

    $http.get('api/user/').success(function(data) {
      $scope.users = data;

    });

  };

  function deleteUser($scope,$http,$routeParams) {

    $http.delete('api/user/'+$routeParams.cpf).success(function(data) {
      $http.get('api/user/').success(function(data) {
        $scope.users = data;
    });

  });
  };
