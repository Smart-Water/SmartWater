  app.controller('UserListCtrl', function($scope,$http,$rootScope,$location) {

    $rootScope.activetab = $location.path();
    $rootScope.pageTitle = 'User List';

    findAllUsers($scope,$http,$location);

  });

    function findAllUsers($scope,$http,$location) {

    $http.get('api/user/').success(function(data) {
      $scope.users = data;

    });

  };
