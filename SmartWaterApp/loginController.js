var app = angular.module('login',['ngMessages','ui.mask']);

app.controller('loginCtrl', function($scope, $http, $rootScope, $location)
{

  $rootScope.activetab = $location.path();

  $scope.loginFunction = function() {

    $http.get('api/user/'+$scope.user.cpf+'/'+$scope.user.password).success(function(data) {
      $scope.user = data;

      if($scope.user == 'false') {
        $scope.error = true;
        $scope.errorMessage = 'Email or Password Incorrect!';
      } else {
        if($scope.user.access_level == 1) {
          window.location.href = '/SmartWater/SmartWaterApp/admin';
        } else {
          window.location.href = '/SmartWater/SmartWaterApp/user';
        }
      }

    });
  };

});
