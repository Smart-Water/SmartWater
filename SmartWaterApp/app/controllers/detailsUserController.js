app.controller('DetailsUserCtrl', function($scope,$http,$rootScope,$location,$routeParams) {

  $rootScope.activetab = $location.path();
  $rootScope.pageTitle = 'User Details';

  findUserDetails($scope,$http,$routeParams);

});

  function findUserDetails($scope,$http,$routeParams) {

  $http.get('api/user/'+$routeParams.cpf).success(function(data) {
    $scope.user = data;

  });

};
