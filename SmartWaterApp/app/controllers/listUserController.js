    app.controller('UserListCtrl', function($scope,$http,$rootScope,$location,$routeParams) {

      $rootScope.activetab = $location.path();
      $rootScope.pageTitle = 'User List';

      findAllUsers($scope,$http,$location);

     if(JSON.stringify($routeParams) !== '{}') {
      deleteUser($scope,$http,$location,$routeParams);
     }

    });

    function findAllUsers($scope,$http,$location) {

      $http.get('api/user/').success(function(data) {
        $scope.users = data;

      });

    };

    function deleteUser($scope,$http,$location,$routeParams) {

      $http.delete('api/user/'+$routeParams.cpf).success(function(data) {
              findAllUsers($scope,$http,$location);
      });

    };
