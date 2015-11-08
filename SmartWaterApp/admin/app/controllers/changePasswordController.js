app.controller('changePasswordCtrl', function($scope,$http,$rootScope,$location)
{
  $rootScope.activetab = $location.path();
  $rootScope.pageTitle = 'Change Password';

  $scope.changePasswordFunction = function() {

    userCPF = $scope.user.cpf;
    userPassword = $scope.user.password;
    userNewPassword = $scope.user.new.password;
    userConfirmNewPassword = $scope.user.confirm.new.password;

    if($scope.user.new.password == $scope.user.confirm.new.password) {
      $http.get('../api/user/'+userCPF).success(function(data) {

        if(data == 'false') {
          $scope.error = true;
          $scope.errorMessage = 'Incorrect CPF!';
        } else {
          $scope.user = data;
          if(userPassword != $scope.user.password) {
            $scope.error = true;
            $scope.errorMessage = 'Actual Password is Incorrect!';
          } else {
            $scope.user.password = userNewPassword;
            $http.put('../api/user/password/',$scope.user).success(function(data){
              $scope.user = data;
              if($scope.user.password == userConfirmNewPassword) {
                $scope.success = true;
                $scope.successMessage = 'Success Change Password!';
              } else {
                $scope.error = true;
                $scope.errorMessage = 'Fault in Change the Password!';
              }
            });
          }
        }
      });
    } else {
      $scope.error = true;
      $scope.errorMessage = 'New Password and Confirm New Password are different!';
    }
  };
});
