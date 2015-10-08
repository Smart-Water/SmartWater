var app = angular.module('login',['ngMessages','ui.mask','ngCookies']);

app.controller('loginCtrl', function($scope, $http, $rootScope, $location,$cookies)
{

  $rootScope.activetab = $location.path();

  $scope.loginFunction = function() {

    $http.get('api/user/'+$scope.user.cpf+'/'+$scope.user.password).success(function(data) {

      if(data == 'false') {
        $scope.error = true;
        $scope.errorMessage = 'CPF or Password Incorrect!';
      } else {
        $scope.user = data;
        $cookies.put('userCPF', $scope.user.cpf);
        if($scope.user.access_level == 1) {
          window.location.href = '/SmartWater/SmartWaterApp/admin';
        } else {
          window.location.href = '/SmartWater/SmartWaterApp/user';
        }
      }

    });
  };

});
